import { Box, Modal } from "@mui/material";
import { FC } from "react";
import { inventarioAPI } from "../api";
import { Product } from "../interfaces";
import { ProductForm } from "./ProductForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentProduct?: Product;
    onReloadProducts: () => void;
}

export const UpdateProductModal: FC<Props> = ({ isOpen, onClose, currentProduct, onReloadProducts }) => {

    const onSubmitForm = async (values: any): Promise<void> => {
        try {

            await inventarioAPI.post(`producto/update?id=${currentProduct!.id}`, values, {
                headers: { "Content-Type": "application/json" }
            });
            onReloadProducts();
            onClose();
            
        } catch (error) {
            alert('error del servidor')
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Box sx={{
                background: 'white',
                padding: '20px',
                width: '500px',
                height: '500px',
                borderRadius: '10px'
            }} >
                <ProductForm 
                    onSubmit={onSubmitForm} 
                    defaultProductId={currentProduct?.id} 
                />
            </Box>
        </Modal>
    )
}
