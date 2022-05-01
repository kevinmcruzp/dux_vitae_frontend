import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  idName: string;
  label?: string;
  error?: FieldError;
  color?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { idName, label, error = null, color = 'white', ...rest },
  ref
) => (
  <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={idName} color={color}>{label}</FormLabel>}

    <ChakraInput
      border="1px solid"
      borderColor="gray.500"
      id={idName}
      name={idName}
      size="lg"
      ref={ref}
      {...rest}
    />

    {!!error && (
      <FormErrorMessage color="red.500">{error.message} </FormErrorMessage>
    )}
  </FormControl>
);

export const Input = forwardRef(InputBase);
