import '@mantine/core/styles.css';
import { Anchor, Card,  Image, Group, Text,  Title, Button } from '@mantine/core';
import classes from '../css/MainLayout.module.css';
import {
  IconMenu2
} from '@tabler/icons-react';
import { useEnv } from '../envContext';

const goHome = () => {
  window.location.assign('/home');
}

export const About = () => {
  const { TINAD_IMAGE_LOCATION } = useEnv();

  return (
    <>

      <Card shadow="sm" padding="md" radius="md" withBorder className={classes.aboutCard}>
        <Group justify="flex-start">
          <Image
            src={`${TINAD_IMAGE_LOCATION}ThisIsNotADrill_cutout.png`}
            w={130}
          />
          <Title order={4}>This is Not A Drill! (TINAD) Playground</Title>
        </Group>

        <Text size="md">
          This is a simulated regional bank web application.  
          Each page demonstrates a different TINAD notification type. You can add
          notifications in the TINAD dashboard and see them show up here, or just play with this codebase.
        </Text>

        <Text size="md" style={{marginTop:'20px'}} >
          To start with, navigate with the left nav bar or the hamburger icon (<IconMenu2  style={{paddingTop:'10px'}} />)  or, use the links below. Use the blue control panel to simulate different signed in users, reset all views for the current user, or get help.
        </Text> 

        <ul> 
          <li><Anchor href="/home">Financial Overview Page</Anchor></li>
          <li><Anchor href="/pay">Payments Page</Anchor></li> 
          <li><Anchor href="/transfer">Transfer Funds Page</Anchor></li> 
        </ul>

        
        <Button onClick={goHome} color="blue" fullWidth mt="md" radius="md">
          Got it! Let's go!
        </Button>
      </Card>
    </>
  );
}

export default About;
