import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false
}

export const theme = extendTheme({
  // Para cambiar los colores por defecto de ChakraUI
  colors: {
    gray: {
      50: '#EEEEF2',
      100: '#D1D2DC',
      200: '#B3B5C6',
      300: '#9699B0',
      400: '#797D9A',
      500: '#616480',
      600: '#4B4D63',
      700: '#353646',
      800: '#1F2029',
      900: '#181B23'
    },
    red: {
      50: '#FCE9E9',
      100: '#F9D2D2',
      200: '#F3A5A5',
      300: '#ED7878',
      400: '#E74B4B',
      500: '#E01F1F',
      600: '#B41818',
      700: '#871212',
      800: '#5A0C0C',
      900: '#2D0606'
    },
    yellow: {
      50: '#fffde7',
      100: '#fff9c4',
      200: '#fff59d',
      300: '#fff176',
      400: '#ffee58',
      500: '#ffeb3b',
      600: '#fdd835',
      700: '#fbc02d',
      800: '#f9a825',
      900: '#f57f17'
    }
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
      },
    },
  },
});
