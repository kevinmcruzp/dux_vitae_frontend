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
import Router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { TableContentNutritionist } from "../../components/TableContentNutritionist";
import { useColors } from "../../hooks/useColors";
import { useToasts } from "../../hooks/useToasts";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function client({ nutritionists, appointment }) {
  const { colors } = useColors();
  const [rut, setRut] = useState<string[]>([]);
  const { toastSuccess, toastError } = useToasts();

  async function onReloadPage(data) {
    try {
      api.post("/appointments", data);

      toastSuccess({ description: "Solicitud generada" });

      setTimeout(() => {
        Router.reload();
      }, 3000);
    } catch (error) {
      toastError({ description: "Error al generar solicitud" });
    }
  }

  useEffect(() => {
    appointment?.map((appointment) => {
      setRut((rut) => [...rut, appointment.nutritionistRut]);
    });
  }, []);
  // console.log(rut);
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
            {nutritionists?.map(
              (nutritionists) =>
                nutritionists?.certificate?.state && (
                  <TableContentNutritionist
                    key={nutritionists.rut}
                    request={rut.includes(nutritionists.rut)}
                    rutNutritionist={nutritionists.rut}
                    name={nutritionists.name}
                    lastName={nutritionists.lastName}
                    email={nutritionists.email}
                    onReloadPage={onReloadPage}
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
      // const client = await apiClient.get("/me");

      const cookies = parseCookies(ctx);
      const rut = cookies["rut"];
      // console.log(rut);
      const responseAppointment = await apiClient.get(`/appointments/${rut}`);

      const appointment = responseAppointment?.data;

      const responseNutritionist = await apiClient.get("/nutritionists");
      const nutritionists = responseNutritionist?.data;

      return {
        props: {
          nutritionists,
          appointment,
        },
      };
    } catch (err) {
      return {
        props: {
          nutritionists: [], // Leh: Retorno vazio
          appointment: [], // Leh: Retorno vazio
        },
      };
    }
  },
  {
    roles: "client",
  }
);
