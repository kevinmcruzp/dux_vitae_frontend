import { Center, Flex, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { Logo } from "../assets/Logo";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { useColors } from "../hooks/useColors";

export default function Home() {
  const { colors } = useColors()

  const isMobileVersion = useBreakpointValue({ base: true, sm: false })
  const isTabletVersion = useBreakpointValue({ base: false, md: true })
  const isWebVersion = useBreakpointValue({ base: false, lg: true })
  const isWebLargeVersion = useBreakpointValue({ base: false, xl: true })

  return (
    <Flex w="100vw" h="100vh">
      {isTabletVersion
        && (
          <Flex w="40%" h="100%" p={[2, 4, 6]} flexDir='column' bg={colors.primary}>
            <Logo />

            <Center flex='1' flexDir='column' gap={4} >
              <Text fontSize='4xl' >Bienvenido!</Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Saepe fugiat illum odio nulla eligendi. Illo facere atque,
                iusto mollitia sint fugiat voluptate blanditiis ipsum ullam
                necessitatibus ipsam aut. Quod, ea.
              </Text>
            </Center>
          </Flex>
        )
      }

      <Flex w={['100%', '100%', '60%']} h="100%" p={[2, 4, 6]} bg={colors.bgHover} flexDir="column">
        <Flex justify="space-between" align="center" gap={4} >
          {!isTabletVersion ? <Logo /> : <Flex />}

          <Flex>
            <ThemeSwitcher color={useColorModeValue('black', 'white')} />
            <Button name="Create Account" bg={colors.secondary} />
          </Flex>
        </Flex>

        <Center flex="1">
          <Flex
            as="form"
            flexDir="column"
            w={["80%", "70%", "60%"]}
            h="100%"
            justify="center"
            gap={4}
          >
            <Input idName="email" label="Email" color={colors.color} />
            <Input type="password" idName="password" label="Password" color={colors.color} />

            <Button mt={4} type="submit" name="Logon" bg={colors.primary} />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
}
