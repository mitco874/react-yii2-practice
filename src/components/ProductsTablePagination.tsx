import { Pagination, Stack } from "@mui/material"
import { FC } from "react";

interface Props {
    count: number;
    onChange: (e: any)=> void;
    currentPage: number;
}

export const ProductsTablePagination: FC<Props> = ({ count, onChange, currentPage }) => {
  return (
    <Stack spacing={2}>
    <Pagination 
      page={currentPage}
      count={count} 
      variant="outlined" 
      color="secondary" 
      onChange={onChange}
    />
  </Stack>
  )
}
