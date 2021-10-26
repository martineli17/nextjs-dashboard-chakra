import { SiginType, UserMeType, UserSiginType } from "../../types/auth";
import { ApiAuth } from "../api/axios";
import Router from "next/router";  
import { setCookie, destroyCookie } from "nookies";

export async function Sigin(user: SiginType){
    const {data} =  await ApiAuth.post<SiginType, any>("sessions", user);
    return data as UserSiginType;
}

export async function Me(){
    return await ApiAuth.get<UserMeType>("me");
}

export function Logout(context = undefined) {
    DeleteTokensOnCookies(context);
    Router.push("/");
}

export function SetTokensOnCookies(token: string, refreshToken: string, context = undefined) {
    setCookie(context, "dashboard.token", token, { maxAge: 60 * 60 * 24 * 30 })
    setCookie(context, "dashboard.refreshToken", refreshToken, { maxAge: 60 * 60 * 24 * 30 })
}

export function DeleteTokensOnCookies(context = undefined) {
    destroyCookie(context, "dashboard.token");
    destroyCookie(context, "dashboard.refreshToken");
}