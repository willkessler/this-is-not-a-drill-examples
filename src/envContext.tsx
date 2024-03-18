import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { EnvVariables } from './types/envTypes';

const EnvContext = createContext<EnvVariables | undefined>(undefined);

interface EnvProviderProps {
  children: ReactNode;
}

export const EnvProvider:React.FC<EnvProviderProps> = ({ children }) => {
  const [env, setEnv] = useState({
    VITE_TINAD_API_BASE_URL: 'http://localhost:8080',
    VITE_TINAD_ENDUSER_ID: 'user12345',
    VITE_TINAD_IMAGE_LOCATION: '', // in local dev usually served from the public folder which is no path at all.
    VITE_TINAD_API_KEY: '',  // must be set actively to use TINAD
  });

  useEffect(() => {
    const initEnv = async () => {
      try {
        let newEnv = {};
        if (typeof import.meta.env !== 'undefined') {
          // Assuming import.meta.env is available and contains the values directly
          newEnv = {
            VITE_TINAD_API_BASE_URL: import.meta.env.VITE_TINAD_API_BASE_URL,
            VITE_TINAD_ENDUSER_ID: import.meta.env.VITE_TINAD_ENDUSER_ID,
            VITE_TINAD_IMAGE_LOCATION: import.meta.env.VITE_TINAD_IMAGE_LOCATION,
            VITE_TINAD_API_KEY: import.meta.env.VITE_TINAD_API_KEY,
          };
        } else {
          // Load from env.ts if import.meta.env is not available
          const importedEnv = await import('./env.ts') as EnvVariables;
          newEnv = {
            VITE_TINAD_API_BASE_URL: importedEnv.VITE_TINAD_API_BASE_URL,
            VITE_TINAD_ENDUSER_ID: importedEnv.VITE_TINAD_ENDUSER_ID,
            VITE_TINAD_IMAGE_LOCATION: importedEnv.VITE_TINAD_IMAGE_LOCATION,
            VITE_TINAD_API_KEY: importedEnv.VITE_TINAD_API_KEY,
          };
        }
        setEnv(currentEnv => ({ ...currentEnv, ...newEnv }));
      } catch (error) {
        console.error('Error loading environment variables:', error);
      }
    };
    
    initEnv();
  }, []);

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;

};

export const useEnv = (): EnvVariables => {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
};

