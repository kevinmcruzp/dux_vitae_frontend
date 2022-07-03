import { Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { Key } from "react";
import {
  RiCheckboxBlankCircleFill,
  RiMailLine,
  RiUserLine
} from "react-icons/ri";
import { GridTemplate } from "../../components/GridTemplate";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type ClientData = {
  email: string;
  name: string;
  lastName: string;
};

type LastTwoAppointment = {
  lastTwoAppointment: [
    {
      idAppointment: Key;
      title: string;
      description: string;
      created_at: string;
      clientRut: string;
      client: ClientData;
      state: Boolean;
    }
  ];
  lastTwoAppointmentsAccepted: [
    {
      idAppointment: Key;
      title: string;
      description: string;
      created_at: string;
      clientRut: string;
      client: ClientData;
      state: Boolean;
    }
  ];
  lastTwoAppointmentsOnHold: [
    {
      idAppointment: Key;
      title: string;
      description: string;
      created_at: string;
      clientRut: string;
      client: ClientData;
      state: Boolean;
    }
  ];
};

export default function home({
  lastTwoAppointment,
  lastTwoAppointmentsAccepted,
  lastTwoAppointmentsOnHold,
}: LastTwoAppointment) {
  const { colors } = useColors();

  return (
    <Flex
      bg={colors.bg}
      color={colors.color}
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="calc(100vh - 60px)"
    >
      <SimpleGrid
        columns={2}
        w="100%"
        alignItems="top"
        justifyItems="center"
        gap={4}
        marginTop={4}
      >
        <GridTemplate title="Tus últimas solicitudes">
          {lastTwoAppointment?.length ? (
            <Flex flexDir="column" gap={3} flex="1">
              {lastTwoAppointment?.map((appointment) => (
                <Flex gap={2} key={appointment.idAppointment} flexDir="column">
                  <Text fontWeight={"bold"} fontSize="0.9rem">
                    Solicitud: {appointment.title}
                  </Text>
                  <Flex flexDir="column" paddingLeft={2} gap={1}>
                    <Flex align={"center"} gap={1}>
                      <RiMailLine />
                      <Text fontSize="0.8rem">{appointment.client.email}</Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiUserLine />
                      <Text fontSize="0.8rem">
                        {appointment.client.name} {appointment.client.lastName}
                      </Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiCheckboxBlankCircleFill
                        color={appointment.state ? "green" : "yellow"}
                      />
                      <Text fontSize="0.8rem">
                        {appointment.state ? "Aceptado" : "Pendiente..."}
                      </Text>
                    </Flex>
                  </Flex>

                  <Divider
                    w="100%"
                    orientation="horizontal"
                    color={colors.divider}
                  />
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex flex="1">
              <Text>No tienes solicitudes</Text>
            </Flex>
          )}
        </GridTemplate>

        <GridTemplate title="Consultas">
          <Flex flexDir="column" gap={3} flex="1"></Flex>
        </GridTemplate>

        <GridTemplate title="Solicitudes aceptadas">
          {lastTwoAppointmentsAccepted?.length ? (
            <Flex flexDir="column" gap={3} flex="1">
              {lastTwoAppointmentsAccepted?.map((appointment) => (
                <Flex gap={2} key={appointment.idAppointment} flexDir="column">
                  <Text fontWeight={"bold"} fontSize="0.9rem">
                    Solicitud: {appointment.title}
                  </Text>
                  <Flex flexDir="column" paddingLeft={2} gap={1}>
                    <Flex align={"center"} gap={1}>
                      <RiMailLine />
                      <Text fontSize="0.8rem">{appointment.client?.email}</Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiUserLine />
                      <Text fontSize="0.8rem">
                        {appointment.client.name} {appointment.client.lastName}
                      </Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiCheckboxBlankCircleFill color="green" />
                      <Text fontSize="0.8rem">Aceptado</Text>
                    </Flex>
                  </Flex>

                  <Divider
                    w="100%"
                    orientation="horizontal"
                    color={colors.divider}
                  />
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex flex="1">
              <Text>No tienes solicitudes aceptadas</Text>
            </Flex>
          )}
        </GridTemplate>

        <GridTemplate title="Solicitudes pendientes">
          {lastTwoAppointmentsOnHold?.length ? (
            <Flex flexDir="column" gap={3} flex="1">
              {lastTwoAppointmentsOnHold?.map((appointment) => (
                <Flex
                  key={appointment.idAppointment}
                  flex="1"
                  gap={2}
                  flexDir="column"
                >
                  <Text fontWeight={"bold"} fontSize="0.9rem">
                    Solicitud: {appointment.title}
                  </Text>
                  <Flex flexDir="column" paddingLeft={2} gap={1}>
                    <Flex align={"center"} gap={1}>
                      <RiMailLine />
                      <Text fontSize="0.8rem">{appointment.client?.email}</Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiUserLine />
                      <Text fontSize="0.8rem">
                        {appointment.client.name} {appointment.client.lastName}
                      </Text>
                    </Flex>

                    <Flex align={"center"} gap={1}>
                      <RiCheckboxBlankCircleFill color="yellow" />
                      <Text fontSize="0.8rem">Pendiente...</Text>
                    </Flex>
                  </Flex>

                  <Divider
                    w="100%"
                    orientation="horizontal"
                    color={colors.divider}
                  />
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex flex="1">
              <Text>No tienes solicitudes pendientes</Text>
            </Flex>
          )}
        </GridTemplate>

        {/* <GridTemplate title="Ver agenda">
          <Text color={colors.color}>Info</Text>
        </GridTemplate>

        <GridTemplate title="Feeds subidos">
          <Text color={colors.color}>Info</Text>
        </GridTemplate> */}
      </SimpleGrid>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      // const response = await apiClient.get("/me");

      const cookies = parseCookies(ctx);
      const nutritionistRut = cookies["rut"];
      const responseAppointment = await apiClient.get(
        `/appointments/${nutritionistRut}`
      );

      const lastTwoAppointment = responseAppointment.data.slice(
        responseAppointment.data.length - 2
      );

      //Filtrar según el estado, si es true es aceptado, si es false es pendiente
      const appointmentAccepted = responseAppointment.data.filter(
        (appointments) => {
          return appointments.state === true;
        }
      );

      const appointmentsOnHold = responseAppointment.data.filter(
        (appointments) => {
          return appointments.state === false;
        }
      );

      const lastTwoAppointmentsAccepted = appointmentAccepted.slice(
        appointmentAccepted.length - 2
      );

      const lastTwoAppointmentsOnHold = appointmentsOnHold.slice(
        appointmentAccepted.length - 2
      );

      return {
        props: {
          lastTwoAppointment,
          lastTwoAppointmentsAccepted,
          lastTwoAppointmentsOnHold,
        },
      };
    } catch(err) {
      return {
        props: {
          lastTwoAppointment: [], // Leh: Retorno vazio
          lastTwoAppointmentsAccepted: [], // Leh: Retorno vazio
          lastTwoAppointmentsOnHold: [], // Leh: Retorno vazio
        },
      };
    }
  },
  {
    roles: "nutritionist",
  }
);
