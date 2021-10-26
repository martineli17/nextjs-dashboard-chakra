import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { SidebarContextProvider } from '../contexts/sidebarContext';
import { theme } from '../styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient } from '../services/react-query/queryClient';
import { AuthContextProvider } from '../contexts/authContext';
import { useToast } from '../hooks/useToast';

function MyApp({ Component, pageProps }: AppProps) {
  const {ToastContainerCustom} = useToast();
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={QueryClient}>
          <ChakraProvider theme={theme}>

            <SidebarContextProvider>
              <Component {...pageProps} />
              <ToastContainerCustom/>
            </SidebarContextProvider>

          </ChakraProvider>
          {
            process.env.NODE_ENV === "development" && <ReactQueryDevtools />
          }
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )


}

export default MyApp
