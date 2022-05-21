import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { GridTemplate } from "../../components/GridTemplate";
import { useColors } from "../../hooks/useColors";

export default function home() {
  const { colors } = useColors();

  return (
    <Flex bg={colors.bg} flex="1" p={[2, 4, 6]}>
      <SimpleGrid
        columns={2}
        spacing={8}
        w="100%"
        alignItems="center"
        justifyItems="center"
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
