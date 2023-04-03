import { Button, TableBody, TableCell, TableRow } from "@mui/material"
import { FC } from "react"
import { inventarioAPI } from "../api"
import { Product } from "../interfaces"

interface Props {
    products: Product[];
    onReload: ()=>void;
    onOpenEditProductModal: (product: Product) => void
}

export const ProductsTableBody: FC<Props> = ({ products,onReload, onOpenEditProductModal }) => {

  const onDeleteProduct = async(productId: number) => {
    try {
      await inventarioAPI.delete(`producto/delete?id=${productId}`);
      onReload();
    } catch (error) {
      
    }
  }


  return (
    <TableBody>
    {products.map((product: Product) => (
      <TableRow
        key={product.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">{product.id}</TableCell>
        <TableCell>{product.nombre}</TableCell>
        <TableCell>{product.descripcion}</TableCell>
        <TableCell>{product.precio}</TableCell>
        <TableCell>{product.stock}</TableCell>
        <TableCell>{product.marca.nombre}</TableCell>
        <TableCell>{product.seccion.codigo}</TableCell>
        <TableCell>{product.fecha_creacion}</TableCell>
        <TableCell>{product.fecha_actualizacion}</TableCell>
        <TableCell>
          <Button 
            variant="contained" 
            sx={{width:'80px', marginBottom: '5px' }}
            onClick={()=>{onOpenEditProductModal(product)}}
          > Edit </Button>

          <Button 
            variant="contained" 
            color='error' 
            sx={{width:'80px'}}
            onClick={()=>{onDeleteProduct(product.id)}}
          > Delete</Button>

        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  )
}
