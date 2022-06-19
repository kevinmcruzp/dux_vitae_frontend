import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LogoImg from "../../public/oops.png";

export function NoMessage() {
  return (
    <Flex>
      <Image width={180} height={180} src={LogoImg} alt="No hay mensaje" />
    </Flex>
  );
}
