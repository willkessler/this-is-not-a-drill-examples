import { Anchor, Card, Group, Stack, Image , Title } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { useSDKData } from '@this-is-not-a-drill/react-core';
import {
    IconBook,
    IconRecycle,
    IconMovie,
} from '@tabler/icons-react';
import { usePageId } from './PageIdContext';
import { useEnv } from '../envContext';

const DemoControls = () => {

  const { TINAD_IMAGE_LOCATION } = useEnv();
  const { pageId } = usePageId();
  console.log('DemoControls: page id=', pageId);
  const { reset: resetAllViewsCore } = useSDKData(pageId);

  const handleResetAllViews = async () => {
    // Call the core to reset all views. this may mess up if the user is right in the middle of a chain of notifs.
    console.log('Executing resetAllViews.');
    try {
      await resetAllViewsCore();
      console.log('Views reset successfully');
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
          <Title order={5}><span style={{fontStyle:'italic'}}>This is Not a Drill!</span><br />Control Panel</Title>
      </Group>
      <Stack>
      <Group >
          <IconMovie style={{color:'#000', marginLeft:'15px'}} /><Anchor size="sm" style={{marginLeft:'-8px', color:'#000'}}>Watch Tutorial</Anchor>
      </Group>
      <Group>
        <IconRecycle style={{color:'#000', marginLeft:'15px'}} /><Anchor size="sm" onClick={handleResetAllViews} style={{marginLeft:'-8px', color:'#000'}}>Reset Views</Anchor>
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
