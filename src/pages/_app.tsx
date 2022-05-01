import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ColorsProvider } from "../hooks/useColors";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorsProvider >
        <Flex>
          {Router.pathname === '/' ? null : <Sidebar />}
          <Flex flexDir='column' >
            {Router.pathname === '/' ? null : <Header />}
            <Component {...pageProps} />
          </Flex>
        </Flex>
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
