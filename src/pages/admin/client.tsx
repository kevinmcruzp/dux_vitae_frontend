import {
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TableContentClient } from "../../components/TableContentClient";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type Clients = {
  clients: [
    {
      rut: string;
      email: string;
      name: string;
      lastName: string;
      created_at: Date;
    }
  ];
};

export default function client({ clients }: Clients) {
  const { colors } = useColors();
  const [search, setSearch] = useState("");

  const clientFiltered = useMemo(() => {
    const lowerCase = search.toLowerCase();

    return clients.filter((client) =>
      client.name.toLowerCase().includes(lowerCase)
    );
  }, [search, clients]);

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
          onChange={(event) => setSearch(event.target.value)}
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
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody color={colors.color}>
            {clientFiltered?.map((clients) => (
              <TableContentClient
                key={clients.rut}
                rut={clients.rut}
                name={clients.name}
                lastName={clients.lastName}
                state={"true"}
                email={clients.email}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
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

    const listClient = await apiClient.get("/clients");

    const clients = listClient.data;

    console.log(clients);

    return {
      props: {
        clients,
      },
    };
  },
  {
    roles: "admin",
  }
);
