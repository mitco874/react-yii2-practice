import { Button, MenuItem, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { inventarioAPI } from "../api";
import { Marca, Product, Seccion } from "../interfaces";
import { fieldValidations } from "../utils";

interface Props {
    defaultProduct?: any
    onSubmit: (values: any) => Promise<void>;
    submitButtonText?: string;
}

interface FormData {
    nombre: string;
    descripcion: string,
    precio: string;
    marca_id: string;
    seccion_id: string;
    stock: string;
}

export const ProductForm: FC<Props> = ({ defaultProduct, onSubmit, submitButtonText = 'Submit' }) => {

    const [initialValues, setInitialValues] = useState ( defaultProduct? defaultProduct : {
        nombre: '',
        descripcion: '',
        precio: '',
        marca_id: '',
        seccion_id: '',
        stock: ''
    })

    const [brands, setBrands] = useState<Marca[] | []>([]);
    const [sections, setSections] = useState<Seccion[] | []>([]);

    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<FormData>({defaultValues:initialValues});

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await inventarioAPI.get('marca');
                setBrands(data.marcas);
            } catch (error) {

            }
        }

        const fetchSections = async () => {
            try {
                const { data } = await inventarioAPI.get('seccion');
                setSections(data.secciones);
            } catch (error) {

            }
        }
        fetchBrands();
        fetchSections();
    }, [])


    // useEffect(() => {
    //     const fetchInitialValues = async () => {
    //         if (defaultProductId) {
                
    //             try {
                    
    //                 const { data } = await inventarioAPI.get(`producto/${defaultProductId}`);
    //                 console.log(data.producto)

    //                 //setInitialValues({...initialValues, nombre: data.producto.nombre  })


    //                 reset(data.producto)
    //             } catch (error) {

    //             }
    //         }
    //     }
    //     fetchInitialValues();
    // }, [defaultProductId])


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >s

            <TextField
                label="Name"
                variant="filled"
                sx={{marginBottom:'20px'}}
                // value={getValues("nombre")}
                {...register("nombre",
                {
                    required: "This field is required",
                    minLength: { value: 3, message: 'min 3 characters' },
                    maxLength: { value: 40, message: 'max 40 characters' }
                }
                )}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
            />

            <TextField
                label="Description"
                variant="filled"
                sx={{marginBottom:'20px'}}
                // value={getValues("descripcion")}
                {...register("descripcion")}
            />

            <TextField
                label="Price"
                variant="filled"
                type="number"
                sx={{marginBottom:'20px'}}
                {...register("precio",
                    {
                        valueAsNumber: true,
                        required: "Numeric value is required",
                    }
                )}
                error={!!errors.precio}
                helperText={errors.precio?.message}
            />

            <TextField
                label="Brand"
                variant="filled"
                type="number"
                sx={{marginBottom:'20px'}}
                defaultValue={getValues("marca_id")}
                select
                {...register("marca_id",                     
                    {
                        required: "Select a brand"
                    }
                )}
                error={!!errors.marca_id}
                helperText={errors.marca_id?.message}
            >
                {
                    brands.map(
                        (brand) => (<MenuItem key={brand.id} value={brand.id}>{brand.nombre}</MenuItem>)
                    )
                }
            </TextField>


            <TextField
                label="Section"
                variant="filled"
                type="number"
                sx={{marginBottom:'20px'}}
                defaultValue={getValues("seccion_id")}
                select
                {...register("seccion_id",                     
                {
                    required: "Select a section"
                }
                )}
                error={!!errors.seccion_id}
                helperText={errors.seccion_id?.message}
            >
                {
                    sections.map((section) => (
                        <MenuItem key={section.id} value={section.id}>{section.codigo}</MenuItem>
                    ))
                }

            </TextField>


            <TextField
                label="Stock"
                variant="filled"
                type="number"
                // value={getValues("stock")}
                sx={{marginBottom:'20px'}}
                {...register("stock",
                {
                    valueAsNumber: true,
                    required: "Numeric value is required",
                    validate: fieldValidations.isInteger
                }
                )}
                error={!!errors.stock}
                helperText={errors.stock?.message}
            />
            <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                    marginTop: '40px',
                    display: 'flex',
                    alignSelf: 'center',
                    width: '200px',
                     
                }}
            > {submitButtonText} </Button>
        </form>
    )
}
