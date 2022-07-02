import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LogoImg from "../../public/bgFrutas.png";

export function BgFrutas() {
  return (
    <Flex>
      <Image width="auto" height="auto" src={LogoImg} alt="Connect" />
    </Flex>
  );
}
