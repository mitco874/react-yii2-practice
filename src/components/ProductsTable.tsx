import { Box, Button, MenuItem, Paper, Table, TableContainer, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { inventarioAPI } from "../api";
import { InventarioContext } from "../context";
import { Product } from "../interfaces";
import { CreateProductModal, Filter, ProductsTableHeader, ProductsTablePagination, UpdateProductModal } from "./";
import { ProductsTableBody } from "./ProductsTableBody";

interface ProductsData {
  products: Product[] | [];
  stockOrder: 'NONE' | 'ASC' | 'DESC';
  nameOrder: 'NONE' | 'ASC' | 'DESC';
  brandId: number;
  page: number;
  limit: number;
  totalProducts: number
}

export const ProductsTable = () => {
  const [productsData, setProductsData] = useState<ProductsData>({
    products: [],
    stockOrder: 'NONE',
    nameOrder: 'NONE',
    brandId: -1,
    page: 0,
    limit: 5,
    totalProducts: 0
  });

  const { brands } = useContext(InventarioContext);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [errorLoadingProducts, setErrorLoadingProducts] = useState<boolean>(false);
  const [isRegisterProductModalOpen, setIsRegisterProductModalOpen] = useState<boolean>(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState<boolean>(false);
  const [currentEditedProduct, setCurrentEditedProduct] = useState<Product | undefined>();

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const { data } = await inventarioAPI
        .get(`producto?page=${productsData.page}&limit=${productsData.limit}&stockOrder=${productsData.stockOrder}&nameOrder=${productsData.nameOrder}&brandId=${productsData.brandId}`);
      setProductsData({ ...productsData, ...data });
      setIsLoadingProducts(false);
    } catch (error) {
      setErrorLoadingProducts(true);
    }
  }

  const onChangePage = (e: any) => {
    setProductsData({ ...productsData, page: (e.target.innerText - 1) })
  }

  const onChangeLimit = (e: any) => {
    setProductsData({ ...productsData, limit: e.target.value, page: 0 })
  }

  const onChangeStockOrder = (e: any) => {
    setProductsData({ ...productsData, stockOrder: (e.target.value) })
  }

  const onChangeNameOrder = (e: any) => {
    setProductsData({ ...productsData, nameOrder: (e.target.value) })
  }

  const onChangeBrandFilter = (e: any) => {
    setProductsData({ ...productsData, brandId: (e.target.value) })
  }

  const onOpenEditProductModal = (product: Product) => {
    setCurrentEditedProduct(product);
    setIsUpdateProductModalOpen(true);
  }

  useEffect(() => {
    fetchProducts();
  }, [productsData.page, productsData.limit, productsData.nameOrder, productsData.stockOrder, productsData.brandId])


  if (errorLoadingProducts) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4" >
          Error loading the products, server error
        </Typography>
      </Box>
    )
  }

  if (isLoadingProducts) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h5" >
          loading products...
        </Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginY="50px" width='90%'>

      <Box display='flex' justifyContent='space-between' width='90%' >
        <Button
          variant="contained"
          color='success'
          onClick={() => { setIsRegisterProductModalOpen(true) }}
        > Add product </Button>

        <Filter
          text="Limit"
          value={productsData.limit}
          onChange={onChangeLimit}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Filter>


        <Filter
          text="Name order"
          value={productsData.nameOrder}
          onChange={onChangeNameOrder}
        >
          <MenuItem value={'NONE'}>none</MenuItem>
          <MenuItem value={'ASC'}>asc</MenuItem>
          <MenuItem value={'DESC'}>desc</MenuItem>
        </Filter>


        <Filter
          text="Stock order"
          value={productsData.stockOrder}
          onChange={onChangeStockOrder}
        >
          <MenuItem value={'NONE'}>none</MenuItem>
          <MenuItem value={'ASC'}>asc</MenuItem>
          <MenuItem value={'DESC'}>desc</MenuItem>
        </Filter>

        <Filter
          text="Brand"
          value={productsData.brandId}
          onChange={onChangeBrandFilter}
        >
          <MenuItem value={-1} >All</MenuItem>
          {
            brands && brands.map(
              (brand) => (<MenuItem key={brand.id} value={brand.id}>{brand.nombre}</MenuItem>)
            )
          }
        </Filter>
      </Box>

      <TableContainer component={Paper} sx={{ width: '90%', marginBlock: '30px' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <ProductsTableHeader />
          <ProductsTableBody
            products={productsData.products}
            onReload={fetchProducts}
            onOpenEditProductModal={onOpenEditProductModal}
          />
        </Table>
      </TableContainer>

      <ProductsTablePagination
        count={Math.trunc(productsData.totalProducts / productsData.limit) + 1}
        currentPage={+productsData.page + 1}
        onChange={onChangePage}
      />

      <CreateProductModal
        isOpen={isRegisterProductModalOpen}
        onClose={() => { setIsRegisterProductModalOpen(false) }}
        onReloadProducts={fetchProducts}
      />

      <UpdateProductModal
        currentProduct={currentEditedProduct}
        isOpen={isUpdateProductModalOpen}
        onClose={() => { setIsUpdateProductModalOpen(false) }}
        onReloadProducts={fetchProducts}
      />
    </Box>
  )
}
