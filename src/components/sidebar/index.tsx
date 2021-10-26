import { useSidebarContext } from "../../contexts/sidebarContext";
import { NavSidebar } from "./navSidebar";
import { Drawer, DrawerOverlay, useBreakpointValue, DrawerContent, DrawerCloseButton, DrawerBody, Box } from '@chakra-ui/react';

export function Sidebar() {
    const { isOpen, onClose } = useSidebarContext();
    const showMiniSidebar = useBreakpointValue({
        base: true,
        lg: false,
    });
   
    return (
        <>
            {
                showMiniSidebar && (
                    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                        <DrawerOverlay>
                            <DrawerContent bg="gray.800" p="4">
                                <DrawerCloseButton mt="6" />
                                <DrawerBody>
                                    <NavSidebar />
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                )
            }
            {
                !showMiniSidebar && (
                    <Box as="aside" w="64" mr="8">
                        <NavSidebar />
                    </Box>
                )
            }
        </>
    )
}