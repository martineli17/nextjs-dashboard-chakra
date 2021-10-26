import { Flex, useBreakpointValue, IconButton, Icon, Button } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useAuthContext } from '../../contexts/authContext';
import { useSidebarContext } from '../../contexts/sidebarContext';
import { Logo } from './logo';
import { Notification } from './notification';
import { Perfil } from './perfil';
import { Search } from './search';

export function Header() {
    const { onOpen } = useSidebarContext();
    const { Logout } = useAuthContext();
    const wideMode = useBreakpointValue({
        base: false,
        lg: true,
    });
    const breakSearch = useBreakpointValue({
        base: true,
        lg: false,
    });
    return (
        <>
            <Flex
                as="header"
                w="100%"
                maxWidth={1480}
                h="20"
                mx="auto"
                mt="4"
                px="6"
                align="center"
            >
                {
                    !wideMode && (
                        <IconButton
                            aria-label="Abre a navegação"
                            icon={<Icon as={RiMenuLine} />}
                            fontSize="24"
                            variant="unstyled"
                            onClick={onOpen}
                            mr="2"
                        />
                    )
                }
                <Logo />
                {!breakSearch && <Search />}
                <Flex align="center" ml="auto">
                    <Notification />
                    <Perfil showInformation={wideMode} />
                    <Button ml="4" type="button" borderRadius="full" color="pink.500" onClick={Logout}>
                        Sair
                    </Button>
                </Flex>
            </Flex>
            {breakSearch && <Search mt="4" />}
        </>
    )
}