import { createContext, useState, useContext, useEffect } from "react";
import { Sigin as SignAuth, Me, Logout as LogoutAuth } from '../services/auth/authService';
import { SiginType, UserType } from "../types/auth";
import { SetTokensOnCookies } from "../services/auth/authService";


type AuthContextType = {
    isAuthenticate: boolean;
    user?: UserType;
    BroadcastChannel: BroadcastChannel;
    Sigin: (user: SiginType) => Promise<string>;
    Logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);
let channel: BroadcastChannel;

function AuthContextProvider({ children }) {
    const [user, setUser] = useState({} as UserType);
    const isAuthenticate = !!user;

    useEffect(() => {
        channel = new BroadcastChannel("authContext");
        channel.onmessage = (message) => {
            switch (message.data) {
                case ("logout"):
                    Logout();
                    break;

                default:
                    break;
            }
        }
    }, []);

    useEffect(() => {
        Me().then(response => setUser({ ...user, permissions: response?.data?.permissions, roles: response?.data?.roles }))
            .catch(() => Logout());
    }, []);

    async function Sigin(user: SiginType): Promise<string> {
        try {
            const data = await SignAuth(user);
            SetTokensOnCookies(data.token, data.refreshToken);
            setUser({
                token: data.token,
                email: user.email,
                permissions: data.permissions,
                roles: data.roles,
                refreshToken: data.refreshToken
            })
            return "";
        } catch (error) {
            return "Usuário ou senha inválidos";
        }
    }

    async function Logout(): Promise<void> {
        LogoutAuth();
        setUser(null);
        channel.postMessage("logout");
    }

    return (
        <AuthContext.Provider value={{ BroadcastChannel: channel, Sigin, Logout, isAuthenticate, user }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

export { useAuthContext, AuthContextProvider }