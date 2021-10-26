import { FormControl, Input as InputChakra, FormLabel, InputProps as InputPropsChakra, FormErrorMessage } from "@chakra-ui/react";
import { forwardRef } from 'react';
import { FieldErrors } from "react-hook-form";

interface InputProps extends InputPropsChakra {
    name: string;
    label?: string;
    error?: FieldErrors;
}

const InputBase = ({name, label, error, ...rest}: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!error} >
            {
                !!label &&
                <FormLabel htmlFor={name}>{label}</FormLabel>
            }
            <InputChakra
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bg="gray.900"
                variant="filled"
                size="lg"
                _hover={{
                    bg: "gray.900"
                }}
                ref={ref}
                {...rest}/>
                {
                    !!error && (
                        <FormErrorMessage>
                            {error.message}
                        </FormErrorMessage>
                    )
                }
        </FormControl>
    )
}

export const Input = forwardRef(InputBase);