import { Marca, Seccion } from "./"

export interface Product {
    id: number,
    nombre?: string,
    descripcion?: string,
    fecha_creacion?: string,
    fecha_actualizacion?: string,
    precio?: string,
    stock?: number,
    marca: Marca
    seccion: Seccion
}



