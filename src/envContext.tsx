import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { EnvVariables } from './types/envTypes';

const EnvContext = createContext<EnvVariables | undefined>(undefined);

interface EnvProviderProps {
  children: ReactNode;
}

export const EnvProvider:React.FC<EnvProviderProps> = ({ children }) => {
  const [env, setEnv] = useState({
    TINAD_API_BASE_URL: 'http://localhost:8080',
    TINAD_ENDUSER_ID: 'user12345',
    TINAD_IMAGE_LOCATION: '', // in local dev usually served from the public folder which is no path at all.
    TINAD_API_KEY: '',  // must be set actively to use TINAD
  });

  useEffect(() => {
    const loadEnv = async () => {
      try {
        const config = await import('./envConfig');
        setEnv(config.envConfig);
      } catch (error) {
        console.error("Couldn't load the environment config", error);
      }
    };

    loadEnv();
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

