import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LogoImg from "../../public/pdf-archive.svg";

export function ArchivePDF() {
  return (
    <Flex>
      <Image width={30} height={30} src={LogoImg} alt="Connect" />
    </Flex>
  );
}
