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
import { api } from "../../services/apiClient";

type SignInData = {
  photo: string;
  file: string;
};

const SignInSchema = yup.object().shape({
  // photo: yup
  //   .string()
  //   .required("La imagen en formato jpg es requerida")
  //   .matches(/(.*?)\.(jpg)$/g, "El formato debe ser jpg"),
  file: yup.mixed().required("El archivo título en formato pdf es requerido"),
});

export default function file() {
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
    const formData = new FormData();
    formData.append("file", data.file[0]);

    console.log(formData);

    api.post("/certificate", formData).then((res) => {
      if (res.status === 200) {
        Router.push("/");
      }
    });
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
            {/* <Input
              type="file"
              accept=".jpg"
              idName="photo"
              label="Foto (formato JPG)"
              color={colors.color}
              error={errors.photo}
              {...register("photo")}
            /> */}

            <Input
              type="file"
              idName="file"
              label="Título"
              color={colors.color}
              error={errors.file}
              {...register("file")}
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
