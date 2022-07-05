import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useColors } from "../../hooks/useColors";
import { useToasts } from "../../hooks/useToasts";
import { Button } from "../Button";
import { Input } from "../Input";

type TableContentProps = {
  rutNutritionist?: string;
  name?: string;
  lastName?: string;
  state?: string;
  request?: boolean;
  email?: string;
  onReloadPage: (data) => void;
};

type AppointmentData = {
  title: string;
  description: string;
};

const AppointmentSchema = yup.object().shape({
  title: yup.string().required("El asunto es requerido"),
  description: yup.string().required("La descripción es requerida"),
});

export function TableContentNutritionist({
  rutNutritionist,
  name,
  lastName,
  state,
  request = false,
  email,
  onReloadPage,
}: TableContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentData>({
    resolver: yupResolver(AppointmentSchema),
  });

  const { colors } = useColors();

  const [buttonComponent, setButtonComponent] = useState<string>("profile");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");
  const { toastSuccess, toastError } = useToasts();

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);
  }, []);

  const onSubmit: SubmitHandler<AppointmentData> = async ({
    title,
    description,
  }) => {
    const data = {
      title,
      description,
      nutritionistRut: rutNutritionist,
      clientRut: run,
    };

    onReloadPage(data);
  };

  return (
    <>
      <Tr color={colors.color}>
        <Td>{rutNutritionist}</Td>
        <Td>{name} </Td>
        <Td>{lastName}</Td>

        <Td>
          <Button
            bg={colors.tertiary}
            name="Perfil"
            type="button"
            onClick={() => {
              setButtonComponent("profile"), onOpen();
            }}
          />
        </Td>
        <Td>
          <Button
            bg={request ? colors.secondary : "#484093"}
            name={request ? "Solicitado" : "Solicitar"}
            disabled={request}
            type="button"
            onClick={() => {
              setButtonComponent("appointment"), onOpen();
            }}
          />
        </Td>
      </Tr>

      {buttonComponent === "profile" ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={colors.bg} color={colors.color}>
            <ModalHeader>
              <Flex align={"center"} gap={3}>
                <Avatar name={name + " " + lastName} />
                Perfil de {name}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody gap={2}>
              <Flex flexDir={"column"} flex="1" gap={3}>
                <Flex
                  bg={colors.bgHover}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Rut:
                  </Text>
                  <Text paddingLeft={1}>{rutNutritionist}</Text>
                </Flex>

                <Flex
                  bg={colors.bgHover}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Nombre:
                  </Text>
                  <Text paddingLeft={1}>{name + " " + lastName}</Text>
                </Flex>

                <Flex
                  bg={colors.bgHover}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Email:
                  </Text>
                  <Text paddingLeft={1}>{email}</Text>
                </Flex>

                <Flex
                  bg={colors.bgHover}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Descripción
                  </Text>
                  <Text paddingLeft={1}>Nada.</Text>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                name="Cerrar"
                border={"none"}
                bg={colors.primary}
                onClick={onClose}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={colors.bg} color={colors.color}>
            <ModalHeader> Solicitar cita </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex
                as="form"
                id="appointmentForm"
                flexDir="column"
                onSubmit={handleSubmit(onSubmit)}
                gap={3}
              >
                <Input
                  type="text"
                  idName="title"
                  label="Ingrese el asunto"
                  color={colors.color}
                  error={errors.title}
                  placeholder="Asunto"
                  bg={colors.bgHover}
                  {...register("title")}
                />
                <Input
                  type="text"
                  idName="description"
                  label="Ingrese la descripción"
                  color={colors.color}
                  placeholder="Descripción"
                  bg={colors.bgHover}
                  error={errors.description}
                  {...register("description")}
                />
              </Flex>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button
                name="cerrar"
                border={"none"}
                bg={colors.primary}
                onClick={onClose}
              />
              <Button
                type="submit"
                bg={colors.secondary}
                form="appointmentForm"
                name="enviar"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
