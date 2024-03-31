import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { EnvVariables } from './types/envTypes';

const EnvContext = createContext<EnvVariables | undefined>(undefined);

interface EnvProviderProps {
  children: ReactNode;
}

export const EnvProvider:React.FC<EnvProviderProps> = ({ children }) => {
  const [env, setEnv] = useState({
    TINAD_API_BASE_URL: 'http://localhost:8080',
    TINAD_ENDUSER_ID: 'user-1',
    TINAD_IMAGE_LOCATION: 'https://raw.githubusercontent.com/willkessler/this-is-not-a-drill-examples/main/public/', // in local dev usually served from the public folder which is no path at all.
    TINAD_API_KEY: 'OQONv9CK',  // must be set actively to use TINAD
  });

  useEffect(() => {
    const loadEnv = async () => {
      try {
        const config = await import('./envConfig');
        setEnv(config.envConfig);
        //console.log('config:', JSON.stringify(config.envConfig,null,2));
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

