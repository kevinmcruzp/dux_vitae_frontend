import { Flex, Text } from "@chakra-ui/react";
import { useColors } from "../hooks/useColors";

export default function Clients() {
  const { colors } = useColors();

  return (
    <Flex bg={colors.bg} flex='1' >
      <Text color={colors.color} >Clients</Text>
    </Flex>
  )
}
