import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { inventarioAPI } from "../api";
import { Marca, Seccion } from "../interfaces";
import { validationSchema } from "../utils";

interface Props {
    defaultProductId?: number
    onSubmit: (values: any) => Promise<void>;
}

interface FormData {
    nombre: string;
    descripcion: string,
    precio: string;
    marca_id: string;
    seccion_id: string;
    stock: string;
}

const initialValues: FormData = {
    nombre: '',
    descripcion: '',
    precio: '',
    marca_id: '',
    seccion_id: '',
    stock: ''
}

export const ProductForm: FC<Props> = ({ defaultProductId, onSubmit }) => {

    const [brands, setBrands] = useState<Marca[] | []>([]);
    const [sections, setSections] = useState<Seccion[] | []>([]);

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema.createProductValidationSchema,
        onSubmit
    });

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

    useEffect(() => {
        const fetchInitialValues = async () => {
            if (defaultProductId) {
                try {
                    const { data } = await inventarioAPI.get(`producto/${defaultProductId}`);
                    formik.setValues(data.producto);
                } catch (error) {

                }
            }
        }

        fetchInitialValues();
    }, [defaultProductId])


    return (
        <form onSubmit={formik.handleSubmit} noValidate
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <TextField
                label="Name"
                name="nombre"
                variant="filled"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
            />
            <TextField
                label="Description"
                name='descripcion'
                variant="filled"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
            />
            <TextField
                label="Price"
                name='precio'
                variant="filled"
                type="number"
                value={formik.values.precio}
                onChange={formik.handleChange}
                error={formik.touched.precio && Boolean(formik.errors.precio)}
                helperText={formik.touched.precio && formik.errors.precio}
            />

            <TextField
                label="Brand id"
                name='marca_id'
                variant="filled"
                type="number"
                select
                value={formik.values.marca_id}
                onChange={formik.handleChange}
                error={formik.touched.marca_id && Boolean(formik.errors.marca_id)}
                helperText={formik.touched.marca_id && formik.errors.marca_id}
            >
                {
                    brands.map(
                        (brand) => (<MenuItem key={brand.id} value={brand.id}>{brand.nombre}</MenuItem>)
                    )
                }
            </TextField>


            <TextField
                label="Section id"
                name='seccion_id'
                variant="filled"
                type="number"
                select
                value={formik.values.seccion_id}
                onChange={formik.handleChange}
                error={formik.touched.seccion_id && Boolean(formik.errors.seccion_id)}
                helperText={formik.touched.seccion_id && formik.errors.seccion_id}
            >
                {
                    sections.map((section) => (
                        <MenuItem key={section.id} value={section.id}>{section.codigo}</MenuItem>
                    ))
                }

            </TextField>


            <TextField
                label="Stock"
                name='stock'
                variant="filled"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
            />
            <Button type="submit"> Create </Button>
        </form>
    )
}
