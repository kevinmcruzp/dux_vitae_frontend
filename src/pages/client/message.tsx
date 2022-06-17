import { Avatar, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { io } from "socket.io-client";
import { ConnectImg } from "../../assets/ConnectImg";
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
      nutritionistRut: string;
      nutritionist: User;
    }
  ];
  rut: string;
};

type MsgProps = {
  room: string;
  name: string;
  text: string;
  created_at?: Date;
};

const socket = io("http://localhost:3333", { transports: ["websocket"] });

export default function message({ user, appointment, rut }: serverSideProps) {
  const { colors } = useColors();

  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<MsgProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [myRoom, setMyRoom] = useState<string>("");
  const [nutritionistRut, setNutritionistRut] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected, "connect"); // true
    });

    socket.io.on("error", (error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((oldChat) => [...oldChat, data]);
    });
  }, []);

  const sendMessage = () => {
    const msg: IMsg = {
      room: myRoom,
      name: user.name,
      message,
      clientRut: rut,
      nutritionistRut,
    };

    socket.emit("message", msg);

    setMessage("");
  };

  async function openChat(room: string) {
    //Conectandome al room
    socket.emit("room", room, user.name);

    setChat([]);

    const response = await api.get(`/chat/${room}`);
    if (response.data?.Message === null) {
      setChat([]);
    } else {
      setChat(response.data?.Message);
    }
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
      <Flex w="100%" h="100%" bg={colors.bg} flexDir="row">
        {/* sidebar do chat */}
        <Flex flexDir="column" maxW="300px">
          {appointment.map((appointment) => {
            if (appointment.state) {
              return (
                <Flex key={appointment.nutritionistRut} flexDir={"column"}>
                  <Flex w="100%" align="center">
                    <Button
                      w="100%"
                      fontSize={"1rem"}
                      color={colors.color}
                      type="button"
                      onClick={() => {
                        setConnected(true);
                        setMyRoom(appointment.idAppointment);
                        setNutritionistRut(appointment.nutritionistRut);
                        openChat(appointment.idAppointment);
                      }}
                      _hover={{ filter: "brightness(90%)" }}
                      _focus={{ outline: "none", background: colors.chat }}
                      bg={colors.bg}
                      border={"none"}
                      borderRadius={"none"}
                      gap={3}
                      padding={8}
                    >
                      <Avatar
                        name={
                          appointment.nutritionist.name +
                          " " +
                          appointment.nutritionist.lastName
                        }
                      />
                      {appointment.nutritionist.name}
                    </Button>
                  </Flex>
                  <Divider
                    w="100%"
                    orientation="horizontal"
                    color={colors.divider}
                  />
                </Flex>
              );
            }
          })}
        </Flex>

        <Divider orientation="vertical" color={colors.divider} />
        {/* Area del chat */}
        <Flex
          flex="1"
          p={8}
          flexDir="column"
          gap={4}
          maxW={"calc(100% - 250px)"}
          color={colors.color}
        >
          {/* Body del chat */}
          <Flex flex="1" flexDir="column" overflowY={"auto"}>
            {chat?.length ? (
              <Flex flex="1" flexDir="column">
                {chat.map((chat, index) => (
                  <Flex
                    key={index}
                    marginBottom={3}
                    color={colors.color}
                    bg={colors.bgHover}
                    minW="25rem"
                    maxW={"calc(100% - 200px)"}
                    w="-moz-fit-content"
                    width="fit-content"
                    p={"10px 15px"}
                    borderRadius={"6px"}
                  >
                    <Flex flexDir={"column"} w="100%">
                      <Text color={colors.secondary} fontSize="0.7rem">
                        {chat.name}
                      </Text>
                      <Text fontSize="0.9rem">{chat.text}</Text>
                      <Text
                        color={colors.divider}
                        fontSize="0.6rem"
                        textAlign={"right"}
                      >
                        {new Date(chat.created_at).toLocaleString()}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            ) : (
              <>
                {connected ? (
                  <Flex> No hay mensajes aún</Flex>
                ) : (
                  <Flex
                    flexDir={"column"}
                    flex="1"
                    align={"center"}
                    justifyContent={"center"}
                    gap={7}
                  >
                    <Flex as="span" bg={colors.chat} borderRadius={"50%"}>
                      <ConnectImg />
                    </Flex>
                    <Text color={colors.divider} fontSize={"2xl"}>
                      Conectate con tus Clientes
                    </Text>
                  </Flex>
                )}
              </>
            )}
          </Flex>

          {/* Footer del chat */}
          {connected && (
            <Flex gap={3}>
              <Input
                maxW="55rem"
                type="text"
                id="message"
                placeholder={connected ? "Escribe tu mensaje" : "Conectando..."}
                _placeholder={{ color: colors.divider }}
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
                color={colors.color}
                bg={colors.bg}
                borderColor={colors.divider}
                _focus={{ outline: "none" }}
                _hover={{ outline: "none" }}
              />

              <Button
                type="button"
                disabled={!connected}
                bg={"transparent"}
                border="none"
                onClick={() => {
                  sendMessage();
                }}
                _hover={{ background: "transparent" }}
                _focus={{ outline: "none", background: "transparent" }}
                outline="none"
                textDecoration="none"
                outlineColor={"transparent"}
              >
                <AiOutlineSend
                  colorInterpolation={colors.divider}
                  size="2rem"
                />
              </Button>
            </Flex>
          )}
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
    roles: "client",
  }
);
