import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './css/index.css';
import { MantineProvider } from '@mantine/core';
import { TinadSDKProvider, useTinadSDK } from '@this-is-not-a-drill/react-core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <TinadSDKProvider environments="Development">
        <App />
      </TinadSDKProvider>
    </MantineProvider>
  </React.StrictMode>
)
