import {
  Center,
  Flex,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineLogin } from "react-icons/md";
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
  name: string;
  lastName: string;
};

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  name: yup.string().required("Ingrese el nombre"),
  lastName: yup.string().required("Ingrese el apellido"),

  // name: yup
  //     .string()
  //     .required(tNameRequired)
  //     .matches(/^[a-zA-Z\s]+$/g, tNameMatches),
  //   username: yup
  //     .string()
  //     .required(tUsernameRequired)
  //     .matches(/^\w+$/g, tUsernameMatches),
  //   email: yup
  //     .string()
  //     .required(tEmailRequired)
  //     .email(tEmailType),
  //   password: yup
  //     .string()
  //     .required(tPasswordRequired)
  //     .matches(
  //       /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=.-])([a-zA-Z0-9@#$%^&+=.-]){8,}$/g,
  //       tPasswordMatches
  //     ),
  //   password_confirmation: yup
  //     .string()
  //     .oneOf([null, yup.ref('password')], tRepeatPasswordMatch)
});

export default function createAccount() {
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

    Router.push("/");
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
            <IconButton
              icon={<MdOutlineLogin size="22px" />}
              variant="backHome"
              aria-label="Back home"
              color={colors.color}
              onClick={() => Router.push("/")}
            >
              Back login
            </IconButton>

            <ThemeSwitcher color={useColorModeValue("black", "white")} />
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
              type="text"
              idName="name"
              label="Nombre"
              color={colors.color}
              error={errors.name}
              {...register("name")}
            />

            <Input
              type="text"
              idName="lastName"
              label="Apellido"
              color={colors.color}
              error={errors.lastName}
              {...register("lastName")}
            />

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
              label="Contraseña"
              color={colors.color}
              error={errors.password}
              {...register("password")}
            />

            <Input
              type="password"
              idName="password"
              label="Confirmar contraseña"
              color={colors.color}
              error={errors.password}
              {...register("password")}
            />

            <Button
              mt={4}
              type="submit"
              name="Registrarse"
              bg={colors.primary}
              isLoading={isSubmitting}
            />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
}
