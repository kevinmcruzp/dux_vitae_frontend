import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface ButtonProps extends ChakraButtonProps {
  type?: "button" | "submit" | "reset";
  name: string;
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { type = "button", name, ...rest },
  ref
) => (
  <ChakraButton
    border="1px solid"
    borderColor="gray.500"
    color="white"
    transition="0.2s"
    _hover={{
      filter: "brightness(107%)",
    }}
    size="lg"
    type={type}
    ref={ref}
    {...rest}
  >
    {name}
  </ChakraButton>
);

export const Button = forwardRef(ButtonBase);
