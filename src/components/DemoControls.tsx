import { useEffect, useState } from 'react';
import { Anchor, Card, Group, Stack, Image , Title } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { initTinadSDK, getTinadSDKConfig, useSDKData } from '@this-is-not-a-drill/react-core';
import {
    IconBook,
    IconExchange,
    IconRecycle,
    IconMovie,
} from '@tabler/icons-react';
import { usePageId } from './PageIdContext';
import { useEnv } from '../envContext';

const DemoControls = () => {

  const { TINAD_IMAGE_LOCATION } = useEnv();
  const { pageId } = usePageId();
  const { reset: resetAllViewsCore } = useSDKData(pageId);
  const [ currentUserId, setCurrentUserId ] = useState<number | null>(null);

  const getLocalStorage = (key:string) => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue;
  };        

  const setLocalStorage = (key:string, value:string) => {
    localStorage.setItem(key,value);
  };        

  const changeUserId = () => {
    const lastUserId = getLocalStorage('tinadDemoUserId');
    //console.log('changeUserId:', lastUserId);
    let newValue;
    if (lastUserId == null) {
      setCurrentUserId(1);
      newValue = 1;
    } else {
      //console.log('setting demouserId in storage');
      setCurrentUserId(parseInt(lastUserId) + 1);
      newValue = parseInt(lastUserId) + 1;
      if (currentUserId > 3) {
        setCurrentUserId(1);
        newValue = 1;
      }
    }
    setLocalStorage('tinadDemoUserId', newValue + '');

    // Reinitialize TINAD sdk with a different user id    
    const currentSDKConfig = getTinadSDKConfig();
    currentSDKConfig.userId = `user-${newValue}`;
    initTinadSDK(currentSDKConfig);

  };
  
  const handleResetAllViews = async () => {
    // Call the core to reset all views. this may mess up if the user is right in the middle of a chain of notifs.
    console.log('Executing resetAllViews.');
    try {
      await resetAllViewsCore();
      console.log('Views reset successfully');
      window.location.reload();
    } catch (error) {
      console.log('Failed to reset views:', error);
    }
  };
  
  useEffect(() => {
    changeUserId(); // set things off to start
  }, []);
  
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
            <Anchor onClick={changeUserId} underline="never" size="sm" style={{marginLeft:'-8px', color:'#000'}}>Rotate Signed-In User (user-{currentUserId})</Anchor>
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
