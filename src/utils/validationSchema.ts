import * as yup from 'yup';

const isRequiredMessage = 'this field is required';
const numberRequiredMessage = 'numeric value is required'

export const createUserValidationSchema =  yup.object().shape({
        id: yup.number().required('you must enter a numeric id'),
        first_name: yup.string().required(isRequiredMessage).max(30,'only 30 characters are letted'),
        last_name: yup.string().required(isRequiredMessage).max(30,'only 30 characters are letted'),
        email: yup.string().required().email(),
        gender: yup.string().required('you must enter your gender'), 
        username: yup.string().required('you must enter a username'),
});

export const createProductValidationSchema = yup.object().shape({
        nombre: yup.string().required(isRequiredMessage).max(30,'only 30 characters are letted'),
        descripcion: yup.string(),
        precio: yup.number().required(numberRequiredMessage),
        marca_id: yup.number().required(numberRequiredMessage),
        seccion_id: yup.number().required(numberRequiredMessage), 
        stock: yup.number().required(numberRequiredMessage),
});