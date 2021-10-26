import { Box, Flex, Heading, Divider, Stack, SimpleGrid, Button } from "@chakra-ui/react";
import { Input } from "../../components/form/input";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
import Link from 'next/link';
import { useAddUser } from "../../hooks/useUsers";
import { useForm, SubmitHandler } from "react-hook-form";
import { SigupValidatorResolver } from "../../validators/sigupValidator";
import { useRouter } from "next/dist/client/router";
import { User } from "../../types/user";

interface UserSignUp {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function NewUser() {
    const { register, handleSubmit, formState } = useForm({ resolver: SigupValidatorResolver });
    const addUser = useAddUser();
    const router = useRouter();

    const handleSignUp: SubmitHandler<UserSignUp> = async (values, event) => {
        let user: User = { name: values.name, email: values.email, createdAt: new Date().toString() };
        const response = await addUser.mutateAsync(user)
        if (response)
            router.push("/users");
    }


    return (
        <>
            <Box>
                <Header />
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />
                    <Box flex="1" borderRadius={8} bg="gray.800" p="6">
                        <Heading size="lg" fontWeight="normal">
                            Novo usuário
                        </Heading>
                        <Divider my="6" borderColor="gray.700" />

                        <Stack direction="column" spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="name" label="Nome completo" type="text" {...register("name")} error={formState.errors.name} />
                                <Input name="email" label="E-mail" type="email" {...register("email")} error={formState.errors.email} />
                            </SimpleGrid>
                        </Stack>
                        <Flex justify="flex-end" mt="8">
                            <Stack direction="row" spacing="4">
                                <Link passHref href="/users">
                                    <Button color="gray" w="100px">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button
                                    colorScheme="pink"
                                    w="100px"
                                    type="submit"
                                    onClick={handleSubmit(handleSignUp)}
                                >
                                    Salvar
                                </Button>
                            </Stack>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}