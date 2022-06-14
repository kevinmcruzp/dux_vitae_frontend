import {
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
  Textarea,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useColors } from "../../hooks/useColors";
import { acceptRequest, rejectRequest } from "../../pages/nutritionist/request";
import { Button } from "../Button";

type ClientAppointmentProps = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: string;
};

type TableContentProps = {
  id?: string;
  title?: string;
  description?: string;
  state?: Boolean;
  client?: ClientAppointmentProps;
};

type AppointmentData = {
  req: Boolean;
};

export function TableContentAppointment({
  id,
  title,
  description,
  state,
  client,
}: TableContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentData>();

  const { colors } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");

  const [stateReq, setStateRequest] = useState("pendiente...");

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);

    if (!state) {
      setStateRequest("pendiente...");
    }
  }, []);

  return (
    <>
      {state ? null : (
        <Tr>
          <Td>{title}</Td>
          <Td>{description} </Td>
          <Td>{stateReq}</Td>

          <Td
            display="flex"
            alignItems={"center"}
            gap="1rem"
            justifyContent={"flex-end"}
          >
            <Button
              bg={colors.primary}
              name="Verificar solicitud"
              type="button"
              onClick={() => {
                onOpen();
              }}
            />
          </Td>
        </Tr>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={colors.primary} color={"#FFFFFF"}>
          <ModalHeader>
            <Flex align={"center"} gap={3}>
              {/* <Avatar name={name + " " + lastName} /> */}
              Solicitud
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={2}>
            <Flex
              borderRadius="5"
              bg={"#85000F"}
              flexDir={"column"}
              flex="1"
              gap={3}
            >
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos de la solicitud
              </Text>

              <Flex
                bg={"#85000F"}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  {title}
                </Text>
                <Textarea
                  border={"none"}
                  disabled
                  value={description}
                ></Textarea>
              </Flex>
            </Flex>
            <Flex
              borderRadius={"5"}
              marginTop={4}
              bg={"#85000F"}
              flexDir={"column"}
              flex="1"
              gap={3}
            >
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos del cliente:
              </Text>
              <Flex
                bg={"#85000F"}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Rut:
                </Text>
                <Text paddingLeft={2}>{client.rut}</Text>
              </Flex>

              <Flex
                bg={"#85000F"}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Nombre:
                </Text>
                <Text paddingLeft={2}>
                  {client.name + " " + client.lastName}
                </Text>
              </Flex>

              <Flex
                bg={"#85000F"}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Email:
                </Text>
                <Text paddingLeft={2}>{client.email}</Text>
              </Flex>

              <Flex
                bg={"#85000F"}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Descripción
                </Text>
                <Text paddingLeft={2}>Nada.</Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              name="Rechazar"
              border={"none"}
              bg={colors.primary}
              onClick={() => {
                rejectRequest(id);
              }}
            />
            <Button
              name="Aceptar"
              borderColor={"#a92a39"}
              bg={colors.primary}
              onClick={() => {
                acceptRequest(id);
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
