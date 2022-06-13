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
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function client() {
  const { colors } = useColors();

  return (
    <Flex
      flex="1"
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      align="top"
      justify="center"
      bg={colors.bg}
    >
      <TableContainer w="80%">
        <Text color={colors.color} mb="8px">
          Cliente:
        </Text>
        <Input
          // onChange={handleChange}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
        <Table w="100%" variant="striped">
          <TableCaption>Tabla de clientes</TableCaption>
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

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    roles: "nutritionist",
  }
);
