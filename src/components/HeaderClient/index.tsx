import { Divider, Flex, Text } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";
import { MenuUser } from "../MenuUser";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function HeaderClient() {
  const { colors } = useColors();

  const src = "https://avatars.githubusercontent.com/u/72741197?v=4";

  function profile() {
    console.log("profile client");
  }

  return (
    <Flex
      w="calc(100vw - 250px)"
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
          kevin@inacap.cl
        </Text>
      </Flex>

      <MenuUser profile={profile} src={src} />
    </Flex>
  );
}
