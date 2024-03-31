import '@mantine/core/styles.css';
import { Text, Title } from '@mantine/core';
import { TinadComponent } from '@this-is-not-a-drill/react-ui';
import { Bounce, Slide } from 'react-toastify';

export const TransferMoney = () => {
    return (
        <>
          <Title>Transfer Money</Title>
        <Text size="xl">This is where you can set up money transfers, wires, and ACH payments.</Text>

        <TinadComponent pageId="transfer" mode="toast" 
          toastProps={{ position:"bottom-left",
                      autoClose: 2000,
                      hideProgressBar: false,
                      rtl: false, 
                      theme: "dark", 
                      transition: Slide }}
          environments="Development,Staging" />
        </>
  );
}

export default TransferMoney;
