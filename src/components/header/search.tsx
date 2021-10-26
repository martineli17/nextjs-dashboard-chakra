import { Flex, Input, Icon, FlexProps } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchProps extends FlexProps{

}

export function Search({...rest}: SearchProps) {
    return (
        <>
            <Flex
                as="label"
                background="gray.800"
                flex="1"
                py="4"
                px="8"
                ml="6"
                maxWidth={400}
                alignSelf="center"
                color="gray.200"
                position="relative"
                borderRadius="full"
                {...rest}
            >
                <Input
                    color="gray.50"
                    variant="unstyled"
                    px="4"
                    mr="4"
                    placeholder="Buscar na plataforma"
                    _placeholder={{ color: "gray.400" }}
                />
                <Icon as={RiSearchLine} fontSize="2xl" />
            </Flex>
        </>
    )
}