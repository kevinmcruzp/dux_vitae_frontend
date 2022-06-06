import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  RiFeedbackLine,
  RiHome4Line,
  RiMessage2Line,
  RiProfileLine,
  RiUser3Line,
} from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { useColors } from "../../hooks/useColors";
import { ActiveLink } from "../ActiveLink";

export function SidebarAdmin() {
  const isWebVersion = useBreakpointValue({ base: false, lg: true });
  const { colors } = useColors();

  // const userCanSeeComponent = useCan({ roles });

  // if (!userCanSeeComponent) {
  //   return null;
  // }

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
          {isWebVersion && <Text fontSize="xl">Dashboard</Text>}
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
          <RiUser3Line size="25px" />
          {isWebVersion && <Text fontSize="xl">Nutricionista</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/client">
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
          {isWebVersion && <Text fontSize="xl">Cliente</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/certificate">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg={colors.primary}
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiProfileLine size="25px" />
          {isWebVersion && <Text fontSize="xl">Certificado</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/admin/claim">
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
          {isWebVersion && <Text fontSize="xl">Reclamos</Text>}
        </Flex>
      </ActiveLink>
    </Flex>
  );
}
