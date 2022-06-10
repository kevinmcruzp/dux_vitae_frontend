import { Tbody, Td, Tr } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";

type TableContentProps = {
  rut?: string;
  name?: string;
  lastName?: string;
  state?: string;
};

export function TableContent({
  rut,
  name,
  lastName,
  state,
}: TableContentProps) {
  const { colors } = useColors();

  return (
    <Tbody color={colors.color}>
      <Tr>
        <Td>{rut}</Td>
        <Td>{name} </Td>
        <Td>{lastName}</Td>
        <Td>{state}</Td>

        <Td>
          <Button bg={colors.tertiary} name="Editar" type="button" />
        </Td>
      </Tr>
    </Tbody>
  );
}
