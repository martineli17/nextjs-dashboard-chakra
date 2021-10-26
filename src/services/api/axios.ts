import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { RefreshTokenError } from '../../types/errors';
import { Logout } from '../auth/authService';
import { SetTokensOnCookies } from "../auth/authService";

type FailedRequestsQueueType = {
    onSuccess: () => void;
    onFailed: (error) => void;
}
let refreshingToken = false;
let failedRequestsQueue: FailedRequestsQueueType[] = [];

export const Api = axios.create({
    baseURL: "http://localhost:3004",
});

export const ApiAuth = CreateClientApiAuth();

export function CreateClientApiAuth(context = undefined): AxiosInstance {
    const ApiAuth = axios.create({
        baseURL: "http://localhost:3333",
    });

    ApiAuth.interceptors.request.use((config) => {
        const cookies = parseCookies();
        const token = cookies["dashboard.token"];
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    })

    ApiAuth.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                if (error.response.data?.code === "token.expired") {
                    const originalConfig = error.config;

                    if (!refreshingToken) ExecuteRefreshToken(context);

                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({
                            onSuccess: () => resolve(ApiAuth(originalConfig)),
                            onFailed: (error) => reject(error),
                        })
                    })
                }
                else
                    if (process.browser)
                        Logout(context);
                    else
                        return Promise.reject(new RefreshTokenError());
            }

            return Promise.reject(error);
        })

    return ApiAuth;
}

function ExecuteRefreshToken(context = undefined) {
    refreshingToken = true;
    const cookies = parseCookies(context);
    const refreshToken = cookies["dashboard.refreshToken"];
    if (refreshToken) {
        ApiAuth.post<any, any>("refresh", { refreshToken })
            .then(response => {
                SetTokensOnCookies(response.data.token, response.data.refreshToken, context);
                failedRequestsQueue.forEach(request => request.onSuccess());
                failedRequestsQueue = [];
            })
            .catch((error) => {
                failedRequestsQueue.forEach(request => request.onFailed(error));
                failedRequestsQueue = [];
            })
            .finally(() => refreshingToken = false)
    }
}