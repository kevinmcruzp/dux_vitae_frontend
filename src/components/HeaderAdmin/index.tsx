import { Divider, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";
import { MenuUser } from "../MenuUser";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function HeaderAdmin() {
  const { colors } = useColors();

  const { user } = useAuth();

  return (
    <Flex
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="60px"
      align="center"
      justify="flex-end"
      bg={colors.bgHover}
      p={2}
      gap={4}
    >
      <ThemeSwitcher color={colors.color} />

      <Divider orientation="vertical" />

      <Flex flexDir="column" mr={2}>
        <Text color={colors.color}>@kevin_cruz</Text>
        <Text fontSize="14px" color={colors.divider}>
          {user?.email}
        </Text>
      </Flex>

      <MenuUser />
    </Flex>
  );
}
