import { Box, Flex, Heading, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Text, Spinner } from "@chakra-ui/react";
import { RiPictureInPictureLine, RiUserAddLine } from "react-icons/ri";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
import Link from 'next/link';
import { usePrefetchUser, useUsers } from "../../hooks/useUsers";
import { Pagination } from "../../components/pagination";
import {useState} from 'react';
import { UserPagination } from "../../types/user";

export default function User(props: UserPagination) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error, isFetching } = useUsers(currentPage, 10);

    return (
        <>
            <Box >
                <Header />
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                    <Sidebar />
                    <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="auto" minWidth={420}>
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading size="lg" fontWeight="normal">
                                Usuários
                                {
                                    isFetching && !isLoading && <Spinner size="sm" ml="4" color="pink" />
                                }
                            </Heading>
                            <Link passHref href="users/new">
                                <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiUserAddLine} />}>
                                    Adicionar
                                </Button>
                            </Link>
                        </Flex>
                        {
                            isLoading ?
                                <Flex justify="center">
                                    <Spinner />
                                </Flex>
                                : error ?
                                    <Flex justify="center">
                                        <Text>Ocorreu um erro ao buscar os usuários</Text>
                                    </Flex>
                                    :
                                    <Table >
                                        <Thead>
                                            <Tr>
                                                <Th px="6" color="gray.300" width="8">
                                                    <Checkbox colorScheme="pink" />
                                                </Th>
                                                <Th>
                                                    Usuário
                                                </Th>
                                                <Th>
                                                    Data cadastro
                                                </Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                data.users &&
                                                data.users.map(user => (
                                                    <Tr key={user.id}
                                                        onMouseEnter={() => usePrefetchUser(user.id)}
                                                    >
                                                        <Td px="6">
                                                            <Checkbox colorScheme="pink" />
                                                        </Td>
                                                        <Td>
                                                            <Box>
                                                                <Text fontWeight="bold">{user.name}</Text>
                                                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                            </Box>
                                                        </Td>
                                                        <Td>
                                                            {user.createdAt}
                                                        </Td>
                                                        <Td width="6">
                                                            <Button size="sm" fontSize="sm" color="gray" leftIcon={<Icon as={RiPictureInPictureLine} />}>
                                                                Editar
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            }
                                        </Tbody>
                                    </Table>
                        }
                        <Pagination
                            OnNextPage={(page) => setCurrentPage(page)}
                            OnPreviousPage={(page) => setCurrentPage(page)}
                            total={data?.total}
                            perPage={10}
                            currentPage={1}
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    )
}