import '@mantine/core/styles.css';
import { Anchor, Card, Code, Image, Text, Title, Button, Group } from '@mantine/core';
import classes from '../css/MainLayout.module.css';

const goHome = () => {
  window.location.assign('/');
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
          This playground provides a simulation of a regional bank web application.
          Each page of this application demonstrates a different notification type.<br /><br />
          The tutorial video below explains things, or, just dive into the code editor.
          To get started, put your temporary API key into the file environment file <Code>.env</Code>,
      and then click the hamburger menu to navigate (upper left) or use the quick links below:
        </Text>
        <ul>
          <li><Anchor href="/">Bank dashboard</Anchor></li>
          <li><Anchor href="/pay">Pay your bills</Anchor></li>
        </ul>

  
      <Button onClick={goHome} color="blue" fullWidth mt="md" radius="md">
        Ok, I got it! 
      </Button>
    </Card>
        </>
  );
}

export default About;
