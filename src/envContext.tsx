import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { EnvVariables } from './types/envTypes';
import _ from 'lodash';

const EnvContext = createContext<EnvVariables | undefined>(undefined);

interface EnvProviderProps {
  children: ReactNode;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
  // Initialize state with a synchronous call to get the configuration from local storage or fallback values
  const initialEnv = () => {
    const tinadConfig = localStorage.getItem('tinad');
    if (tinadConfig) {
      return JSON.parse(tinadConfig).env || {};
    }
    // Fallback values if not yet set in local storage
    return {
      TINAD_API_BASE_URL: 'http://localhost:8080',
      TINAD_ENDUSER_ID: 'user-1',
      // in local dev usually served from the public folder (ie, no path prefix)
      TINAD_IMAGE_LOCATION: 'https://raw.githubusercontent.com/willkessler/this-is-not-a-drill-examples/main/public/',
      TINAD_API_KEY: 'OQONv9CK',  // must be set actively to use TINAD
      TINAD_DEFAULT_HOMEPAGE: 'About',
      TINAD_DASHBOARDPANEL_URL: 'http://localhost:5173',
      TINAD_DEMOPANEL_URL: 'http://localhost:5174',
    };
  };

  const [env, setEnv] = useState<EnvVariables>(initialEnv);

  useEffect(() => {
    const loadEnv = async () => {
      let tinadConfig = { 
        apiKey: '',
        apiBaseUrl: '',
        userId: '',
        env: {
          tinadDemoPanelUrl: '',
          tinadDashboardUrl: '',
          tinadImageLocation: '',
        },
      };
      const tinadConfigStr = localStorage.getItem('tinad');
      if (tinadConfigStr) {
        tinadConfig = JSON.parse(tinadConfigStr);
      }
      try {
        const config = await import('./envConfig');
        setEnv(config.envConfig);
        tinadConfig.env = {
          tinadDemoPanelUrl: config.TINAD_DEMOPANEL_URL,
          tinadDashboardUrl: config.TINAD_DASHBOARDPANEL_URL,
          tinadImageLocation: config.TINAD_IMAGE_LOCATION,
        }
        tinadConfig.apiKey = config.TINAD_API_KEY;
        tinadConfig.apiBaseUrl = config.TINAD_API_BASE_URL;
        tinadConfig.userId = config.TINAD_ENDUSER_ID;
        localStorage.setItem('tinad', JSON.stringify(tinadConfig));
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
