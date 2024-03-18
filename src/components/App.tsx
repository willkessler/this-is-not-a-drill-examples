import '@mantine/core/styles.css';
import RouterComponent from './Router';
import { initTinadSDK } from '@this-is-not-a-drill/react-core';
import { useEnv } from '../envContext';

const App = () => {

  const { TINAD_API_KEY, TINAD_API_BASE_URL, TINAD_ENDUSER_ID } = useEnv();

  const tinadConfig = { 
    // This can hold whatever end user id you want to use to distinguish individual users. 
    userId: TINAD_ENDUSER_ID,
    // Put your API key in the environment file .env so it can be picked up here.
    apiKey: TINAD_API_KEY,
    // For production, do not pass this in and TINAD will default to the production API endpoint.
    apiBaseUrl: TINAD_API_BASE_URL, 
  };
  initTinadSDK(tinadConfig);

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

  const apiKey = getQueryParam('apiKey');
  console.log('apiKey from URL:', apiKey);
  

  return (
    <>
      <RouterComponent />
    </>
  );
}

export default App;
