import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type TableContentProps = {
  rut: string;
  nombre: string;
  apellido: string;
  estado: string;
};

export function TableContent() {
  return (
    <Table w="80%" variant="striped">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Rut</Th>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>Estado</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td>millimetres (mm)</Td>
          <Td>millimetres (mm)</Td>
          <Td>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td>centimetres (cm)</Td>
          <Td>centimetres (cm)</Td>
          <Td>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
          <Td>0.91444</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th>multiply by</Th>
          <Th>multiply by</Th>
          <Th>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
