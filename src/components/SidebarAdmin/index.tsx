import { Flex, Text } from "@chakra-ui/react";
import {
  RiFeedbackLine,
  RiHome4Line,
  RiMedal2Line,
  RiMessage2Line,
  RiUser3Line,
} from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { useColors } from "../../hooks/useColors";
import { ActiveLink } from "../ActiveLink";

export function SidebarAdmin() {
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

      <ActiveLink href="/admin/dashboard">
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
          <Text fontSize="xl">Dashboard</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/certificates">
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
          <Text fontSize="xl">Certificados</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/clients">
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
          <Text fontSize="xl">Clientes</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/nutritionist">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiMedal2Line size="25px" />
          <Text fontSize="xl">Nutricionista</Text>
        </Flex>
      </ActiveLink>

      <ActiveLink href="#">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiFeedbackLine size="25px" />
          <Text fontSize="xl">Feed</Text>
        </Flex>
      </ActiveLink>
    </Flex>
  );
}
