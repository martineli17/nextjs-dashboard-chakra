import { Text, Link as LinkChakra, Icon, LinkProps } from "@chakra-ui/react";
import { ElementType } from "toasted-notes/node_modules/@types/react";
import Link from 'next/link';

interface NavLinkProps extends LinkProps{
    children:string;
    icon: ElementType;
    href:string;
    isActived: boolean;
}

export function NavLink({icon, children, href, isActived}:NavLinkProps) {
    return (
        <Link passHref href={href}>
            <LinkChakra display="flex" >
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium" color={isActived ? "pink.500" : ""}>{children}</Text>
            </LinkChakra>
        </Link>
    )
}