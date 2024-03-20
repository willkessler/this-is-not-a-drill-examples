import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './css/index.css';
import { MantineProvider } from '@mantine/core';
import { EnvProvider } from './envContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <EnvProvider>
        <App />
      </EnvProvider>
    </MantineProvider>
  </React.StrictMode>
)
