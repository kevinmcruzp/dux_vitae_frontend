import { Center, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Logo } from "../../assets/Logo";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

export function HomeInfo() {
  const router = useRouter();
  const { colors } = useColors();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isTabletVersion && (
        <Flex
          w="40%"
          h="100%"
          p={[2, 4, 6]}
          flexDir="column"
          bg={colors.primary}
        >
          <Logo />

          <Center flex="1" flexDir="column" gap={4}>
            <Text fontSize="4xl">Bienvenido!</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              fugiat illum odio nulla eligendi. Illo facere atque, iusto
              mollitia sint fugiat voluptate blanditiis ipsum ullam
              necessitatibus ipsam aut. Quod, ea.
            </Text>

            {router.pathname === "/" ? (
              <Flex justify={"center"}>
                <Button
                  name="Registrarse nutricionista"
                  bg={colors.tertiary}
                  onClick={() => {
                    router.push("/nutricionista/register");
                  }}
                />
              </Flex>
            ) : null}
          </Center>
        </Flex>
      )}
    </>
  );
}
