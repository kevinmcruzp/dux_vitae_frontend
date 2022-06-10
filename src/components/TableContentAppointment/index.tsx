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

type TableContentProps = {
  id?: string;
  title?: string;
  description?: string;
  state?: Boolean;
};

type AppointmentData = {
  req: Boolean;
};

export function TableContentAppointment({
  id,
  title,
  description,
  state,
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
      {/* Hacer despues las solicitudes aceptas */}
      {state ? null : (
        <Tbody color={colors.color}>
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
        </Tbody>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={colors.color}>
          <ModalHeader> Solicitud </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex flexDir="column" gap={3}>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={20}>{title}</Text>
                <Text>{stateReq}</Text>
              </Flex>

              <Textarea disabled>{description}</Textarea>
            </Flex>
          </ModalBody>

          <ModalFooter gap="2">
            <Button
              bgColor={colors.primary}
              type="button"
              onClick={() => {
                rejectRequest(id);
                onClose();
              }}
              name="Rechazar"
            />
            <Button
              bgColor={colors.tertiary}
              type="button"
              name="Aceptar"
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
