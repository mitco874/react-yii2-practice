import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { User } from "../interfaces";
import { validationSchema } from "../utils";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newUser: User) => void
}

interface FormData {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    username: string
}

const initialValues: FormData = {
    id:'',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    username: ''
}
 
export const RegisterUserModal:FC<Props> = ({isOpen, onClose, onSubmit}) => {

    const onSubmitForm = (values: FormData) => {
        onSubmit(values as User);
        onClose();
      }

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema.createUserValidationSchema,
        onSubmit:onSubmitForm,
      });

  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    sx={{display: 'flex', justifyContent: 'center'}}
    >
        <Box  sx={{
              background: 'white',
              padding:'20px',
              width: '500px',
              height: '500px',
              borderRadius: '10px'}} >

            <form onSubmit={formik.handleSubmit}
                style={{
                    display:'flex',
                    flexDirection: 'column'
                }}
            >
                <TextField  
                    label="Id" 
                    name="id" 
                    variant="filled" 
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    error={formik.touched.id && Boolean(formik.errors.id)}
                    helperText={formik.touched.id && formik.errors.id}
                />
                <TextField  
                    label="First name" 
                    name="first_name" 
                    variant="filled" 
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                />
                <TextField  
                    label="Last name"  
                    name='last_name' 
                    variant="filled" 
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                />
                <TextField  
                    label="Email" 
                    name='email' 
                    variant="filled"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField  
                    label="Gender" 
                    name='gender' 
                    select
                    variant="filled"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender} 
                >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </TextField>

                <TextField  
                    label="Username"  
                    name='username' 
                    variant="filled" 
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <Button type="submit"> Create </Button>
            </form>

        </Box>
   </Modal>
  )
}
