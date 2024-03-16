import '@mantine/core/styles.css';
import { Card, Group, Stack, Text, Image, Title } from '@mantine/core';
import classes from '../css/MainLayout.module.css'; // Adjust the path as necessary
import { TinadComponent, TinadTemplateProps } from '@this-is-not-a-drill/react-ui';

export const PayBills = () => {

  const CustomTemplate: React.FC<TinadTemplateProps> = ({ tinadContent, tinadType, dismiss }) => {
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', borderRadius:'10px' }}>
        <div style={{ marginBottom: '10px' }}>{tinadContent}</div>
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
                src="CheckingAccountIcon.webp" />
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
                src="SavingsAccountIcon.webp" />
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
                src="PortfolioIcon.webp" />
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
