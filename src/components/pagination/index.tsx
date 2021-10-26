import { Stack, Box, Button, IconButton, Icon } from '@chakra-ui/react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useState } from 'react';

interface PaginationProps {
    total: number;
    perPage: number;
    currentPage: number;
    OnNextPage: (page: number) => void;
    OnPreviousPage: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
    const lastPage = Math.floor(props.total / props.perPage) + ((props.total / props.perPage) - Math.floor(props.total / props.perPage) > 0 ? 1 : 0);
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const lastPageLoad = currentPage * props.perPage;

    function CallNextPage(){
        props.OnNextPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }

    function CallPreviousPage(){
        props.OnPreviousPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
    }

    return (
        <>
            <Stack
                direction="row"
                spacing="6"
                mt="8"
                justify="end"
                align="center"
            >
                <Box>
                    <strong>
                        {currentPage == 1 ? currentPage : (currentPage * props.perPage) - props.perPage}
                    </strong> 
                    - 
                    <strong>
                        {lastPageLoad >= props.total ? props.total : lastPageLoad}
                        </strong> de <strong>
                        {props.total}
                    </strong>
                </Box>
                <Stack direction="row" spacing="2">
                    <Button
                        size="sm"
                        fontsize="xs"
                        width="4"
                        colorScheme="blackAlpha"
                        disable
                        _disabled={{
                            bgColor: "pink.500",
                            cursor: "default",
                        }}
                        onClick={() => currentPage == 1 ? {} : CallPreviousPage()}
                    >
                        <Icon as={MdNavigateBefore} />
                    </Button>
                    <Button
                        size="sm"
                        fontsize="xs"
                        width="4"
                        colorScheme="blackAlpha"
                        disable
                        _disabled={{
                            bgColor: "pink.500",
                            cursor: "default",
                        }}
                        onClick={() => currentPage === lastPage ? {} : CallNextPage()}
                    >
                        <Icon as={MdNavigateNext} />
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}