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
import { useColors } from "../../hooks/useColors";
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
  rejectRequest?: (id: string) => void;
  acceptRequest?: (id: string) => void;
};

export function TableContentAppointment({
  id,
  title,
  description,
  state,
  client,
  rejectRequest,
  acceptRequest,
}: TableContentProps) {
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
              bg={"#484093"}
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
        <ModalContent bg={colors.bg} color={colors.color}>
          <ModalHeader>
            <Flex align={"center"} gap={3}>
              {/* <Avatar name={name + " " + lastName} /> */}
              Solicitud
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={2}>
            <Flex borderRadius="5" flexDir={"column"} flex="1" gap={3}>
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos de la solicitud
              </Text>

              <Flex
                bg={colors.bgHover}
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
              flexDir={"column"}
              flex="1"
              gap={3}
            >
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos del cliente:
              </Text>
              <Flex
                bg={colors.bgHover}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Rut:
                </Text>
                <Text paddingLeft={1}>{client.rut}</Text>
              </Flex>

              <Flex
                bg={colors.bgHover}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Nombre:
                </Text>
                <Text paddingLeft={1}>
                  {client.name + " " + client.lastName}
                </Text>
              </Flex>

              <Flex
                bg={colors.bgHover}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Email:
                </Text>
                <Text paddingLeft={1}>{client.email}</Text>
              </Flex>

              <Flex
                bg={colors.bgHover}
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Descripción
                </Text>
                <Text paddingLeft={1}>Nada.</Text>
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
              bg={colors.secondary}
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
