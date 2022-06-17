import { useColorModeValue } from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  nombre: string;
};
interface Client {
  user: User;
}

type Colors = {
  bg: string;
  bgHover: string;
  divider: string;
  chat: string;
  color: string;
  primary: string;
  secondary: string;
  tertiary: string;
  messageContainer: string;
};

type ColorsContextProps = {
  colors: Colors;
};

type ColorsProviderProps = {
  children: ReactNode;
};

export const ColorsContext = createContext({} as ColorsContextProps);

export function ColorsProvider({ children }: ColorsProviderProps) {
  const [colors, setColors] = useState({} as Colors);

  const bg = useColorModeValue("gray.50", "gray.900");
  const bgHover = useColorModeValue("white", "gray.800");
  const divider = useColorModeValue("gray.400", "gray.200");
  const chat = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("gray.800", "white");
  const messageContainer = useColorModeValue("#d9fdd3", "#005c4b");
  const primary = "red.700";
  const secondary = "yellow.800";
  const tertiary = "green.700";

  useEffect(() => {
    const data = {
      bg,
      bgHover,
      divider,
      chat,
      color,
      primary,
      secondary,
      tertiary,
      messageContainer,
    };

    setColors(data);
  }, [bg]);

  return (
    <ColorsContext.Provider value={{ colors }}>
      {children}
    </ColorsContext.Provider>
  );
}

export const useColors = () => useContext(ColorsContext);
