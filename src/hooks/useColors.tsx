import { useColorModeValue } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Colors = {
  bg: string
  bgHover: string
  divider: string
  color: string
  primary: string
  secondary: string
}

type ColorsContextProps = {
  colors: Colors
}

type ColorsProviderProps = {
  children: ReactNode
}

export const ColorsContext = createContext({} as ColorsContextProps);

export function ColorsProvider({ children }: ColorsProviderProps) {
  const [colors, setColors] = useState({} as Colors);

  const bg = useColorModeValue('gray.50', 'gray.900')
  const bgHover = useColorModeValue('white', 'gray.800')
  const divider = 'gray.200'
  const color = useColorModeValue('gray.800', 'white')
  const primary = 'red.700'
  const secondary = 'yellow.800'

  useEffect(() => {
    const data = {
      bg,
      bgHover,
      divider,
      color,
      primary,
      secondary
    }

    setColors(data)
  }, [
    bg
  ])

  return (
    <ColorsContext.Provider value={{ colors }}>
      {children}
    </ColorsContext.Provider>
  );
}

export const useColors = () => useContext(ColorsContext);
