import { Avatar, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { RiFile3Line } from "react-icons/ri";
import { io, Socket } from "socket.io-client";
import { ArchivePDF } from "../../assets/ArchivePDF";
import { ConnectImg } from "../../assets/ConnectImg";
import { NoMessage } from "../../assets/NoMessage";
import { useColors } from "../../hooks/useColors";
import { useToasts } from "../../hooks/useToasts";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface IMsg {
  room: string;
  name: string;
  message: string;
  nutritionistRut: string;
  clientRut: string;
  rutOwnerMessage: string;
}

type User = {
  name: string;
  lastName: string;
  email?: string;
};

type ServerSideProps = {
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
  rutOwnerMessage: string;
};

export default function message({ user, appointment, rut }: ServerSideProps) {
  const { toastSuccess, toastError } = useToasts();
  const { colors } = useColors();
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<MsgProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [myRoom, setMyRoom] = useState<string>("");
  const [nutritionistRut, setNutritionistRut] = useState<string>("");
  const [sockets, setSockets] = useState<Socket>(null as any);
  const [clientRut, setClientRut] = useState<string>("");

  const fileRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const chatElement = document.getElementById("chat-feed");

      if (chatElement) {
        chatElement.scrollTop = chatElement.scrollHeight;
      }
    }
  }, [chat]);

  useEffect(() => {
    const socket = io("http://localhost:3333", { transports: ["websocket"] });
    setSockets(socket);

    socket.on("connect", () => {
      console.log(socket.connected, "connect"); // true
    });

    socket.io.on("error", (error) => {
      console.log(error);
    });

    socket.on("message", (data) => {
      setChat((oldChat) => [...(oldChat || []), data]);
    });

    setClientRut(rut);
  }, []);

  const sendMessage = () => {
    const msg: IMsg = {
      room: myRoom,
      name: user?.name,
      message,
      clientRut: rut,
      nutritionistRut,
      rutOwnerMessage: rut,
    };

    sockets.emit("message", msg);

    setMessage("");
  };

  const sendFileMessage = (data) => {
    const { files } = data.target;

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      api.post("/files", formData).then(async (res) => {
        const createFileResponse = await api.post("file", {
          filename: res.data.filename,
          originalname: res.data.originalname,
          clientRut,
          nutritionistRut,
        });

        if (res.status === 200) {
          const msg: IMsg = {
            room: myRoom,
            name: user?.name,
            message: res.data.originalname,
            clientRut: rut,
            nutritionistRut,
            rutOwnerMessage: rut,
          };

          sockets.emit("message", msg);

          setMessage("");
        }
      });
    } catch (err) {
      toastError({ description: "Error al enviar el archivo" });
    }
  };

  async function openChat(room: string) {
    //Conectandome al room
    sockets.emit("room", room, user?.name);

    setChat([]);

    //Testear si el problema está aqui
    try {
      const response = await api.get(`/chat/${room}`);

      if (response.data?.Message === null) {
        setChat([]);
      } else {
        setChat(response.data?.Message);
      }
    } catch (err) {
      toastError({ description: "Error al abrir el chat" });
    }
  }

  //01 Hacer download del archivo (Realizar despues)
  // function downloadCertificate(fileName: string, file: string) {
  //   api({
  //     url: `/file/${file}`,
  //     method: "GET",
  //     responseType: "blob",
  //   }).then((res) => {
  //     fileDownload(res.data, fileName);
  //   });
  // }

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
          {appointment?.map((appointment) => {
            if (appointment?.state) {
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
                      justifyContent={"start"}
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
          <Flex
            id="chat-feed"
            flex="1"
            flexDir="column"
            overflowY={"auto"}
            __css={{
              "&::-webkit-scrollbar": {
                w: "2",
              },
              "&::-webkit-scrollbar-track": {
                w: "6",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `${colors.divider}`,
              },
            }}
          >
            {chat?.length ? (
              <Flex flex="1" flexDir="column">
                {chat?.map((chat, index) => (
                  <Flex
                    key={index}
                    marginBottom={3}
                    color={colors.color}
                    bg={
                      chat.rutOwnerMessage === rut
                        ? colors.messageContainer
                        : colors.bgHover
                    }
                    minW="25rem"
                    maxW={"50%"}
                    w="-moz-fit-content"
                    width="fit-content"
                    p={"10px 15px"}
                    borderRadius={"6px"}
                    marginLeft={chat.rutOwnerMessage === rut ? "auto" : "0"}
                    marginRight="20px"
                  >
                    <Flex flexDir={"column"} w="100%">
                      <Text color={colors.secondary} fontSize="0.7rem">
                        {chat.name}
                      </Text>

                      {chat.text?.split(".")[1] == "pdf" ? (
                        <Flex
                          align={"center"}
                          gap={3}
                          onClick={() => {
                            //01 Hacer download del archivo (Realizar despues)
                            // downloadCertificate(fileName[0], file);
                            // Enviar originalname para que se guarde en base de datos de mensaje
                            Router.push("/client/minute");
                          }}
                          _hover={{ cursor: "pointer" }}
                        >
                          <ArchivePDF />
                          <Text fontSize="0.9rem">{chat.text}</Text>
                        </Flex>
                      ) : (
                        <Text fontSize="0.9rem">{chat.text}</Text>
                      )}

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
                  <Flex
                    flexDir="column"
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                    gap={7}
                  >
                    <Flex as="span" bg={colors.chat} borderRadius={"50%"}>
                      <NoMessage />
                    </Flex>

                    <Text color={colors.divider} fontSize={"2xl"}>
                      No hay mensajes aún
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    flexDir={"column"}
                    w="100%"
                    h="100%"
                    align={"center"}
                    justifyContent={"center"}
                    gap={7}
                  >
                    <Flex as="span" bg={colors.chat} borderRadius={"50%"}>
                      <ConnectImg />
                    </Flex>
                    <Text color={colors.divider} fontSize={"2xl"}>
                      Conectate con un nutricionista
                    </Text>
                  </Flex>
                )}
              </>
            )}
          </Flex>

          {/* Footer del chat */}
          {connected && (
            <Flex gap={3}>
              <Text
                as="label"
                htmlFor="filePDF"
                display="flex"
                alignItems={"center"}
                h="100%"
                w="auto"
                cursor={"pointer"}
                _hover={{ filter: "brightness(90%)" }}
              >
                <RiFile3Line color={colors.divider} size="2rem" />
              </Text>
              <Input
                display={"none"}
                multiple={false}
                ref={fileRef}
                type="file"
                name="file"
                w="auto"
                onChange={sendFileMessage}
                accept=".pdf"
                id="filePDF"
              />

              <Input
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
                disabled={!connected || message == ""}
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
    try {
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get("/me");
      const user = response?.data;

      const cookies = parseCookies(ctx);
      const rut = cookies["rut"];
      const responseAppointment = await apiClient.get(`/appointments/${rut}`);
      const appointment = responseAppointment.data;

      return {
        props: {
          user,
          appointment,
          rut,
        },
      };
    } catch (err) {
      const cookies = parseCookies(ctx);
      const rut = cookies["rut"];

      return {
        props: {
          user: [],
          appointment: [],
          rut,
        },
      };
    }
  },
  {
    roles: "client",
  }
);
