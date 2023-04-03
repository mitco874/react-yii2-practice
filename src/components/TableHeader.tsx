import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';
import { User } from '../interfaces';

interface Props {
  objectSample: User
}

export const TableHeader: FC<Props> = ({ objectSample }) => {

  const loadKeys = (): string[] => {
    let keysCell: string[] = [];

    for(let key in objectSample){
      keysCell.push(key);
    }

    return keysCell;
  }

  return (
    <TableHead>
    <TableRow>
      {
        loadKeys().map(
          (keyName: string)=> (
            <TableCell key={keyName}>  
              <Typography variant='subtitle1'>{keyName}</Typography> 
            </TableCell>)
          )
      }
      <TableCell>Option </TableCell>
    </TableRow>
  </TableHead>
  )
}
