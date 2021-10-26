import { useAuthContext } from "../contexts/authContext";

interface UseCanViewProps {
    permissions?: string[];
    roles?: string[];
}

export function useCanView(props: UseCanViewProps) {
    const { user, isAuthenticate } = useAuthContext();
    let canViewPermissions = !props.permissions;
    let canViewroles = !props.roles;

    if (props.permissions?.length > 0)
        canViewPermissions = props.permissions.every(permission => user?.permissions?.includes(permission));

    if (props.roles?.length > 0)
        canViewroles = props.roles.some(role => user?.roles?.includes(role));

    return isAuthenticate && canViewPermissions && canViewroles
}