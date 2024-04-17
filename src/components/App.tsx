import { useEffect } from 'react';
import '@mantine/core/styles.css';
import RouterComponent from './Router';
import { envConfig } from '../envConfig';
import { useTinadSDK } from '@this-is-not-a-drill/react-core';

const App = () => {

  const { getTinadConfig, updateTinadConfig } = useTinadSDK();

  useEffect(() => {

    console.log(`App useEffect ${new Date().getTime()}`);
    // listen for postMessage "reload" events sent by another demo panel.
    // These are sent when the demo user decides to change end users or reset views.
    const handlePostMessage = (event:MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return; // ignore unknown origin messages
      }

      if (event.data == 'RELOAD_IFRAME') {
        window.location.reload();
      }
    }


    //console.log(`App.tsx: TINAD_API_KEY = ${TINAD_API_KEY}`);
    const previousTinadConfig = getTinadConfig();

    console.log(`App.tsx: previousTinadConfig: ${JSON.stringify(previousTinadConfig, null, 2)}`);
    const tinadConfig = { 
      // This can hold whatever end user id you want to use to distinguish individual users. 
      userId: ((previousTinadConfig?.userId && previousTinadConfig.userId.length > 0)  ? previousTinadConfig.userId : envConfig.TINAD_ENDUSER_ID),
      // Put your API key in the environment file .env so it can be picked up here.
      apiKey: envConfig.TINAD_API_KEY,
      // For production, do not pass this in and TINAD will default to the production API endpoint.
      apiBaseUrl: envConfig.TINAD_API_BASE_URL,
    };
    //console.log(`App.tsx has a new tinad config=${JSON.stringify(tinadConfig, null, 2)}`);
    updateTinadConfig(tinadConfig);
    console.log(`newTinadConfig = ${JSON.stringify(getTinadConfig())}, ${envConfig.TINAD_API_KEY}, ${envConfig.TINAD_API_BASE_URL}`);

    window.addEventListener('message', handlePostMessage);
    return () => {
      window.removeEventListener('message', handlePostMessage); // remove postMessage listener on component unmount
    }

  }, [getTinadConfig, updateTinadConfig]);

  return (
    <>
      <RouterComponent />
    </>
  );
}

export default App;
