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
import { Logo } from "../../assets/Logo";
import { Button } from "../../components/Button";
import { HomeInfo } from "../../components/HomeInfo";
import { Input } from "../../components/Input";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { useColors } from "../../hooks/useColors";

type SignInData = {
  foto: string;
  titulo: string;
};

const SignInSchema = yup.object().shape({
  foto: yup
    .string()
    .required("La imagen en formato jpg es requerida")
    .matches(/(.*?)\.(jpg)$/g, "El formato debe ser jpg"),
  titulo: yup
    .string()
    .required("El archivo título en formato pdf es requerido")
    .matches(/\.pdf$/g, "El formato debe ser pdf"),
});

export default function files() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(SignInSchema),
  });

  const { colors } = useColors();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    console.log(data);

    Router.push("/nutricionista/home");
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
              type="file"
              accept=".jpg"
              idName="foto"
              label="Foto (formato JPG)"
              color={colors.color}
              error={errors.foto}
              {...register("foto")}
            />

            <Input
              type="file"
              idName="titulo"
              label="Título"
              color={colors.color}
              error={errors.titulo}
              {...register("titulo")}
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
