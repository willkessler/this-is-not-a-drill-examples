import { useEffect } from 'react';
import '@mantine/core/styles.css';
import { Card, Group, Stack, Text, Image, Title } from '@mantine/core';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { TinadComponent, TinadTemplateProps } from '@this-is-not-a-drill/react-ui';
import { setPageId, usePageId } from './PageIdContext';
import { useEnv } from '../envContext';

export const PayBills = () => {

  const { setPageId } = usePageId();
  useEffect(() => {
    console.log('setting page id to pay');
    setPageId('pay');
  }, [setPageId]);

  const { TINAD_IMAGE_LOCATION } = useEnv();

  const CustomTemplate: React.FC<TinadTemplateProps> = ({ tinadContent, tinadType, dismiss }) => {
    // You can use the tinadTtype to determine whatever you want to render for each
    // TINAD notification type.
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', borderRadius:'10px' }}>
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
        <Title>Pay Bills</Title>

        <Text size="xl">Pay your monthly bills here.</Text>

        <TinadComponent pageId="pay" mode="inline" template={CustomTemplate} />

        <Group gap="xs" className={classes.mainContent}>
          <Card shadow="sm" p="sm" radius="sm" className={classes.card}>
            <Stack justify="space-between" className={classes.cardOuterStack}>
              <div className={classes.cardInnerStack}>
                <Image 
                  radius="md"
                  h={80}
                  src={`${TINAD_IMAGE_LOCATION}CheckingAccountIcon.webp`} />
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
                  src={`${TINAD_IMAGE_LOCATION}SavingsAccountIcon.webp`} />
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
                  src={`${TINAD_IMAGE_LOCATION}PortfolioIcon.webp`} />
              </div>
              <Stack align="left" justify="flex-end" gap="xs">
                <Text className={classes.cardText}>Investment Portfolio</Text>
                <Text size="lg" >$110,234.56</Text>
              </Stack>
            </Stack>
          </Card>
        </Group>

      </>
    );
}

export default PayBills;
