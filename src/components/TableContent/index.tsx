import { Tbody, Td, Tr } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

type TableContentProps = {
  rut: string;
  nombre: string;
  apellido: string;
  estado: string;
};

export function TableContent() {
  const { colors } = useColors();

  return (
    <Tbody color={colors.color}>
      <Tr>
        <Td>20683938-4</Td>
        <Td>Kevin </Td>
        <Td>Cruz</Td>
        <Td>Aprobado</Td>
        <Td>
          <Button bg={colors.tertiary} name="Editar" type="button" />
        </Td>
      </Tr>
    </Tbody>
  );
}
