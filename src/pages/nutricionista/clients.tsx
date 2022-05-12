import { Flex } from "@chakra-ui/react";
import { TableContent } from "../../components/TableContent";
import { useColors } from "../../hooks/useColors";

export default function Clients() {
  const { colors } = useColors();

  return (
    <Flex
      w="calc(100vw - 250px)"
      h="calc(100vh - 60px)"
      align="center"
      justify="center"
      bg={colors.bgHover}
      p={2}
    >
      <TableContent />
    </Flex>
  );
}
