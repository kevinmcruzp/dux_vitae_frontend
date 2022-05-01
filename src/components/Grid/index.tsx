import { Center, Divider, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useColors } from "../../hooks/useColors";

type GridProps = {
  title: string
  children: ReactNode
}

export function Grid({ title, children }: GridProps) {
  const { colors } = useColors();

  return (
    <Flex w='500px' h='300px' flexDir='column' borderRadius='12px' bg={colors.bgHover} >
      <Center>
        <Text fontSize='2xl' py={2} color={colors.color} >{title}</Text>
      </Center>

      <Divider color={colors.divider} />

      <Flex p={4} >
        {children}
      </Flex>
    </Flex>
  )
}
