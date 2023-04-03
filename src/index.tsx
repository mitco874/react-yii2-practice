import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { InventarioProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <InventarioProvider>
      <CssBaseline />
      <App />
    </InventarioProvider>
  </React.StrictMode>
);
