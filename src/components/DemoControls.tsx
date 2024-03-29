import { useEffect, useState } from 'react';
import { Anchor, Card, Group, Stack, Image , Title } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';
import {
    IconBook,
    IconExchange,
    IconRecycle,
    IconMovie,
} from '@tabler/icons-react';
import { useEnv } from '../envContext';

const DemoControls = () => {

  const { updateTinadConfig } = useTinadSDK();
  const { getConfig, reset, invalidate } = useSDKData();
  const { TINAD_IMAGE_LOCATION } = useEnv();

/*
  const getLocalStorage = (key:string) => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue;
  };        

  const setLocalStorage = (key:string, value:string) => {
    localStorage.setItem(key,value);
  };        
  */
  
  const changeUserId = (lastUserId: string) => {
    console.log(`changeUserId, lastUserId: ${lastUserId}`);
    const [ userName, userNumber ] = lastUserId.split('-');
    let newValue = (parseInt(userNumber) + 1);
    if (newValue > 3) {
      newValue = 1;
    }
    const newConfig = { userId: `user-${newValue}` };
    console.log(`new sdkConfig = ${JSON.stringify(newConfig,null,2)}`);
    updateTinadConfig(newConfig);

    invalidate(); // tell SDK to make react-query refetch data since the demo user id was changed

  };
  

  const handleResetAllViews = async () => {
    // Call the core to reset all views. this may mess up if the user is right in the middle of a chain of notifs.
    console.log('Executing resetAllViews.');
    try {
      await reset();
      console.log('Views reset successfully');
      window.location.reload();
    } catch (error) {
      console.log('Failed to reset views:', error);
    }
  };
  
  return (
    <>
      <Card shadow="sm" radius="md" className={classes.demoControls}>
        <Group justify="flex-start" align="center" gap="xs">
          <a href="https://this-is-not-a-drill.com" target="_blank">
            <Image
              h={80}
              src={`${TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`} />
          </a>
          <Title order={5}><span style={{fontStyle:'italic'}}>This is Not a Drill!</span>&nbsp;&nbsp;Control Panel</Title>
        </Group>
        <Stack>
          <Group>
            <IconExchange style={{color:'#000', marginLeft:'15px'}} />
            <Anchor onClick={() => { changeUserId(getConfig().userId) }} underline="never" size="sm" style={{marginLeft:'-8px', color:'#000'}}>Rotate Signed-In User ({getConfig().userId})</Anchor>
          </Group>

          <Group>
            <IconRecycle style={{color:'#000', marginLeft:'15px'}} /><Anchor size="sm" onClick={handleResetAllViews} style={{marginLeft:'-8px', color:'#000'}}>Reset Views</Anchor>
          </Group>

          <Group >
            <IconMovie style={{color:'#000', marginLeft:'15px'}} /><Anchor size="sm" style={{marginLeft:'-8px', color:'#000'}}>Watch Tutorial</Anchor>
          </Group>

          <Group>
            <IconBook style={{color:'#000', marginLeft:'15px'}} /><Anchor size="sm" style={{marginLeft:'-8px', color:'#000'}}>Help/Docs</Anchor>
          </Group>
        </Stack>
      </Card>
    </>
  );
}

export default DemoControls;
