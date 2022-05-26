import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  RiFileCopy2Line,
  RiHome4Line,
  RiMessage2Line,
  RiSettings3Line,
  RiUser3Line,
} from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { useColors } from "../../hooks/useColors";
import { ActiveLink } from "../ActiveLink";

export function SidebarClient() {
  const { colors } = useColors();
  const isWebVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      position="sticky"
      top="0"
      h="100vh"
      w={["50px", "50px", "50px", "250px"]}
      bg={colors.primary}
      flexDir="column"
    >
      <Flex p={2}>
        <Logo />
      </Flex>

      <ActiveLink href="/client/home">
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

          {isWebVersion && <Text fontSize="xl">Home</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/client/nutritionist">
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
          {isWebVersion && <Text fontSize="xl">Nutricionista</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/client/message">
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
          {isWebVersion && <Text fontSize="xl">Mensages</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/client/minute">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiFileCopy2Line size="25px" />
          {isWebVersion && <Text fontSize="xl">Minuta</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/client/setting">
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
          {isWebVersion && <Text fontSize="xl">Configuración</Text>}
        </Flex>
      </ActiveLink>
    </Flex>
  );
}
