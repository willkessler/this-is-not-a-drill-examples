import '@mantine/core/styles.css';
import { Text, Title } from '@mantine/core';
import { TinadComponent } from '@this-is-not-a-drill/react-ui';
import { Slide } from 'react-toastify';

export const TransferMoney = () => {
    return (
        <>
          <Title>Transfer Funds</Title>
        <Text size="xl">Set up money transfers, wires, ACH payments, Zelle, and more right from this page.</Text>

        <TinadComponent pageId="transfer" mode="toast" 
          toastProps={{ position:"top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        rtl: false, 
                        theme: "dark", 
                        transition: Slide }}
        />
        </>
  );
}

export default TransferMoney;
