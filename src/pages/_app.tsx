import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ColorsProvider } from "../hooks/useColors";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorsProvider >
        <Component {...pageProps} />
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
