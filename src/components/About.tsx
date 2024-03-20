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
