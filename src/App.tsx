import { Box } from '@mui/material';
import { ProductsTable, UsersTable } from './components';

const App = () => {

  return (
    <Box display='flex' flexDirection='column' alignItems='center' >
      <UsersTable/>
      <ProductsTable />
    </Box>
  );
}

export default App;
