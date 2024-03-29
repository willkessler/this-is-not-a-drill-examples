import React, { useEffect } from 'react';
import '@mantine/core/styles.css';
import RouterComponent from './Router';
import { useEnv } from '../envContext';
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';

const App = () => {

  const { TINAD_ENDUSER_ID, TINAD_API_KEY, TINAD_API_BASE_URL } = useEnv();

  const { getConfig } = useSDKData();
  const { updateTinadConfig } = useTinadSDK();

  const getQueryParam = (param:string) => {
    const search = window.location.search.substring(1); // Remove '?' prefix
    const params = search.split('&');

    for (let i = 0; i < params.length; i++) {
      const pair = params[i].split('=');
      if (decodeURIComponent(pair[0]) === param) {
        return decodeURIComponent(pair[1]);
      }
    }

    return null;
  };

//  const apiKey = getQueryParam('apiKey');
//  console.log('apiKey from URL:', apiKey);

  useEffect(() => {
    console.log(`App.tsx: TINAD_API_KEY = ${TINAD_API_KEY}`);
    const previousTinadConfig = getConfig();
    console.log(`App.tsx: previousTinadConfig: ${JSON.stringify(previousTinadConfig, null, 2)}`);
    const tinadConfig = { 
      // This can hold whatever end user id you want to use to distinguish individual users. 
      userId: ((previousTinadConfig?.userId && previousTinadConfig.userId.length > 0)  ? previousTinadConfig.userId : TINAD_ENDUSER_ID),
      // Put your API key in the environment file .env so it can be picked up here.
      apiKey: TINAD_API_KEY,
      // For production, do not pass this in and TINAD will default to the production API endpoint.
      apiBaseUrl: TINAD_API_BASE_URL, 
    };
    console.log(`App.tsx has a new tinad config=${JSON.stringify(tinadConfig, null, 2)}`);
    updateTinadConfig(tinadConfig);

  }, []);

  return (
    <>
      <RouterComponent />
    </>
  );
}

export default App;
