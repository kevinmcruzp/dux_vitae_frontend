import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LogoImg from "../../public/connect.png";

export function ConnectImg() {
  return (
    <Flex>
      <Image width={150} height={150} src={LogoImg} alt="Connect" />
    </Flex>
  );
}
