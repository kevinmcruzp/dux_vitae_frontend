import {
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import fileDownload from "js-file-download";
import { TableContentCertificate } from "../../components/TableContentCertificate";
import { useColors } from "../../hooks/useColors";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

type NutritionistProps = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: Date;
};

type ListCertificates = {
  listCertificates: [
    {
      idCertificate: string;
      file: string;
      state: boolean;
      created_at: Date;
      adminRut: string;
      nutritionistRut: string;
      nutritionist: NutritionistProps;
    }
  ];
};

export function downloadCertificate(fileName: string, file: string) {
  api({
    url: `/certificate/${file}`,
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    fileDownload(res.data, fileName);
  });
}

export default function certificate({ listCertificates }: ListCertificates) {
  const { colors } = useColors();

  return (
    <Flex
      flex="1"
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      align="top"
      justify="center"
      bg={colors.bg}
    >
      <TableContainer w="80%">
        <Text color={colors.color} mb="8px">
          Certificado:
        </Text>
        <Input
          // onChange={handleChange}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
        <Table w="100%" variant="striped">
          <TableCaption>Tabla de certificados</TableCaption>
          <Thead>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Certificado</Th>
            </Tr>
          </Thead>

          <Tbody color={colors.color}>
            {listCertificates.map((certificate) => (
              <TableContentCertificate
                key={certificate.idCertificate}
                idCertificate={certificate.idCertificate}
                file={certificate.file}
                state={certificate.state}
                created_at={certificate.created_at}
                adminRut={certificate.adminRut}
                nutritionist={certificate.nutritionist}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Rut</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Certificado</Th>
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
    const response = await apiClient.get("/me");

    const certificates = await apiClient.get("/certificate");

    const listCertificates = certificates.data;

    console.log(listCertificates);

    return {
      props: {
        listCertificates,
      },
    };
  },
  {
    roles: "admin",
  }
);
