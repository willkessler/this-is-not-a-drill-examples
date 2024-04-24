import { useState } from 'react';
import '@mantine/core/styles.css';
import { Button, Card, Group, Image, Tabs, Text, Title } from '@mantine/core';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { useSDKData } from '@this-is-not-a-drill/react-core';
import { TinadComponent, TinadTemplateProps } from '@this-is-not-a-drill/react-ui';
import { envConfig } from '../envConfig';
import { Slide } from 'react-toastify';


type DemoType = 'defaultInline' | 'customTemplateInline' | 'modal' | 'defaultToast' | 'customToast';

function isValidDemoType(value: any): value is DemoType {
  return ['defaultInline', 'customTemplateInline', 'modal', 'defaultToast', 'customToast'].includes(value);
}

export const SimpleDemo = () => {

  const [ demoType, setDemoType ] = useState<DemoType>('defaultToast');
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
          <Title style={{marginBottom:'10px'}} order={5}>This is Not A Drill! Basic Demos Page</Title>
        </Group>

        { demoType == 'defaultInline' && (
            <TinadComponent pageId="simple" mode="inline" />
        ) }

        { demoType == 'customTemplateInline' && (
            <TinadComponent pageId="simple" mode="inline" template={CustomTemplate} />
        ) }

        { demoType == 'modal' && (
            <TinadComponent pageId="simple" mode="modal" />
        ) }

        { demoType == 'defaultToast' && (
            <TinadComponent pageId="simple" mode="toast" toastProps={{ autoClose:false }} />
        ) }

        { demoType == 'customToast' && (
            <TinadComponent 
              pageId="simple" 
              mode="toast" 
              toastProps={{ position:"bottom-left",
                            autoClose: false,
                            hideProgressBar: false,
                            rtl: false, 
                            theme: "dark", 
                            transition: Slide }}
            />
        ) }
          
        <Title style={{paddingTop:'15px'}} order={6}>Available Notification Styles:</Title>
        <Card>
          <Tabs 
            defaultValue="defaultToast" 
            variant="pills"
            orientation="vertical" 
            value={demoType}
            onChange={(value) => {
              if (isValidDemoType(value)) {
                setDemoType(value);
              }
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="defaultToast">
                Toast &mdash; Default Format
              </Tabs.Tab>
              <Tabs.Tab value="customToast">
                Toast &mdash; Custom Format
              </Tabs.Tab>
              <Tabs.Tab value="defaultInline">
                Inline &mdash; Default Format
              </Tabs.Tab>
              <Tabs.Tab value="customTemplateInline">
                Inline &mdash; Customized Format
              </Tabs.Tab>
              <Tabs.Tab value="modal">
                Modal
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        <Button 
          variant="outline" 
          size="sm" 
          title="Reset all views on all notifications so you can re-test them." 
          onClick={handleResetAllViews}>Reset available notifications
        </Button>

        </Card>

        <Text size="sm" style={{marginTop:'10px'}}>
          Create some general notifications in the dashboard, and they will appear here within a few seconds. When you click "Reset" above, any previously dismissed notificatons will be displayed again.
        </Text>
        


          <Text size="xs" style={{fontStyle:'italic',marginTop:'15px'}}>This demo is part of a larger sample "bank application" demo, which you can access by using the left nav links.
            In Stackblitz, the main sample bank application navigation can be slow to load, which is why we show you
            all the possible notification styles here as well.</Text>

      </Card>

    </>
  );

}

export default SimpleDemo;
