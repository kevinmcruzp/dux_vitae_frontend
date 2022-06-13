import { Divider, Flex, Input, Text } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "../../components/Button";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface IMsg {
  room: string;
  name: string;
  message: string;
  nutritionistRut: string;
  clientRut: string;
}

type User = {
  name: string;
  lastName: string;
  email?: string;
};

type serverSideProps = {
  user: User;
  appointment: [
    {
      idAppointment: string;
      state: boolean;
      clientRut: string;
      client: User;
    }
  ];
  rut: string;
};

type MsgProps = {
  room: string;
  name: string;
  text: string;
  createdAt: Date;
};

export default function message({ user, appointment, rut }: serverSideProps) {
  const { colors } = useColors();

  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<MsgProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [sockets, setSockets] = useState<Socket>();
  const [myRoom, setMyRoom] = useState<string>("");
  const [clientRut, setClientRut] = useState<string>("");

  const sendMessage = () => {
    const msg: IMsg = {
      room: myRoom,
      name: user.name,
      message,
      nutritionistRut: rut,
      clientRut,
    };

    sockets.emit("room", myRoom, user.name);
    sockets.emit("message", msg);

    setMessage("");
  };

  async function openChat(room: string) {
    const socket = io("http://localhost:3333", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Is connected: ", socket.connected);
    });

    socket.io.on("error", (error) => {
      console.log("Connection socket error: ", error);
    });

    socket.on("message", (data) => {
      console.log("CHAT LENGTH: ", chat);
      // console.log("DATA CHAT: ", data);
      if (chat.length >= 1) {
        console.log("MAIOR OU IGUAL A UM");
        // setChat((oldChat) => [...oldChat, data]);
      } else {
        console.log("MENOR QUE UM");
        // setChat(data);
      }
    });

    const response = await api.get(`/chat/${room}`);
    if (response?.data?.Message === null) {
      setChat([]);
    } else {
      setChat(response?.data?.Message);
    }
    setSockets(socket);
  }

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
      color={colors.color}
    >
      <Flex
        w={["100%", "90%", "60%"]}
        h="31rem"
        bg={colors.bgHover}
        flexDir="row"
        gap={2}
      >
        <Flex flexDir="column" p={4} gap={5} maxW="150px">
          {appointment.map((appointment) => {
            if (appointment.state) {
              return (
                <Button
                  key={appointment.clientRut}
                  name={appointment.client.name}
                  type="button"
                  onClick={() => {
                    setConnected(true);
                    setMyRoom(appointment.idAppointment);
                    setClientRut(appointment.clientRut);
                    openChat(appointment.idAppointment);
                  }}
                  background="transparent"
                  border={"none"}
                />
              );
            }
          })}
        </Flex>

        <Divider orientation="vertical" color={colors.divider} />
        <Flex
          flex="1"
          p={8}
          flexDir="column"
          gap={4}
          maxW={"calc(100% - 150px)"}
        >
          <Flex flex="1" flexDir="column" overflowY={"auto"}>
            {chat?.length ? (
              chat.map((chat, index) => (
                <Flex key={index}>
                  <Text>{chat.name}</Text>
                  <Text maxW={"calc(100% - 150px)"}>: {chat.text}</Text>
                </Flex>
              ))
            ) : (
              <Text>No messages yet</Text>
            )}
          </Flex>

          <Flex>
            <Input
              maxW="50rem"
              type="text"
              id="message"
              placeholder={connected ? "Type your message" : "Connecting..."}
              disabled={!connected}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              value={message}
            />

            <Button
              name="Enviar"
              type="submit"
              disabled={!connected}
              onClick={() => {
                sendMessage();
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
    const user = {
      name: response.data.name,
      lastName: response.data.lastName,
      email: response.data.email,
    };

    const cookies = parseCookies(ctx);
    const rut = cookies["rut"];
    const responseAppointment = await api.get(`/appointments/${rut}`);
    const appointment = responseAppointment.data;

    return {
      props: {
        user,
        appointment,
        rut,
      },
    };
  },
  {
    roles: "nutritionist",
  }
);
