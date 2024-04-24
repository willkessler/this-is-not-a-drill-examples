import { AppShell, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import classes from '../css/MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import DemoControls from './DemoControls';
import { envConfig } from '../envConfig';


const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const [ demoControls, setDemoControls ] = useState(<></>);

  useEffect(() => {
    if ((envConfig.TINAD_IS_DEMO_SITE === 'true') &&
        (envConfig.TINAD_IS_STACKBLITZ_PLAYGROUND == 'true')) {
      console.log('Adding democontrols');
      setDemoControls(
        <DemoControls />
      );
    }
  }, [envConfig]);
  
  return (
    <AppShell
      header={{ height: 140 }}
      navbar={{
          width: '140px',
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
      }}
      padding="md"
    >
     <AppShell.Header className={classes.header}>
       <Header opened={opened} toggle={toggle} />
     </AppShell.Header>

     <AppShell.Navbar className={classes.nav} p="md">
       <Navbar />
     </AppShell.Navbar>
 
     <AppShell.Main className={classes.mainContent}>
       <Stack justify="space-between">
         <Outlet />
         { demoControls }
       </Stack>
      </AppShell.Main>

     <AppShell.Footer className={classes.footer}>
       <Footer />
     </AppShell.Footer>

    </AppShell>
  );
};

export default MainLayout;
