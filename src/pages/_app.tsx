import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderClient } from "../components/HeaderClient";
import { HeaderNutritionist } from "../components/HeaderNutritionist";
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
            {router.pathname === "/admin/client" && <SidebarAdmin />}
            {router.pathname === "/admin/dashboard" && <SidebarAdmin />}
            {router.pathname === "/admin/nutritionist" && <SidebarAdmin />}
            {router.pathname === "/admin/claim" && <SidebarAdmin />}
            {router.pathname === "/admin/certificate" && <SidebarAdmin />}

            {router.pathname === "/client/home" && <SidebarClient />}
            {router.pathname === "/client/message" && <SidebarClient />}
            {router.pathname === "/client/minute" && <SidebarClient />}
            {router.pathname === "/client/nutritionist" && <SidebarClient />}
            {router.pathname === "/client/schedule" && <SidebarClient />}
            {router.pathname === "/client/profile" && <SidebarClient />}

            {router.pathname === "/nutritionist/client" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/message" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/home" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/profile" && (
              <SidebarNutritionist />
            )}
            {router.pathname === "/nutritionist/schedule" && (
              <SidebarNutritionist />
            )}

            <Flex flexDir="column">
              {router.pathname === "/admin/client" && <HeaderAdmin />}
              {router.pathname === "/admin/dashboard" && <HeaderAdmin />}
              {router.pathname === "/admin/nutritionist" && <HeaderAdmin />}
              {router.pathname === "/admin/claim" && <HeaderAdmin />}
              {router.pathname === "/admin/certificate" && <HeaderAdmin />}

              {router.pathname === "/client/home" && <HeaderClient />}
              {router.pathname === "/client/message" && <HeaderClient />}
              {router.pathname === "/client/minute" && <HeaderClient />}
              {router.pathname === "/client/nutritionist" && <HeaderClient />}
              {router.pathname === "/client/schedule" && <HeaderClient />}
              {router.pathname === "/client/profile" && <HeaderClient />}

              {router.pathname === "/nutritionist/client" && (
                <HeaderNutritionist />
              )}
              {router.pathname === "/nutritionist/message" && (
                <HeaderNutritionist />
              )}
              {router.pathname === "/nutritionist/home" && (
                <HeaderNutritionist />
              )}
              {router.pathname === "/nutritionist/profile" && (
                <HeaderNutritionist />
              )}
              {router.pathname === "/nutritionist/schedule" && (
                <HeaderNutritionist />
              )}
              <Component {...pageProps} />
            </Flex>
          </Flex>
        </AuthProvider>
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
