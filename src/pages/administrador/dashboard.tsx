import {
  Center,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";

export default function () {
  const { colors } = useColors();

  return (
    <Grid templateRows="repeat(2, 1fr)" gap={8} bg={colors.bg} flex="1">
      <SimpleGrid
        columns={1}
        w="100%"
        alignItems="center"
        justifyItems="center"
      >
        <Flex
          w="70%"
          h="300px"
          flexDir="column"
          borderRadius="12px"
          bg={colors.bgHover}
        >
          <Center>
            <Text fontSize="2xl" py={2} color={colors.color}>
              Tus ultimas actividades
            </Text>
          </Center>

          <Divider color={colors.divider} />

          <Flex p={4}>
            <Text color={colors.color}>Info</Text>
          </Flex>
        </Flex>
      </SimpleGrid>

      <SimpleGrid columns={2} w="100%" alignItems="center" gap="10%">
        <Flex w="100%" justifyContent="end">
          <Flex
            w="66%"
            h="300px"
            flexDir="column"
            borderRadius="12px"
            bg={colors.bgHover}
          >
            <Center>
              <Text fontSize="2xl" py={2} color={colors.color}>
                Ver agenda
              </Text>
            </Center>

            <Divider color={colors.divider} />

            <Flex p={4}>
              <Text color={colors.color}>Info</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex w="100%" justifyContent="start">
          <Flex
            w="66%"
            h="300px"
            flexDir="column"
            borderRadius="12px"
            bg={colors.bgHover}
          >
            <Center>
              <Text fontSize="2xl" py={2} color={colors.color}>
                Tus ultimas actividades
              </Text>
            </Center>

            <Divider color={colors.divider} />

            <Flex p={4}>
              <Text color={colors.color}>Info</Text>
            </Flex>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Grid>
  );
}
