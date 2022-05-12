import { Flex, Image } from "@chakra-ui/react";

// type Logo = {
//   logo: HTMLImageElement;
//   src: string | StaticImageData;
// };

export function Logo() {
  return (
    <Flex>
      <Image boxSize={130} src="DuxVitaeLogo.png" alt="Logo Dux Vitae" />
    </Flex>
  );
}
