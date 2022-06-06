import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

type User = {
  name: string;
  lastName: string;
  email: string;
  roles: string;
};

interface IMsg {
  user: User;
  message: string;
}

export default function message() {
  const [connected, setConnected] = useState<boolean>(true);

  const [chat, setChat] = useState<IMsg[]>([]);
  const [message, setMessage] = useState<string>("");

  const [sockets, setSockets] = useState<Socket>();

  const { user } = useAuth();

  console.log(chat);

  useEffect(() => {
    const socket = io("http://localhost:3333", { transports: ["websocket"] });

    socket.io.on("error", (error) => {
      console.log(error);
    });

    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.on("received", (user, message) => {
      // if (message) {
      //   addChat(user, message);
      //   // setChat([...chat, { user, message }]);
      // }
    });

    setSockets(socket);
  }, []);

  // useEffect(() => {
  //     const socket = io("http://localhost:3333");

  //     console.log(socket.id);

  //     socket.on("connect", () => {
  //       console.log(socket.id); // "G5p5..."
  //     });

  //     setConnected(true);

  //     socket.on("message", (data: IMsg) => {
  //       setChat([...chat, data]);
  //     });

  //     socket.io.on("error", (error) => {
  //       console.log(error);
  //     });

  //   conectingSocket();
  // }, []);

  // function addChat(user, message) {
  //   const msg: IMsg = {
  //     user,
  //     message,
  //   };

  //   setChat([...chat, msg]);
  // }

  const sendMessage = () => {
    sockets.emit("message", user, message);

    const msg: IMsg = {
      user,
      message,
    };

    setChat([...chat, msg]);

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
        <Flex flex="1" p={8} flexDir="column" gap={4}>
          <Flex h="29rem" flexDir="column" maxW="40rem" overflowY={"auto"}>
            {chat.length ? (
              chat.map(
                (chat, index) => (
                  console.log(chat),
                  (
                    <Flex key={index}>
                      <span>
                        <Text>{chat.user.name}</Text>
                      </span>
                      <Text>: {chat.message}</Text>
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
              maxW={"50rem"}
              type={"text"}
              placeholder={connected ? "Type your message" : "Connecting..."}
              disabled={!connected}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
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
      props: {},
    };
  },
  {
    roles: "nutritionist",
  }
);
