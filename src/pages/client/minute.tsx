import { Divider, Flex, Text } from "@chakra-ui/react";
import fileDownload from "js-file-download";
import { parseCookies } from "nookies";
import { RiArrowRightSLine } from "react-icons/ri";
import { ArchivePDF } from "../../assets/ArchivePDF";
import { useColors } from "../../hooks/useColors";
import { useToasts } from "../../hooks/useToasts";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

type FileListProps = {
  fileList: [
    {
      idFile: string;
      filename: string;
      originalname: string;
      created_at: Date;
    }
  ];
};

export default function minute({ fileList }: FileListProps) {
  const { toastSuccess, toastError } = useToasts();
  const { colors } = useColors();

  function downloadFile(originalname: string, file: string) {
    try {
      api({
        url: `/file/${file}`,
        method: "GET",
        responseType: "blob",
      })
        .then((res) => {
          fileDownload(res.data, originalname);
          toastSuccess({ description: "Archivo descargado" });
        })
        .catch((err) => {
          toastError({ description: "Error al descargar el archivo" });
        });
    } catch (err) {
      toastError({ description: "Error al descargar archivo" });
    }
  }

  function convertDate(date: Date) {
    return new Date(date).toLocaleString();
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
      color={colors.color}
    >
      <Flex
        flex="1"
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('/bgFrutas.png')"
        backgroundSize={[
          "calc(100vw - 50px)",
          "calc(100vw - 50px)",
          "calc(100vw - 50px)",
          "calc(100vw - 250px)",
        ]}
        align="center"
        justifyContent="center"
      >
        <Flex
          w={["100%", "90%", "60%"]}
          h="31rem"
          bg={colors.chat}
          p={5}
          flexDir="column"
          borderRadius={5}
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
          {/*tabla de certificado*/}
          {fileList?.map((file) => (
            <span key={file.idFile}>
              <Flex
                marginTop={3}
                marginBottom={3}
                align={"center"}
                justifyContent="space-between"
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  downloadFile(file.originalname, file.filename);
                }}
              >
                <Flex align={"center"} gap={5}>
                  <ArchivePDF />
                  <Text fontSize={15}> {file.originalname}</Text>
                </Flex>
                <Flex align={"center"} gap={10}>
                  <Text>{convertDate(file.created_at)}</Text>
                  <RiArrowRightSLine size={30} />
                </Flex>
              </Flex>
              <Divider />
            </span>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      // const response = await apiClient.get("/me");

      const cookies = parseCookies(ctx);
      const rut = cookies["rut"];

      const files = await apiClient.get(`/files/${rut}`);

      const fileList = files.data;
      // console.log(fileList);
      return {
        props: { fileList },
      };
    } catch (err) {
      return {
        props: {
          fileList: [], // Leh: Retorno vazio
        },
      };
    }
  },
  {
    roles: "client",
  }
);
