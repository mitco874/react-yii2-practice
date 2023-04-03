import { TableCell, TableHead, TableRow } from "@mui/material"

export const ProductsTableHeader = () => {
  return (
    <TableHead>
    <TableRow>
      <TableCell>Id</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Stock</TableCell>
      <TableCell>Brand</TableCell>
      <TableCell>Section</TableCell>
      <TableCell>Creation date</TableCell>
      <TableCell>Update date</TableCell>
      <TableCell>Options</TableCell>
    </TableRow>
  </TableHead>
  )
}
