import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
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

  useEffect(() => {
    const socket = io("http://localhost:3333", { transports: ["websocket"] });
    console.log("hola");

    socket.io.on("error", (error) => {
      console.log(error);
    });

    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.on("received", (msg) => {
      console.log(msg);
    });

    setSockets(socket);
  }, []);

  // useEffect(() => {
  //   async function conectingSocket() {
  //     console.log("Connecting to socket");
  //     const socket = await io("http://localhost:3333");

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

  //     return socket.disconnect();
  //   }

  //   conectingSocket();
  // }, []);

  const sendMessage = () => {
    console.log(sockets);

    sockets.emit("message", message);

    if (message) {
      const msg: IMsg = {
        user,
        message,
      };
    }

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
        <Flex flex="1" p={8}>
          {chat.length ? (
            chat.map((chat, index) => (
              <div key={"msg_" + 1}>
                <span>
                  <Text>{chat.user.email}</Text>
                </span>
                <Text>: {chat.message}</Text>
              </div>
            ))
          ) : (
            <Text>No messages yet</Text>
          )}

          <Input
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

          <Button type="button" disabled={!connected} onClick={sendMessage}>
            Enviar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
