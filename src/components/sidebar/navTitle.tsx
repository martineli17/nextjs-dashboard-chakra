import {Text, TextProps } from '@chakra-ui/react';

interface NavTitleProps extends TextProps{
    title: string;
}

export function NavTitle({title}: NavTitleProps) {
    return (
        <>
            <Text fontWeight="bold" color="gray.400" fontSize="small">
                {title}
            </Text>
        </>
    )
}