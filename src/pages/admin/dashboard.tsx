import {
  Center,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import faker from "faker";
import { Line } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";
import { withSSRAuth } from "../../utils/withSSRAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function dashboard() {
  const { user } = useAuth();

  //Validar permisos de usuario
  // const useCanSeeMetrics = useCan({
  //   roles: "administrator",
  // });

  const { colors } = useColors();

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      gap={8}
      bg={colors.bg}
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      h="calc(100vh - 60px)"
      overflowY="auto"
    >
      <SimpleGrid columns={1} alignItems="center" justifyItems="center">
        <Flex w="600px" h="300px">
          <Line options={options} data={data} />
        </Flex>
      </SimpleGrid>

      <SimpleGrid columns={2} w="100%" alignItems="center" gap="10%">
        <Flex w="100%" justifyContent="end">
          <Flex
            w="66%"
            h="300px"
            flexDir="column"
            borderRadius="12px"
            bg={colors.bgHover}
          >
            <Center>
              <Text fontSize="2xl" py={2} color={colors.color}>
                Ver agenda
              </Text>
            </Center>

            <Divider color={colors.divider} />

            <Flex p={4}>
              <Text color={colors.color}>Info</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex w="100%" justifyContent="start">
          <Flex
            w="66%"
            h="300px"
            flexDir="column"
            borderRadius="12px"
            bg={colors.bgHover}
          >
            <Center>
              <Text fontSize="2xl" py={2} color={colors.color}>
                Tus ultimas actividades
              </Text>
            </Center>

            <Divider color={colors.divider} />

            <Flex p={4}>
              <Text color={colors.color}>Info</Text>
            </Flex>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Grid>
  );
}

//Si el usuario no está autenticado, lo redirige a la página de login
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    // const apiClient = setupAPIClient(ctx);
    // const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    roles: "admin",
  }
);
