import {
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TableContent } from "../../components/TableContent";
import { useColors } from "../../hooks/useColors";

export default function nutritionist() {
  const { colors } = useColors();

  return (
    <Flex
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="calc(100vh - 60px)"
      bg={colors.bg}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <TableContainer w="80%">
        <Text color={colors.color} mb="8px">
          Nutricionista:
        </Text>
        <Input
          // onChange={handleChange}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
        <Table w="100%" variant="striped">
          <TableCaption>Tabla de nutricionistas</TableCaption>
          <Thead>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Estado</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <TableContent />

          <Tfoot>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Estado</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
