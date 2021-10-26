export type User = {
    id?: number;
    name: string;
    createdAt: string;
    email: string;
}

export type UserPagination = {
    users: User[];
    total: number;
}