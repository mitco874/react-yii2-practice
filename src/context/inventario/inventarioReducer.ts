import { InventarioState } from '../';
import { Marca } from '../../interfaces';

type InventarioAction=
| { type: '[Inventario] - loadBrands', payload: Marca[]}

export const InventarioReducer = ( state: InventarioState , action: InventarioAction ): InventarioState => {

     switch ( action.type ) {
          case '[Inventario] - loadBrands':{
                return { 
                    ...state, 
                    brands: action.payload
                };
            }

          default:
               return state;
     }

}