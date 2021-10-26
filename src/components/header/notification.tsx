import { HStack, Icon } from "@chakra-ui/react";
import { RiAddLine, RiNotificationLine } from "react-icons/ri";

export function Notification() {
    return (
        <>
            <HStack
                spacing="8"
                mx="8"
                pr="8"
                py="1"
                color="gray.300"
                borderRightWidth={1}
                borderColor="gray.700"
            >
                <Icon as={RiNotificationLine} />
                <Icon as={RiAddLine} />
            </HStack>
        </>
    )
}