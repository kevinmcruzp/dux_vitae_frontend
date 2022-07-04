import {
  Avatar,
  Button as ButtonChakra,
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
import { ArchivePDF } from "../../assets/ArchivePDF";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

type NutritionistProps = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: Date;
};

type TableContentProps = {
  idCertificate: string;
  file: string;
  state: boolean;
  created_at: Date;
  adminRut: string;
  nutritionist: NutritionistProps;
  AcceptNutritionistCertificate: (idCertificate: string) => void;
  downloadCertificate: (fileName: string, file: string) => void;
};

export function TableContentCertificate({
  idCertificate,
  file,
  state,
  created_at,
  adminRut,
  nutritionist,
  AcceptNutritionistCertificate,
  downloadCertificate,
}: TableContentProps) {
  const { colors } = useColors();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");

  const fileName = file.split("-");

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);
  }, []);

  return (
    <>
      <Tr color={colors.color}>
        <Td>{nutritionist.rut}</Td>
        <Td>{nutritionist.name} </Td>
        <Td>{nutritionist.lastName}</Td>

        <Td display="flex" alignItems={"center"} gap="1rem">
          <ButtonChakra
            bg="transparent"
            type="button"
            onClick={() => {
              downloadCertificate(fileName[0], file);
            }}
          >
            <ArchivePDF />
          </ButtonChakra>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={colors.primary} color={"#FFFFFF"}>
          <ModalHeader>
            <Flex align={"center"} gap={3}>
              <Avatar name={nutritionist.name + " " + nutritionist.lastName} />
              Perfil de {nutritionist.name}
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
                <Text>{nutritionist.rut}</Text>
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
                <Text>{nutritionist.name + " " + nutritionist.lastName}</Text>
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
                <Text>{nutritionist.email}</Text>
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

          <ModalFooter gap={3}>
            <Button
              name="Cerrar"
              border={"none"}
              bg={colors.primary}
              onClick={onClose}
            />
            <Button
              name="Aceptar"
              disabled={state}
              borderColor={"#a92a39"}
              bg={colors.primary}
              onClick={() => {
                AcceptNutritionistCertificate(idCertificate);
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
