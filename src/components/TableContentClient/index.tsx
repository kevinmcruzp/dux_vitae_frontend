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
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

type TableContentProps = {
  rut?: string;
  name?: string;
  lastName?: string;
  state?: string;
  email?: string;
};

export function TableContentClient({
  rut,
  name,
  lastName,
  state,
  email,
}: TableContentProps) {
  const { colors } = useColors();

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(state);

  return (
    <>
      {!state ? null : (
        <Tr color={colors.color}>
          <Td>{rut}</Td>
          <Td>{name} </Td>
          <Td>{lastName}</Td>
          {state === "true" ? null : <Td>Aceptado</Td>}

          <Td display="flex" alignItems={"center"} justifyContent={"flex-end"}>
            <Button
              bg={colors.tertiary}
              name="Perfil"
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
                <Text paddingLeft={1}>{rut}</Text>
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
    </>
  );
}
