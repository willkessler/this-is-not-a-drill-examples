import '@mantine/core/styles.css';
import { Title, Text } from '@mantine/core';
import { TinadComponent } from '@this-is-not-a-drill/react-ui';

export const Deposit = () => {
    return (
        <>
          <Title>Deposits at UFCU</Title>
          <Text size="xl">On this page, you can make a deposit.</Text>
          <TinadComponent pageId="deposit" mode="inline" />
        </>
  );
}

export default Deposit;
