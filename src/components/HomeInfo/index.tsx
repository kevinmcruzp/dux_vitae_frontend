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

          <Center flex="1" flexDir="column" gap={20}>
            <Text fontSize="4xl">¡Bienvenido a Dux Vitae!</Text>
            <Text>
              <i>
                “No todas las dietas causan un trastorno alimentario, pero casi
                todo trastorno alimentario empieza con una dieta.”
              </i>
              <br />
              <br />

              <i>
                "Comer no es solo un placer material. Comer bien da una alegría
                espectacular a la vida y contribuye en gran medida a la buena
                voluntad, a la moral y a la felicidad." - Elsa Schiaparelli
              </i>
            </Text>

            {router.pathname === "/" ? (
              <Flex justify={"center"}>
                <Button
                  name="Registrarse nutricionista"
                  bg={colors.tertiary}
                  onClick={() => {
                    router.push("/nutritionist/register");
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
