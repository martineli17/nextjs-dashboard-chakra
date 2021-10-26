export type SiginType = {
    email: string;
    password: string;
}

export type UserType = {
    email: string;
    token: string;
    refreshToken: string;
    permissions: string[];
    roles: string[];
}

export type UserSiginType = {
    token: string;
    refreshToken: string;
    permissions: string[];
    roles: string[];
}

export type UserMeType = {
    email: string;
    permissions: string[];
    roles: string[];
}