import { Card, Image, Stack, Text, Title, Group } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { TinadComponent, TinadTemplateProps } from '@this-is-not-a-drill/react-ui';
import { envConfig } from '../envConfig';
  
const HomePage = () => {

  return (
    <div>
      <TinadComponent pageId="home" mode="toast" />

      <Title style={{marginBottom:'10px'}} me="lg" order={1}>Financial Overview</Title>

      <Group gap="xs" className={classes.mainContent}>
        <Card shadow="sm" p="sm" radius="sm" className={classes.card}>
          <Stack justify="space-between" className={classes.cardOuterStack}>
            <div className={classes.cardInnerStack}>
              <Image 
                radius="md"
                h={80}
                src={`${envConfig.TINAD_IMAGE_LOCATION}CheckingAccountIcon.webp`} />
            </div>
            <Stack align="left" justify="flex-end" gap="xs">
               <Text className={classes.cardText}>Checking Account</Text>
               <Text size="lg" >$1,234.56</Text>
              </Stack>
          </Stack>
        </Card>

        <Card shadow="sm" p="sm" radius="sm" className={classes.card}>
          <Stack justify="space-between" className={classes.cardOuterStack}>
            <div className={classes.cardInnerStack}>
              <Image 
                radius="md"
                h={80}
                src={`${envConfig.TINAD_IMAGE_LOCATION}SavingsAccountIcon.webp`} />
            </div>
            <Stack align="left" justify="flex-end" gap="xs">
               <Text className={classes.cardText}>Savings Account</Text>
               <Text size="lg" >$9,298.88</Text>
              </Stack>
          </Stack>
        </Card>

        <Card shadow="sm" p="sm" radius="sm" className={classes.card}>
          <Stack justify="space-between" className={classes.cardOuterStack}>
            <div className={classes.cardInnerStack}>
              <Image 
                radius="md"
                h={80}
                src={`${envConfig.TINAD_IMAGE_LOCATION}PortfolioIcon.webp`} />
            </div>
            <Stack align="left" justify="flex-end" gap="xs">
               <Text className={classes.cardText}>Investment Portfolio</Text>
               <Text size="lg" >$110,234.56</Text>
              </Stack>
          </Stack>
        </Card>
      </Group>
    </div>
  );
}

export default HomePage;
