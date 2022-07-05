import { Avatar, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RiMailLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type NutritionistData = {
  rut?: string;
  name: string;
  lastName: string;
  email: string;
  birthday?: string;
  gender?: string;
  phone?: string;
  created_at?: string;
};

type UpdateData = {
  name: string;
  lastName: string;
  email: string;
  birthday?: string;
  gender?: string;
  phone?: string;
  created_at?: string;
  address: string;
  number: string;
  city: string;
};

const UpdateSchema = yup.object().shape({
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
  birthday: yup.date().required("Fecha de nacimiento es requerida"),
  gender: yup.string().required("El género es requerido"),
  phone: yup
    .string()
    .required("El número telefonico es requerido")
    .matches(
      /^\+56?[ -]*(6|7)[ -]*([0-9][ -]*){8}/g,
      "El formato requerido es +56 9 xxxxxxxx"
    ),
  address: yup.string().required("La dirección es requerida"),
  number: yup.string().required("El número de casa o apartamento es requerido"),
  city: yup.string().required("La ciudad es requerida"),
});

export default function profile({ nutritionistData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateData>({
    resolver: yupResolver(UpdateSchema),
  });

  const { colors } = useColors();
  const nameNutritionist =
    nutritionistData?.name + " " + nutritionistData?.lastName;
  const [dateCreatedClient, setDateCreatedClient] = useState("");

  useEffect(() => {
    const date = new Date(nutritionistData?.created_at);
    setDateCreatedClient(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }, []);

  // const onSubmit: SubmitHandler<UpdateData> = (data) => {
  //   console.log(data);
  // api
  //   .post("/clients", data)
  //   .then((data) => {
  //     if (data.status === 200) {
  //       // Router.push("/");
  //     }
  //   })
  //   .catch(() => {});
  // };

  return (
    <Flex
      flex="1"
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      bg={colors.bg}
      color={colors.color}
      padding={2}
    >
      {/* formulario */}
      <Flex
        gap={5}
        bg={colors.bg}
        as={"form"}
        padding={2}
        flexDir={"column"}
        flex="1"
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={() => {}}
      >
        {/* Información general */}
        <Flex h={"3rem"} align={"end"}>
          <Text fontSize={"1.1rem"} fontWeight={"bold"}>
            Información general
          </Text>
        </Flex>
        {/* Input información general */}
        <Flex gap={2} flexDir={"column"}>
          <Flex gap={2}>
            <Input
              type={"text"}
              idName="name"
              label="Nombre"
              bg={colors.bgHover}
              defaultValue={nutritionistData?.name}
              error={errors.name}
              {...register("name")}
            />
            <Input
              type={"text"}
              idName="lastName"
              label="Apellido"
              bg={colors.bgHover}
              defaultValue={nutritionistData?.lastName}
              error={errors.lastName}
              {...register("lastName")}
            />
          </Flex>

          <Flex align={"center"} gap={2}>
            <Input
              type={"date"}
              idName="birthday"
              label="Fecha de nacimiento"
              bg={colors.bgHover}
              error={errors.birthday}
              {...register("birthday")}
            />

            <Select
              idName="gender"
              label="Género"
              placeholder="Seleccione género"
              bg={colors.bgHover}
              error={errors.gender}
              {...register("gender")}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenina</option>
              <option value="other">Otro</option>
            </Select>
          </Flex>

          <Flex gap={2}>
            <Input
              type={"email"}
              idName="email"
              label="Email"
              bg={colors.bgHover}
              defaultValue={nutritionistData?.email}
              error={errors.email}
              {...register("email")}
            />
            <Input
              type={"text"}
              idName="phone"
              label="Teléfono"
              bg={colors.bgHover}
              error={errors.phone}
              {...register("phone")}
            />
          </Flex>
        </Flex>

        {/* Dirección */}
        <Flex h={"3rem"} align={"end"}>
          <Text fontSize={"1.1rem"} fontWeight={"bold"}>
            Dirección
          </Text>
        </Flex>
        {/* Input de dirección */}
        <Flex gap={2} flexDir={"column"}>
          <Flex gap={2}>
            <Input
              type={"text"}
              idName="address"
              label="Dirección"
              bg={colors.bgHover}
              error={errors.address}
              {...register("address")}
            />
            <Input
              type={"text"}
              idName="number"
              label="Número"
              bg={colors.bgHover}
              error={errors.number}
              {...register("number")}
            />
          </Flex>

          <Flex gap={2}>
            <Input
              idName="region"
              label="Región"
              bg={colors.bgHover}
              defaultValue="Coquimbo"
              isDisabled={true}
            />
            <Select
              idName="city"
              label="Ciudad"
              placeholder="Seleccione género"
              bg={colors.bgHover}
              error={errors.city}
              {...register("city")}
            >
              <option value="La serena">La Serena</option>
              <option value="Coquimbo">Coquimbo</option>
              <option value="Ovalle">Ovalle</option>
              <option value="Vicuña">Vicuña</option>
              <option value="Paihuano">Paihuano</option>
            </Select>
          </Flex>
        </Flex>

        <Button disabled type="submit" name="Salvar" bg={colors.primary} />
      </Flex>

      {/* Perfil */}
      <Flex
        align={"center"}
        justifyContent={"center"}
        padding={2}
        w={"25rem"}
        flex="1"
        bg={colors.bg}
      >
        <Flex
          align={"center"}
          flexDir={"column"}
          bg={colors.bgHover}
          w={"80%"}
          h={"60%"}
          borderRadius={"5px"}
          gap={8}
        >
          <Avatar top={-12} w={"6rem"} h={"6rem"} name={nameNutritionist} />

          <Text fontSize={"1.2rem"} fontWeight={"medium"}>
            {nameNutritionist}
          </Text>

          <Text fontSize="0.9rem" color={colors.divider}>
            Descripción personal
          </Text>

          <Text as="i">
            <q>Nunca es tarde para cambiar tu estilo de vida.</q>
          </Text>

          <Flex alignItems="center" justifyContent="center" gap="5px">
            <RiMailLine />
            <Text fontSize="0.9rem">{nutritionistData?.email}</Text>
          </Flex>

          <Text fontSize="0.7rem">Cuenta creada el {dateCreatedClient}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);

      const cookies = parseCookies(ctx);
      const rutNutritionist = cookies["rut"];

      const response = await apiClient.get(`/nutritionists/${rutNutritionist}`);

      const nutritionistData = response?.data;

      return {
        props: {
          nutritionistData,
        },
      };
    } catch (err) {
      return {
        props: {
          nutritionistData: [], // Leh: Retorno vazio
        },
      };
    }
  },
  {
    roles: "nutritionist",
  }
);
