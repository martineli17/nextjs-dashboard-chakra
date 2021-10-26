import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { useCanView } from "../../hooks/useCanView";
import { NavLink } from "./navLink";
import { NavTitle } from "./navTitle";

export function NavSidebar(){
    const router = useRouter();
    const canViewCharts = useCanView({permissions: ["metrics.list"]})
    const canViewUsers= useCanView({roles: ["administrator"]})
    return(
        <>
             <Stack spacing="12" align="flex-start">
                    <Box>
                        <NavTitle title="GERAL" />
                        <Stack spacing="4" mt="8" align="stretch" ml="4">
                            {
                                canViewCharts && 
                                <NavLink icon={RiDashboardLine} href="/dashboard" isActived={router.asPath.includes("dashboard")}>Dashboard</NavLink>
                            }
                            {
                                canViewUsers && 
                                <NavLink icon={RiContactsLine} href="/users" isActived={router.asPath.includes("users")}>Usuários</NavLink>
                            }
                            
                        </Stack>
                    </Box>
                </Stack>
        </>
    )
}