import '@mantine/core/styles.css';
import RouterComponent from './Router';
import { initTinadSDK } from '@this-is-not-a-drill/react-core';

const App = () => {

    const tinadConfig = { 
        // This can hold whatever end user id you want to use to distinguish individual users. 
        userId: import.meta.env.VITE_TINAD_ENDUSER_ID,
        // Put your API key in the environment file .env so it can be picked up here.
        apiKey: import.meta.env.VITE_TINAD_API_KEY,
        // For production, do not pass this in and TINAD will default to the production API endpoint.
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL, 
    };
    initTinadSDK(tinadConfig);

    return (
        <>
            <RouterComponent />
        </>
    );
}

export default App;
