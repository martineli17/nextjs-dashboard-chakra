import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { useAuthContext } from "../../contexts/authContext";

interface PerfilProps {
    showInformation?: boolean;
}

export function Perfil({ showInformation }: PerfilProps) {
    const {user} = useAuthContext();

    return (
        <>
            <Flex align="center">
                {showInformation &&
                    <Box mr="4" textAlign="right">
                        <Text>{user?.email}</Text>
                        <Text fontSize="small" color="gray.300">
                            {user?.email}
                        </Text>
                    </Box>
                }
                <Avatar name="Fabio Martineli Gonçalves" size="md" />
            </Flex>
        </>
    )
}