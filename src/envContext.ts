import React, { createContext, useState, useEffect, useContext } from 'react';

const EnvContext = createContext();

export const EnvProvider = ({ children }) => {
  const [env, setEnv] = useState({
    VITE_API_BASE_URL: 'http://localhost:8080';
    VITE_TINAD_ENDUSER_ID: 'user12345';
    VITE_TINAD_IMAGE_LOCATION: ''; // in local dev usually served from the public folder which is no path at all.
    VITE_TINAD_API_KEY: '';  // must be set actively to use TINAD
  });

  useEffect(() => {
    const initEnv = async () => {
      // Your initialization logic here
      try {
        if (typeof import.meta.env !== 'undefined') {
          // In environments where we can run VITE
          setEnv({ VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL });
          setEnv({ VITE_TINAD_ENDUSER_ID: import.meta.env.VITE_TINAD_ENDUSER_ID });
          setEnv({ VITE_TINAD_IMAGE_LOCATION: import.meta.env.VITE_TINAD_IMAGE_LOCATION });
          setEnv({ VITE_TINAD_API_KEY: import.meta.env.VITE_TINAD_API_KEY });
        } else {
          // In stackblitz environment where we don't have import.meta.env from VITE
          const importedEnv = await import('./env.ts');
          setEnv({ VITE_API_BASE_URL: importedEnv.VITE_API_BASE_URL });
          setEnv({ VITE_TINAD_ENDUSER_ID: importedEnv.VITE_TINAD_ENDUSER_ID });
          setEnv({ VITE_TINAD_IMAGE_LOCATION: importedEnv.VITE_TINAD_IMAGE_LOCATION });
          setEnv({ VITE_TINAD_API_KEY: importedEnv.VITE_TINAD_API_KEY });
        }
      } catch (error) {
        console.error('Error loading environment variables:', error);
      }
    };

    initEnv();
  }, []);

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => useContext(EnvContext);
