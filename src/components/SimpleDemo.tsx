import { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import { Anchor, Button, Card, Code, Group, Image, Radio, Text, Title } from '@mantine/core';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { useTinadSDK, useSDKData } from '@this-is-not-a-drill/react-core';
import { TinadComponent, TinadTemplateProps } from '@this-is-not-a-drill/react-ui';
import { envConfig } from '../envConfig';
import { Bounce, Slide } from 'react-toastify';


type DemoType = 'defaultInline' | 'customTemplateInline' | 'modal' | 'defaultToast' | 'customToast';

export const SimpleDemo = () => {

  const [ demoType, setDemoType ] = useState<DemoType>('defaultInline');
  const { reset } = useSDKData();

  // This function allows you to reset all views (just for this demo) because toasts auto dismiss.
  const handleResetAllViews = async () => {
    // Call the core to reset all views. this may mess up if the user is right in the middle of a chain of notifs.
    try {
      await reset();
      console.log('Views reset successfully');
      //window.location.reload();
    } catch (error) {
      console.log('Failed to reset views:', error);
    }
  };

  // Example of a Custom Template that a client can pass in for inline notifications.
  const CustomTemplate: React.FC<TinadTemplateProps> = ({ tinadContent, tinadType, dismiss }) => {
    // You can use the tinadTtype to determine whatever you want to render for each
    // TINAD notification type.
    return (
      <div style={{ padding: '15px', margin:'0px 35px 0px 5px', backgroundColor: '#abf', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', borderRadius:'10px' }}>
        <div style={{ marginBottom: '10px' }}>Contents: {tinadContent}</div>
        <div>Type: {tinadType}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {dismiss && <button onClick={dismiss} style={{ marginLeft: 'auto' }}>Dismiss</button>}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder className={classes.simpleCard}>
        <Group justify="flex-start">
          <Image
            src={`${envConfig.TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`}
            w={130}
          />
          <Title order={4}>This is Not A Drill! (TINAD) Simple Demos Page</Title>
        </Group>

        { demoType == 'defaultInline' && (
            <TinadComponent pageId="simple" mode="inline" environments="Development,Staging" />
        ) }

        { demoType == 'customTemplateInline' && (
            <TinadComponent pageId="simple" mode="inline" environments="Development,Staging" template={CustomTemplate} />
        ) }

        { demoType == 'modal' && (
            <TinadComponent pageId="simple" mode="modal" environments="Development,Staging" />
        ) }

        { demoType == 'defaultToast' && (
            <TinadComponent pageId="simple" mode="toast" environments="Development,Staging" toastProps={{ autoClose:false}} />
        ) }

        { demoType == 'customToast' && (
            <TinadComponent pageId="simple" mode="toast" environments="Development,Staging"
            toastProps={{ position:"bottom-left",
                      autoClose: false,
                      hideProgressBar: false,
                      rtl: false, 
                      theme: "dark", 
                      transition: Slide }}
            />
        ) }
          
        <Text size="sm" style={{marginTop:'10px'}}>
          Using this demo page, you can try out several types of TINAD notifications. Just create some notifications in the TINAD dashboard where you have set the <Code>pageId</Code> to: <Code>simple</Code>, and they will appear here within a few seconds.</Text>
          <br />
          <Text size="sm">Use the radio buttons (below) to select different notification styles. After a notification is dismissed, you can bring it (and all other notifications) back by clicking the Reset Views button.
        </Text>

        <Title style={{paddingTop:'15px'}} order={5}>Available Notification Styles:</Title>
        <Radio.Group style={{margin:'15px'}}
          name="DemoType"
          withAsterisk
          value={demoType}
          onChange={setDemoType}
          size="xs"
        >
          <Group>
            <Radio value='defaultInline' label="Default (Inline)" />
            <Radio value='customTemplateInline' label="Custom Template (Inline)" />
            <Radio value='modal' label="Modal" />
            <Radio value='defaultToast' label="Default Toast" />
            <Radio value='customToast' label="Custom Toast" />
          </Group>
        </Radio.Group>
        
        <Button variant="outline" size="xs" title="Reset all views on all notifications so you can re-test them." w={150} onClick={handleResetAllViews}>Reset views</Button>

          <Text size="xs" style={{fontStyle:'italic',marginTop:'15px'}}>This demo is part of a larger sample "bank application" demo, which you can access by using the left nav links.
            Be aware that in Stackblitz, the bank application navigation can be kind of slow, which is why we show you
            all the possible notification styles here as well.</Text>

      </Card>

    </>
  );

}

export default SimpleDemo;
