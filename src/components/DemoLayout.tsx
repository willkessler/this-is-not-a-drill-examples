import { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { Anchor, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';
import { useEnv } from '../envContext';
import {
    IconBook,
    IconExchange,
    IconRecycle,
    IconMovie,
} from '@tabler/icons-react';
import ResizeablePanels from './ResizeablePanels';

const DemoLayout = () => {

  const { getTinadConfig, updateTinadConfig } = useTinadSDK();
  const { reset } = useSDKData();
  const { TINAD_IMAGE_LOCATION, TINAD_DEMOPANEL_URL, TINAD_DASHBOARDPANEL_URL } = useEnv();
  const [ currentUserId, setCurrentUserId ] = useState<string>(getTinadConfig().userId);
  
  const reloadDemoPanel = () => {
    const demoPanelIframe = document.getElementById('demoPanel');
    if (demoPanelIframe && demoPanelIframe.contentWindow) {
      demoPanelIframe.contentWindow.postMessage('RELOAD_IFRAME', window.location.origin);
    }
  };
  
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
    reloadDemoPanel(); // tell demo app's iframe to reload itself
  };

  const handleResetAllViews = async () => {
    // Call the core to reset all views. this may mess up if the user is right in the middle of a chain of notifs.
    console.log('Executing resetAllViews.');
    try {
      await reset();
      console.log('Views reset successfully');
      reloadDemoPanel()
    } catch (error) {
      console.log('Failed to reset views:', error);
    }
  };

  const topPanelContent = (
    <>
        <Group>
          <Group justify="flex-start" align="center" gap="xs" style={{paddingRight:'15px'}}>
            <a href="https://this-is-not-a-drill.com" target="_blank">
              <Image
                title="This Is Not A Drill! Demo Site"
                h={30}
                style={{paddingLeft:'10px'}}
                src={`${TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`} />
            </a>
            <Title title="Use the controls at the right to manage the demo panel in the lower left" order={5}>TINAD Demo Control Panel </Title>
          </Group>
          <Group>
            <IconExchange style={{color:'#FFF', marginLeft:'15px'}} />
            <Anchor 
              title="Click to experiment with up to 3 simulated end users."
              onClick={() => { changeUserId(getTinadConfig().userId) }} 
              underline="never" 
              size="sm">
              Rotate Signed-In User {currentUserId}
            </Anchor>
          </Group>

          <Group>
            <IconRecycle />
            <Anchor 
              title="Reset all user histories so you can simulate starting from scratch to review previous notifications."
              size="sm" 
              onClick={handleResetAllViews} >
              Reset Views (all users)
            </Anchor>
          </Group>

          <Group >
            <IconMovie />
            <Anchor
              title="Play a movie explaining TINAD and this demo"
              size="sm">
              Watch Tutorial
            </Anchor>
          </Group>

          <Group>
            <IconBook />
            <Anchor
              target="_blank"
              href="https://tellyourusers-help-pages.super.site"
              title="Jump to the documentation"
              size="sm">
              View Docs
            </Anchor>
          </Group>
        </Group>
    </>
  );

  return (
    <ResizeablePanels 
      topPanel =  {{ content: topPanelContent, minHeight:'500px', maxHeight:'800px' }}
      leftPanel = {{ iframeId: 'demoPanel',      url: TINAD_DEMOPANEL_URL, minWidth:'500px', maxWidth:'800px' }}
      rightPanel = {{ iframeId: 'dashboardPanel', url: TINAD_DASHBOARDPANEL_URL, minWidth:'100px' }}
    />
  );
};

export default DemoLayout;
