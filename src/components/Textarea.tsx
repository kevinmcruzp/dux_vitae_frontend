import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends ChakraTextareaProps {
  idName: string;
  label?: string;
  error?: FieldError;
  color?: string;
  value?: string;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ idName, label, error = null, color, value, ...rest }, ref) => (
  <FormControl isInvalid={!!error}>
    {!!label && (
      <FormLabel htmlFor={idName} color={color}>
        {label}
      </FormLabel>
    )}

    <ChakraTextarea
      border="1px solid"
      borderColor="gray.500"
      id={idName}
      name={idName}
      size="lg"
      color={color}
      ref={ref}
      {...rest}
    />

    {!!error && (
      <FormErrorMessage color="red.500">{error.message} </FormErrorMessage>
    )}
  </FormControl>
);

export const Textarea = forwardRef(TextareaBase);
