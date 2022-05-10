import {
  Center,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Logo } from "../assets/Logo";
import { Button } from "../components/Button";
import { HomeInfo } from "../components/HomeInfo";
import { Input } from "../components/Input";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { useColors } from "../hooks/useColors";

type SignInData = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(SignInSchema),
  });

  const { colors } = useColors();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data);

    router.push("/nutricionista/home");
  };

  return (
    <Flex w="100vw" h="100vh">
      <HomeInfo />
      <Flex
        w={["100%", "100%", "60%"]}
        h="100%"
        p={[2, 4, 6]}
        bg={colors.bgHover}
        flexDir="column"
      >
        <Flex justify="space-between" align="center" gap={4}>
          {!isTabletVersion ? <Logo /> : <Flex />}

          <Flex>
            <ThemeSwitcher color={useColorModeValue("black", "white")} />

            <Button
              name="Registrarse"
              bg={colors.secondary}
              onClick={() => {
                router.push("/cliente/register");
              }}
            />
          </Flex>
        </Flex>

        <Center flex="1">
          <Flex
            as="form"
            flexDir="column"
            w={["80%", "70%", "60%"]}
            h="100%"
            justify="center"
            gap={4}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              idName="email"
              label="Email"
              color={colors.color}
              error={errors.email}
              {...register("email")}
            />
            <Input
              type="password"
              idName="password"
              label="Password"
              color={colors.color}
              error={errors.password}
              {...register("password")}
            />

            <Button
              mt={4}
              type="submit"
              name="Entrar"
              bg={colors.primary}
              isLoading={isSubmitting}
            />
          </Flex>
        </Center>

        {!isTabletVersion ? (
          <Center>
            <Flex justify={"center"}>
              <Button
                name="Registrarse nutricionista"
                bg={colors.tertiary}
                onClick={() => {
                  router.push("/nutricionista/register");
                }}
              />
            </Flex>
          </Center>
        ) : null}
      </Flex>
    </Flex>
  );
}
