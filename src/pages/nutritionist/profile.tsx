import { Flex, Text } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";

export default function profile() {
  const { colors } = useColors();

  return (
    <Flex
      w="calc(100vw - 250px)"
      h="calc(100vh - 60px)"
      align="center"
      justify="center"
      bg={colors.bg}
      p={2}
    >
      <Text> Hola</Text>
    </Flex>
  );
}
