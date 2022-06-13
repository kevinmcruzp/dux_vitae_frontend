import { useRouter } from "next/router";
import Link from 'next/link'

//Lista los usuarios<>
{Data.map((user) => {
<>
<Text>
{user.name}
</Text>

<Link href={{
            pathname: "/user/update",
            query: { id: user.id }
           }} passHref>
asdasdasd
</Link>
</>;
})}

//Recuperar el id en la ruta de actualizar el usuario
const {query:{id}} = router;

//////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
import { Divider, Flex, Input, Text } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
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

const [connected, setConnected] = useState(false);
const [chat, setChat] = useState<MsgProps[]>([]);

console.log("MUDEI: ", chat);

const [message, setMessage] = useState("");
const [sockets, setSockets] = useState<Socket>();
const [idCurrentlyOpenedRoom, setIdCurrentlyOpenedRoom] = useState("");
const [clientRut, setClientRut] = useState("");

const socket = io("http://localhost:3333", { transports: ["websocket"] });

useEffect(() => {
setChat([]);

    if (idCurrentlyOpenedRoom === "") {
      return;
    }

    api
      .get(`/chat/${idCurrentlyOpenedRoom}`)
      .then((response) => setChat(response?.data?.Message));

}, [idCurrentlyOpenedRoom]);

useEffect(() => {
console.log("HERE");
socket.on("connect", () => {
console.log("Is connected: ", socket.connected);
});

    socket.io.on("error", (error) => {
      console.log("Connection socket error: ", error);
    });

    socket.on("message", (data) => {
      // TODO: Verificar se chat está vazio. Se estiver ele nao consgue fazer o .length
      if (chat.length >= 1) {
        console.log("YES");
        setChat((oldChat) => [...oldChat, data]);
      } else {
        console.log("NO");
        setChat(data);
      }
    });

    setSockets(socket);

}, [chat]);

const handleListenSocket = (
isConnected: boolean,
idCurrentlyOpenedRoom: string,
clientRut: string
) => {
setConnected(isConnected);
setIdCurrentlyOpenedRoom(idCurrentlyOpenedRoom);
setClientRut(clientRut);
};

const sendMessage = () => {
const msg: IMsg = {
room: idCurrentlyOpenedRoom,
name: user.name,
message,
nutritionistRut: rut,
clientRut,
};

    sockets.emit("room", idCurrentlyOpenedRoom, user.name);
    sockets.emit("message", msg);

    setMessage("");

};

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
color={colors.color} >
<Flex
w={["100%", "90%", "60%"]}
h="31rem"
bg={colors.bgHover}
flexDir="row"
gap={2} >
<Flex flexDir="column" p={4} gap={5} maxW="150px">
{appointment?.map((appointment) => {
if (appointment.state) {
return (
<Button
key={appointment.clientRut}
name={appointment.client.name}
type="button"
onClick={() =>
handleListenSocket(
true,
appointment.idAppointment,
appointment.clientRut
)
}
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
            {chat?.length >= 1 ? (
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
