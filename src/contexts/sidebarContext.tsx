import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import {createContext, useContext, useEffect} from 'react';

const Provider = createContext({} as UseDisclosureReturn);

export function SidebarContextProvider({children}){
    const disClosure = useDisclosure();
    const router = useRouter();
    useEffect(() => disClosure.onClose(), [router.asPath])
    return(
        <Provider.Provider value={disClosure}>
            {children}
        </Provider.Provider>
    )
}

export const useSidebarContext = () => useContext(Provider);