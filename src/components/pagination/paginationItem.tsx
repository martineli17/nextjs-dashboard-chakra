import { Stack, Button } from '@chakra-ui/react';
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md';

interface PaginationProps {
    page: string;
    checked?: boolean;
}

export function PaginationItem(props: PaginationProps) {
    return (
        <>
            <Button
                size="sm"
                fontsize="xs"
                width="4"
                colorScheme={props.checked ? "pink" : "blackAlpha"}
                disable
                _disabled={{
                    bgColor: "pink.500",
                    cursor: "default",
                }}
            >
                {props.page}
            </Button>
        </>
    )
}