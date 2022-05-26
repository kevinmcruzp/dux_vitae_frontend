import { Flex } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";

export default function setting() {
  const { colors } = useColors();

  return (
    <Flex
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="calc(100vh - 60px)"
      bg={colors.bg}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex w={["100%", "90%", "60%"]} h="31rem" bg="white"></Flex>
    </Flex>
  );
}
