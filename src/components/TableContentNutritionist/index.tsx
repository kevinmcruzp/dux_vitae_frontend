import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useColors } from "../../hooks/useColors";
import { api } from "../../services/apiClient";
import { Button } from "../Button";
import { Input } from "../Input";

type TableContentProps = {
  rut?: string;
  name?: string;
  lastName?: string;
  state?: string;
  request?: boolean;
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
  rut,
  name,
  lastName,
  state,
  request = false,
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
      nutritionistRut: rut,
      clientRut: run,
    };

    api.post("/appointments", data);

    onClose();
  };

  return (
    <>
      <Tbody color={colors.color}>
        <Tr>
          <Td>{rut}</Td>
          <Td>{name} </Td>
          <Td>{lastName}</Td>

          <Td
            display="flex"
            alignItems={"center"}
            gap="1rem"
            justifyContent={"flex-end"}
          >
            <Button
              bg={colors.tertiary}
              name="Perfil"
              type="button"
              onClick={() => {
                setButtonComponent("profile"), onOpen();
              }}
            />
            {request ? (
              <Button
                bg={colors.secondary}
                name="Solicitado"
                disabled
                type="button"
                onClick={() => {
                  setButtonComponent("appointment"), onOpen();
                }}
              />
            ) : (
              <Button
                bg={colors.primary}
                name="Solicitar"
                type="button"
                onClick={() => {
                  setButtonComponent("appointment"), onOpen();
                }}
              />
            )}
          </Td>
        </Tr>
      </Tbody>

      {buttonComponent === "profile" ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent color={colors.color}>
            <ModalHeader>Perfil</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Input type={"text"} name="name" id="name" /> */}
            </ModalBody>

            <ModalFooter>
              <Button name="close" colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <Button name="ghost" variant="ghost">
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent color={colors.color}>
            <ModalHeader> Cita </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex
                as="form"
                id="appointmentForm"
                flexDir="column"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  idName="title"
                  label="Ingrese el asunto"
                  color={colors.color}
                  error={errors.title}
                  {...register("title")}
                />
                <Input
                  type="text"
                  idName="description"
                  label="Ingrese la descripción"
                  color={colors.color}
                  error={errors.description}
                  {...register("description")}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                name="cerrar"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              />
              <Button type="submit" form="appointmentForm" name="enviar" />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
