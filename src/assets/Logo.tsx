import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LogoImg from "../../public/DuxVitaeLogo.png";

// type Logo = {
//   logo: HTMLImageElement;
//   src: string | StaticImageData;
// };

export function Logo() {
  return (
    <Flex>
      <Image width={180} height={180} src={LogoImg} alt="Logo Dux Vitae" />
    </Flex>
  );
}
