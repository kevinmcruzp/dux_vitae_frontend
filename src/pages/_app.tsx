import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { SidebarAdmin } from "../components/SidebarAdmin";
import { SidebarClient } from "../components/SidebarClient";
import { SidebarNutritionist } from "../components/SidebarNutritionist";
import { AuthProvider } from "../context/AuthContext";
import { ColorsProvider } from "../hooks/useColors";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <ColorsProvider>
        <AuthProvider>
          <Flex>
            {router.pathname === "/admin/certificates" && <SidebarAdmin />}
            {router.pathname === "/admin/clients" && <SidebarAdmin />}
            {router.pathname === "/admin/dashboard" && <SidebarAdmin />}
            {router.pathname === "/admin/nutritionist" && <SidebarAdmin />}

            {router.pathname === "/client/register" && <SidebarClient />}

            {router.pathname === "/nutritionist/clients" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/files" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/home" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/register" && (
              <SidebarNutritionist />
            )}
            <Flex flexDir="column">
              {router.pathname === "/admin/certificates" && <Header />}
              {router.pathname === "/admin/clients" && <Header />}
              {router.pathname === "/admin/dashboard" && <Header />}
              {router.pathname === "/admin/nutritionist" && <Header />}

              {router.pathname === "/client/register" && <Header />}

              {router.pathname === "/nutritionist/clients" && <Header />}
              {router.pathname === "/nutritionist/files" && <Header />}
              {router.pathname === "/nutritionist/home" && <Header />}
              {router.pathname === "/nutritionist/register" && <Header />}
              <Component {...pageProps} />
            </Flex>
          </Flex>
        </AuthProvider>
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
