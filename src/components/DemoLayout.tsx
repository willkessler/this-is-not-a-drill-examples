import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { Anchor, Group, Image, Title } from '@mantine/core';
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';
import classes from '../css/ResizablePanels.module.css';
import { envConfig } from '../envConfig';
import {
    IconExchange,
    IconRecycle,
} from '@tabler/icons-react';
import ResizeablePanels from './ResizeablePanels';

const DemoLayout = () => {

  const { getTinadConfig, updateTinadConfig } = useTinadSDK();
  const { reset } = useSDKData();
  const [ currentUserId, setCurrentUserId ] = useState<string>(getTinadConfig().userId);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  useEffect(() => { 
    const mediaQuery = window.matchMedia('(max-width: 768px)'); 
    setIsSmallScreen(mediaQuery.matches); 
    function handleResize() { 
      setIsSmallScreen(mediaQuery.matches);
    }
    // Listen for changes
    mediaQuery.addListener(handleResize); 

    // Cleanup the listener on component unmount 
    return () => mediaQuery.removeListener(handleResize); 
  }, []);

  const reloadDemoPanel = () => {
    const demoPanelIframe = document.getElementById('demoPanel') as HTMLIFrameElement;
    if (demoPanelIframe && demoPanelIframe.contentWindow) {
      demoPanelIframe.contentWindow.postMessage('RELOAD_IFRAME', window.location.origin);
    }
  };
  
  const changeUserId = (lastUserId: string) => {
    console.log(`changeUserId, lastUserId: ${lastUserId}`);
    const userParts = lastUserId.split('-');
    let newValue = (parseInt(userParts[1]) + 1);
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
                src={`${envConfig.TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`} />
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
              Change Signed-In User (current: {currentUserId})
            </Anchor>
          </Group>

          <Group>
            <IconRecycle />
            <Anchor 
              title="Reset all user histories so you can simulate starting from scratch to review previous notifications."
              size="sm" 
              onClick={handleResetAllViews} >
              Reset All User Views
            </Anchor>
          </Group>
{/*
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
*/}
        </Group>

    </>
  );

  console.log(envConfig.TINAD_DASHBOARDPANEL_URL);

  if (isSmallScreen) {
    return (
      <div className={classes.container}>
        <div className={classes.panelsContainer}>
          <iframe
            id="demoPanel"
            src={envConfig.TINAD_DEMOPANEL_URL}
            style={{
              minWidth:400,
              maxWidth:800,
            }}
            className={classes.upperPanel}
            title="Left Panel" 
          />
          <iframe
            id="dashboardPanel"
            src={envConfig.TINAD_DASHBOARDPANEL_URL}
            style={{
              minWidth: 400,
            }}
            className={classes.lowerPanel}
            title="Right Panel" />
        </div>
      </div>
    );
  } else {
    return (
      <ResizeablePanels 
      topPanel =  {{  content: topPanelContent }}
      leftPanel = {{  iframeId: 'demoPanel',      url: envConfig.TINAD_DEMOPANEL_URL, minWidth: 400, maxWidth:800 }}
      rightPanel = {{ iframeId: 'dashboardPanel', url: envConfig.TINAD_DASHBOARDPANEL_URL, minWidth:400 }}
      />
    )
  }
};

export default DemoLayout;
