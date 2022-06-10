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
import { parseCookies } from "nookies";
import { TableContentNutritionist } from "../../components/TableContentNutritionist";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

type NutritionistsProps = [{ rut: string; name: string; lastName: string }];

export default function client({ nutritionists, appointment }) {
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
      align="center"
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
          {nutritionists.map((nutritionists) => (
            <TableContentNutritionist
              key={nutritionists.rut}
              request={nutritionists.rut === appointment?.nutritionistRut}
              rut={nutritionists.rut}
              name={nutritionists.name}
              lastName={nutritionists.lastName}
            />
          ))}

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
    const client = await apiClient.get("/me");

    const cookies = parseCookies(ctx);
    const rut = cookies["rut"];
    console.log(rut);
    const responseAppointment = await api.get(`/appointments/${rut}`);

    const appointment = responseAppointment.data;

    const responseNutritionist = await api.get("/nutritionists");
    const nutritionists = responseNutritionist.data;

    return {
      props: {
        nutritionists,
        appointment,
      },
    };
  },
  {
    roles: "client",
  }
);
