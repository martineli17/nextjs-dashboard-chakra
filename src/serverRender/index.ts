import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from 'nookies';

export const IndexServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);

    if (cookies["dashboard.token"]) {
        return {
            redirect: { 
                destination: "/dashboard",
                permanent: false,
            }
        };
    }
    return {
        props: {},
    }
}