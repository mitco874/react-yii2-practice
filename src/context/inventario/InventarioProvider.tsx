import { FC, useEffect, useReducer } from 'react';
import { InventarioContext, InventarioReducer } from '../';
import { inventarioAPI } from '../../api';
import { Marca } from '../../interfaces';

export interface InventarioState {
    brands: Marca[];
}

const INVENTARIO_INITIAL_STATE: InventarioState={
    brands: []
}

interface Props{ children: React.ReactNode }

export const InventarioProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( InventarioReducer, INVENTARIO_INITIAL_STATE );

    const loadBrands = async(brands: Marca[]) => {
        dispatch({ type: "[Inventario] - loadBrands", payload: brands });
    }

    const fetchBrands = async () => {
        try {
            const { data } = await inventarioAPI.get('marca');
            loadBrands(data.marcas);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchBrands();
    }, [])
    
    return (
        <InventarioContext.Provider value={{...state, fetchBrands}} >
            {children}
        </InventarioContext.Provider>
    )
}