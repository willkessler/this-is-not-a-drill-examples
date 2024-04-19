import '@mantine/core/styles.css';
import { Text, Title } from '@mantine/core';
import { TinadComponent } from '@this-is-not-a-drill/react-ui';
import { Bounce } from 'react-toastify';

export const Statements = () => {
    return (
        <>
          <Title>Your Statements</Title>
          <Text size="xl">You will find all your monthly statements here.</Text>

          <TinadComponent pageId="statements" mode="toast" 
            toastProps={{ position:"top-center",
                          autoClose: true,
                          hideProgressBar: false,
                          rtl: false, 
                          theme: "light", 
                          transition: Bounce }}
          />
        </>
      
  );
}

export default Statements;
