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
  Tr
} from "@chakra-ui/react";
import { NutritionistsTableContent } from "../../components/NutritionistsTableContent";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
3;

type ListNutritionistProps = {
  listNutritionist: [
    {
      rut: string;
      email: string;
      name: string;
      lastName: string;
      certificate: {
        state: boolean;
      };
    }
  ];
};

export default function nutritionist({
  listNutritionist,
}: ListNutritionistProps) {
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
          <TableCaption>Tabla de nutricionistas</TableCaption>
          <Thead>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody color={colors.color}>
            {listNutritionist?.map(
              (nutritionists) =>
                nutritionists?.certificate.state && (
                  <NutritionistsTableContent
                    key={nutritionists.rut}
                    rutNutritionist={nutritionists.rut}
                    name={nutritionists.name}
                    lastName={nutritionists.lastName}
                    email={nutritionists.email}
                    state={nutritionists.certificate.state}
                  />
                )
            )}
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
    try {
      const apiClient = setupAPIClient(ctx);
      // const response = await apiClient.get("/me");

      const responseNutritionist = await api.get("/nutritionists");
      const listNutritionist = responseNutritionist.data;

      return {
        props: {
          listNutritionist,
        },
      };
    } catch(err) {
      return {
        props: {
          listNutritionist: [], // Leh: Devolvo como array vazio
        },
      };
    }
  },
  {
    roles: "admin",
  }
);
