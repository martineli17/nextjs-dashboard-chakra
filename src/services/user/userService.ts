import { User, UserPagination } from "../../types/user";
import { Api } from "../api/axios";

export async function GetUserAsync(page: number, limit:number = 10): Promise<UserPagination>{
    const { data: response, headers } = await Api.get<any>(`users?_page=${page}&_limit=${limit}`,
        {
            params:
            {
                page,
            }
        });

    return {
        users: response,
        total: Number(headers["x-total-count"]),
    }
}

export async function GetUserByIdAsync(id: number): Promise<User> {
    const { data } = await Api.get<User>(`users/${id}`);
    return data;
}


export async function AddUserAsync(user: User): Promise<void> {
   await Api.post(`users`, user);
}