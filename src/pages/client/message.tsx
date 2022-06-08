import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface IMsg {
  room: string;
  name: string;
  message: string;
}

type User = {
  name: string;
  lastName: string;
  email: string;
  roles: string;
};

type MsgProps = {
  room: string;
  name: string;
  text: string;
  createdAt: Date;
};

export default function message(user: User) {
  const [connected, setConnected] = useState<boolean>(true);

  const [chat, setChat] = useState<MsgProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [sockets, setSockets] = useState<Socket>();
  console.log(chat);
  const room = "room1";

  useEffect(() => {
    // console.log(user);
    // setMyUser(user);
    // console.log(myUser);
    const socket = io("http://localhost:3333", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.io.on("error", (error) => {
      console.log(error);
    });

    socket.emit("room", room, user.name);

    socket.on("message", (data) => {
      console.log(data, "dentro de data");
      setChat(data);
    });

    setSockets(socket);
  }, []);

  const sendMessage = () => {
    const msg: IMsg = {
      room,
      name: user.name,
      message,
    };
    sockets.emit("message", msg);

    setMessage("");

    return () => {
      sockets.disconnect();
    };
  };

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
      bg={colors.bg}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        w={["100%", "90%", "60%"]}
        h="31rem"
        bg={colors.bgHover}
        flexDir="row"
      >
        <Flex flexDir="column" p={4} gap={5} maxW="150px">
          <Text>hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
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
            {chat.length ? (
              chat.map(
                (chat, index) => (
                  console.log(chat, "dentro de chat"),
                  (
                    <Flex key={index}>
                      <Text>{chat.name}</Text>
                      <Text maxW={"calc(100% - 150px)"}>: {chat.text}</Text>
                    </Flex>
                  )
                )
              )
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
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     sendMessage();
              //   }
              // }}
            />

            <Button type="submit" disabled={!connected} onClick={sendMessage}>
              Enviar
            </Button>
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
    return {
      props: {
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
        roles: response.data.roles,
      },
    };
  },
  {
    roles: "client",
  }
);
