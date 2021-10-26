import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from 'nookies';
import { DeleteTokensOnCookies } from "../services/auth/authService";
import { RefreshTokenError } from "../types/errors";

export function AuthServerSideProps<TProps>(func: GetServerSideProps<TProps>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TProps>> => {
        const cookies = parseCookies(context);

        if (!cookies["dashboard.token"]) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            };
        }
        try {
            return await func(context);
        } catch (error) {
            if (error instanceof RefreshTokenError) {
                DeleteTokensOnCookies(context);
                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    }
                }
            }
        }
    }
}