import '@mantine/core/styles.css';
import { Anchor, Card, Code, Image, Text, Title, Button, Group } from '@mantine/core';
import classes from '../css/MainLayout.module.css';

const goHome = () => {
  window.location.assign('/home');
}

export const About = () => {
    return (
        <>

      <Card shadow="sm" padding="md" radius="md" withBorder className={classes.aboutCard}>
      <Group justify="flex-start">
        <Image
          src="ThisIsNotADrill_cutout.png"
          w={130}
        />
        <Title order={3}>This is Not A Drill! Playground</Title>
      </Group>

       <Text size="lg">
          The playground contains a simulation of a bank's responsive web application.  Each application page demonstrates a
          different notification type.<br /><br /> To get started,
          watch the tutorial video, put your temporary API key into
          the file environment file <Code>.env</Code>, and then click
          the hamburger menu to navigate or use the quick links below.
          </Text> 

            <ul> 
               <li><Anchor href="/home">Bank Dashboard</Anchor></li>
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
