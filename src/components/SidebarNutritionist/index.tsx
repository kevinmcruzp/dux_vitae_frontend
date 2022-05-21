import { Flex, Text } from "@chakra-ui/react";
import {
  RiCalendarCheckLine,
  RiHome4Line,
  RiMessage2Line,
  RiSettings3Line,
  RiUser3Line,
} from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { useColors } from "../../hooks/useColors";
import { ActiveLink } from "../ActiveLink";

export function SidebarNutritionist() {
  const { colors } = useColors();

  return (
    <Flex
      position="sticky"
      top="0"
      h="100vh"
      minW="250px"
      maxW="250px"
      bg={colors.primary}
      flexDir="column"
    >
      <Flex p={2}>
        <Logo />
      </Flex>

      <ActiveLink href="/nutritionist/home">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiHome4Line size="25px" />
          <Text fontSize="xl">Home</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/nutritionist/client">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiUser3Line size="25px" />
          <Text fontSize="xl">Cliente</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/nutritionist/message">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiMessage2Line size="25px" />
          <Text fontSize="xl">Mensage</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/nutritionist/schedule">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiCalendarCheckLine size="25px" />
          <Text fontSize="xl">Agenda</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/nutritionist/setting">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiSettings3Line size="25px" />
          <Text fontSize="xl">Configuración</Text>
        </Flex>
      </ActiveLink>
    </Flex>
  );
}
