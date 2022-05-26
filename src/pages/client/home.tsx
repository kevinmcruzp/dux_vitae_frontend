import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { GridTemplate } from "../../components/GridTemplate";
import { useColors } from "../../hooks/useColors";

export default function home() {
  const { colors } = useColors();

  return (
    <Flex
      bg={colors.bg}
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="calc(100vh - 60px)"
    >
      <SimpleGrid
        columns={2}
        w="100%"
        alignItems="center"
        justifyItems="center"
        gap={4}
      >
        <GridTemplate title="Tus ultimas actividades">
          <Text color={colors.color}>Info</Text>
        </GridTemplate>

        <GridTemplate title="Consultas">
          <Text color={colors.color}>Info</Text>
        </GridTemplate>

        <GridTemplate title="Ver agenda">
          <Text color={colors.color}>Info</Text>
        </GridTemplate>

        <GridTemplate title="Feeds subidos">
          <Text color={colors.color}>Info</Text>
        </GridTemplate>
      </SimpleGrid>
    </Flex>
  );
}
