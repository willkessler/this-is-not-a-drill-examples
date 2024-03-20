import '@mantine/core/styles.css';
import { useState, useEffect } from 'react';
import { Anchor, Card,  Image, Group, Text, TextInput, Title, Button } from '@mantine/core';
import classes from '../css/MainLayout.module.css';
import { initTinadSDK, getTinadSDKConfig } from '@this-is-not-a-drill/react-core';
import {
  IconThumbUp,
  IconMenu2
} from '@tabler/icons-react';
import { useEnv } from '../envContext';

const goHome = () => {
  window.location.assign('/home');
}

export const About = () => {
  const [ tempApiKey, setTempApiKey ] = useState<string>('');
  const [ apiKeyIsOk, setApiKeyIsOk ] = useState<boolean>(false);
  const { TINAD_API_BASE_URL, TINAD_ENDUSER_ID, TINAD_IMAGE_LOCATION } = useEnv();

  useEffect(() => {
    const tinadConfig = getTinadSDKConfig();
    //console.log(`useEffect got tinadConfig: ${JSON.stringify(tinadConfig, null, 2)}`);
    const initialApiKey = tinadConfig?.apiKey || '';
    setTempApiKey(initialApiKey);
    setApiKeyIsOk(initialApiKey.length === 8);
  }, []);
  
  const setApiKey = (newKey: string) => {
    setTempApiKey(newKey);
    const isValidKey = newKey.length === 8;
    // really need a proper api key validator endpoint we can call
    setApiKeyIsOk(isValidKey);

    if (isValidKey) {
      const tinadConfig = { 
        // This can hold whatever end user id you want to use to distinguish individual users. 
        userId: TINAD_ENDUSER_ID,
        // Put your API key in the environment file .env so it can be picked up here.
        apiKey: newKey,
        // For production, do not pass this in and TINAD will default to the production API endpoint.
        apiBaseUrl: TINAD_API_BASE_URL, 
      };
      console.log(`Reinitializing TINAD SDK with:${JSON.stringify(tinadConfig, null, 2)}`);
      //console.log(newKey);
      initTinadSDK(tinadConfig);
    }
  };

  return (
    <>

      <Card shadow="sm" padding="md" radius="md" withBorder className={classes.aboutCard}>
        <Group justify="flex-start">
          <Image
            src={`${TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`}
            w={130}
          />
          <Title order={3}>This is Not A Drill! Playground</Title>
        </Group>

        <Text size="lg">
          The playground contains a simulation of a regional bank's responsive web application.  
          Each page demonstrates a different notification type. You can add
          notifications in the dashboard and see them show up here, or play with the code.
        </Text>

        <Text size="lg" style={{marginTop:'20px'}} >
          To start with, navigate with the hamburger icon (<IconMenu2  style={{paddingTop:'10px'}} />)  in the upper left corner (if visible), or, just click a link below.
        </Text> 

        <ul> 
          <li><Anchor href="/home">Financial Overview (Home) Page</Anchor></li>
          <li><Anchor href="/pay">Pay Bills Page</Anchor></li> 
          <li><Anchor href="/transfer">Transfer Funds Page</Anchor></li> 
        </ul>

        
        <Button onClick={goHome} color="blue" fullWidth mt="md" radius="md">
          Sounds Great, Let's go!
        </Button>
      </Card>
    </>
  );
}

export default About;
