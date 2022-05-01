import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Grid } from "../components/Grid";
import { useColors } from "../hooks/useColors";

export default function Home() {
  const { colors } = useColors();

  return (
    <Flex bg={colors.bg} flex='1' p={[2, 4, 6]} >
      <SimpleGrid columns={2} spacing={8} w='100%' alignItems='center' justifyItems='center' >
        <Grid title='Tus ultimas actividades' >
          <Text color={colors.color} >Info</Text>
        </Grid>

        <Grid title='Consultas' >
          <Text color={colors.color} >Info</Text>
        </Grid>

        <Grid title='Ver agenda' >
          <Text color={colors.color} >Info</Text>
        </Grid>

        <Grid title='Feeds subidos' >
          <Text color={colors.color} >Info</Text>
        </Grid>
      </SimpleGrid>
    </Flex>
  )
}
