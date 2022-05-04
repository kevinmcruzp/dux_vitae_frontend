import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ColorsProvider } from "../hooks/useColors";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <ColorsProvider>
        <Flex>
          {router.pathname === "/" ||
          router.pathname === "/createAccount" ||
          router.pathname === "/createNutritionistAccount" ? null : (
            <Sidebar />
          )}
          <Flex flexDir="column">
            {router.pathname === "/" ||
            router.pathname === "/createAccount" ||
            router.pathname === "/createNutritionistAccount" ? null : (
              <Header />
            )}
            <Component {...pageProps} />
          </Flex>
        </Flex>
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
