import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { AddUserAsync, GetUserAsync, GetUserByIdAsync } from "../services/user/userService";
import { QueryClient } from "../services/react-query/queryClient";
import { User, UserPagination } from "../types/user";

export function useUsers(page: number, limit: number = 10, options: UseQueryOptions<UserPagination> = null) {
    return useQuery<UserPagination>(["users", page], async () => 
    {
        const data = await GetUserAsync(page, limit);
        const users = data.users.map(user => {
            return {
                ...user,
                createdAt:  new Date(user.createdAt).toLocaleDateString("pt-BR", 
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
            };
        });
        return {
            total: data.total,
            users
        }
    },
    {
        staleTime: 1000 * 60 * 5,
        ...options,
    });
}

export async function usePrefetchUser(id: number) {
    await QueryClient.prefetchQuery(["user", id], async () => GetUserByIdAsync(id),
    {
        staleTime: 1000 * 60 * 5,
    })
}

export function useAddUser() {
    return useMutation(async (user: User) => 
    {
        try {
            await AddUserAsync(user);
            return true;
        } catch (error) {
            return false;
        }
    }, 
    {
        onSuccess: () => QueryClient.invalidateQueries("users"),
    });
}