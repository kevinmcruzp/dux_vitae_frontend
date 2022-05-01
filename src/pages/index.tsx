import { Center, Flex } from "@chakra-ui/react";
import { Logo } from "../assets/Logo";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh">
      <Flex w="40%" h="100%" p={[2, 4, 6]} bg="gray.900">
        <Flex>
          <Logo />
        </Flex>
      </Flex>

      <Flex w="60%" h="100%" p={[2, 4, 6]} bg="gray.800" flexDir="column">
        <Flex justify="flex-end" align="flex-start">
          <Button name="Create New User" bg="blue.500" />
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
            <Input idName="email" label="Email" />
            <Input type="password" idName="password" label="Password" />

            <Button mt={4} type="submit" name="Logon" bg="blue.500" />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
}
