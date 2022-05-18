import {
  Flex,
  Select,
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

export default function Clients() {
  const { colors } = useColors();

  return (
    <Flex
      w="calc(100vw - 250px)"
      h="calc(100vh - 60px)"
      align="center"
      justify="center"
      bg={colors.bg}
      p={2}
    >
      <TableContainer w="80%">
        <Text color={colors.color} mb="8px">
          Certificates:
        </Text>

        <Select placeholder="Buscar" size="sm" w="30%" minW="200px">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Table w="100%" variant="striped">
          <TableCaption>Tabla de certificados</TableCaption>
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
