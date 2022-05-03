import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useColors } from "../hooks/useColors";

export default function Clients() {
  const { colors } = useColors();

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Flex bg={colors.bg} flex="1">
        <Text color={colors.color}>Clients</Text>
      </Flex>
    </>
  );
}
