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
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

type TableContentProps = {
  rutNutritionist?: string;
  name?: string;
  lastName?: string;
  email?: string;
  state?: Boolean;
};

export function NutritionistsTableContent({
  rutNutritionist,
  name,
  lastName,
  email,
  state,
}: TableContentProps) {
  const { colors } = useColors();

  const [buttonComponent, setButtonComponent] = useState<string>("profile");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);
  }, []);

  return (
    <>
      <Tr color={colors.color}>
        <Td>{rutNutritionist}</Td>
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
        </Td>
      </Tr>

      {buttonComponent === "profile" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={colors.primary} color={"#FFFFFF"}>
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
                  bg={"#85000F"}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Rut:
                  </Text>
                  <Text>{rutNutritionist}</Text>
                </Flex>

                <Flex
                  bg={"#85000F"}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Nombre:
                  </Text>
                  <Text>{name + " " + lastName}</Text>
                </Flex>

                <Flex
                  bg={"#85000F"}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Email:
                  </Text>
                  <Text>{email}</Text>
                </Flex>

                <Flex
                  bg={"#85000F"}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Revisión certificado:
                  </Text>
                  <Text>{state ? "Aceptado" : "En espera"}</Text>
                </Flex>

                <Flex
                  bg={"#85000F"}
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Descripción
                  </Text>
                  <Text>Nada.</Text>
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
      )}
    </>
  );
}
