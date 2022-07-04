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
import { RiArrowLeftCircleLine } from "react-icons/ri";
import * as yup from "yup";
import { Logo } from "../../assets/Logo";
import { Button } from "../../components/Button";
import { HomeInfo } from "../../components/HomeInfo";
import { Input } from "../../components/Input";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { useColors } from "../../hooks/useColors";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

type SignInData = {
  rut: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  lastName: string;
};

// var Fn = {
//   // Valida el rut con su cadena completa "XXXXXXXX-X"
//   validaRut: function (rutCompleto: string) {
//     if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
//     var tmp = rutCompleto.split("-");
//     var digv = tmp[1];
//     var rut = tmp[0];
//     if (digv == "K") digv = "k";
//     return Fn.dv(parseInt(rut)) == digv;
//   },
//   dv: function (T: number) {
//     var M = 0,
//       S = 1;
//     for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
//     return S ? S - 1 : "k";
//   },
// };

const RegisterSchema = yup.object().shape({
  rut: yup
    .string()
    .required("El rut es requerido")
    .matches(/^[0-9]{7,8}-[0-9Kk]$/g, "El rut debe ser valido"),
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El nombre solo puede contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El apellido solo puede contener letras"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .matches(
      // /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=.-])([a-zA-Z0-9@#$%^&+=_-]){8,}$/g,
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/g,
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Las contraseñas no coinciden"),
});

export default function register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(RegisterSchema),
  });

  const { toastSuccess, toastError } = useToasts();
  const { colors } = useColors();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    try {
      api.post("/clients", data).then((data) => {
        if (data.status === 200) {
          toastSuccess({
            description: "Registro exitoso, por favor inicia sesión",
          });
          Router.push("/");
        }
      });
    } catch (err) {
      toastError({ description: "Error al registrar" });
    }
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
        overflowY="auto"
      >
        <Flex justify="space-between" align="center" gap={4}>
          {!isTabletVersion ? <Logo /> : <Flex />}

          <Flex>
            <IconButton
              icon={<RiArrowLeftCircleLine size="22px" />}
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
            overflowY="auto"
          >
            <Input
              type="text"
              idName="rut"
              label="Ingrese el rut (xxxxxxxx-x)"
              color={colors.color}
              error={errors.rut}
              {...register("rut")}
            />

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
              type="email"
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
              idName="passwordConfirmation"
              label="Confirmar contraseña"
              color={colors.color}
              error={errors.passwordConfirmation}
              {...register("passwordConfirmation")}
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
