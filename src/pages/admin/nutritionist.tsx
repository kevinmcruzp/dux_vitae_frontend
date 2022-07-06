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
import { NutritionistsTableContent } from "../../components/NutritionistsTableContent";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
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
  const [search, setSearch] = useState("");

  const nutritionistFiltered = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return listNutritionist?.filter((nutritionist) =>
      nutritionist.name.toLowerCase().includes(lowerSearch)
    );
  }, [search, listNutritionist]);

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
          Nutricionista:
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
            {nutritionistFiltered?.map(
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

      const responseNutritionist = await apiClient.get("/nutritionists");
      const listNutritionist = responseNutritionist.data;

      return {
        props: {
          listNutritionist,
        },
      };
    } catch (err) {
      return {
        props: {
          listNutritionist: [],
        },
      };
    }
  },
  {
    roles: "admin",
  }
);
