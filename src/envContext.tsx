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
    // in local dev usually served from the public folder (ie, no path prefix)
    TINAD_IMAGE_LOCATION: 'https://raw.githubusercontent.com/willkessler/this-is-not-a-drill-examples/main/public/',
    TINAD_API_KEY: 'OQONv9CK',  // must be set actively to use TINAD
    TINAD_DEFAULT_HOMEPAGE: 'About',
    TINAD_DASHBOARDPANEL_URL: 'http://localhost:5173',
    TINAD_DEMOPANEL_URL: 'http://localhost:5174',
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

