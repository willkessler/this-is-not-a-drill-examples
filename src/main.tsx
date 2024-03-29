import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './css/index.css';
import { MantineProvider } from '@mantine/core';
import { EnvProvider } from './envContext';
import { TinadSDKProvider } from '@this-is-not-a-drill/react-core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <EnvProvider>
        <TinadSDKProvider>
          <App />
        </TinadSDKProvider>
      </EnvProvider>
    </MantineProvider>
  </React.StrictMode>
)
