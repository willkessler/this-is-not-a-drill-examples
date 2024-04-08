import { useEffect, useState } from 'react';
import { Anchor, Card, Group, Stack, Image , Title } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';
import { envConfig } from '../envConfig';
import {
    IconBook,
    IconExchange,
    IconRecycle,
    IconMovie,
} from '@tabler/icons-react';

const DemoControls = () => {

  const { getTinadConfig, updateTinadConfig } = useTinadSDK();
  const { reset, invalidate } = useSDKData();
  const [ currentUserId, setCurrentUserId ] = useState<string>(getTinadConfig().userId);
  
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
    setCurrentUserId(newConfig.userId);
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
              src={`${envConfig.TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`} />
          </a>
          <Title order={5}><span style={{fontStyle:'italic'}}>This is Not a Drill!</span>&nbsp;&nbsp;Control Panel</Title>
        </Group>
        <Stack>
          <Group>
            <IconExchange style={{color:'#000', marginLeft:'15px'}} />
            <Anchor onClick={() => { changeUserId(getTinadConfig().userId) }} underline="never" size="sm" style={{marginLeft:'-8px', color:'#000'}}>Rotate Signed-In User ({getTinadConfig().userId})</Anchor>
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
