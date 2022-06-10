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
import Router from "next/router";
import { parseCookies } from "nookies";
import { TableContentAppointment } from "../../components/TableContentAppointment";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

export async function rejectRequest(id: string) {
  //Rota por se rechaza la solicitud
  console.log(id);
  const response = await api.delete(`/appointments/${id}`);
  if (typeof window !== undefined) {
    Router.reload(window.location.pathname);
  }
}

export async function acceptRequest(id: string) {
  //Rota por se aceita a solicitud
  const response = await api.put(`/appointments/${id}`);
  if (typeof window !== undefined) {
    Router.reload(window.location.pathname);
  }
}

export default function Request({ appointment }) {
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
          Solicitudes:
        </Text>
        <Input
          // onChange={handleChange}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
        <Table w="100%" variant="striped">
          <TableCaption>Tabla de solicitudes</TableCaption>
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Descripción</Th>
              <Th>Estado</Th>
              <Th></Th>
            </Tr>
          </Thead>
          {appointment.map((appointment) => (
            <TableContentAppointment
              key={appointment.idAppointment}
              id={appointment.idAppointment}
              title={appointment.title}
              description={appointment.description}
              state={appointment.state}
            />
          ))}

          <Tfoot>
            <Tr>
              <Th>Título</Th>
              <Th>Descripción</Th>
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
    const client = await apiClient.get("/me");

    const cookies = parseCookies(ctx);
    const rut = cookies["rut"];

    const responseAppointment = await api.get(`/appointments/${rut}`);

    const appointment = responseAppointment.data;

    return {
      props: {
        appointment,
      },
    };
  },
  {
    roles: "nutritionist",
  }
);
