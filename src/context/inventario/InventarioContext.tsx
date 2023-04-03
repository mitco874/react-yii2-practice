
import { createContext } from 'react';
import { Marca } from '../../interfaces';

interface ContextProps{
     brands: Marca[];
     fetchBrands: () => Promise<void>;
}

export const InventarioContext =createContext({} as ContextProps );