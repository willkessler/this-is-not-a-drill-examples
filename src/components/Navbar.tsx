import { Anchor, Stack } from '@mantine/core';
import classes from '../css/MainLayout.module.css';

const Navbar = () => {
  return (
    <>
      <Stack justify="flex-start" align="flex-start">
            <Anchor className={classes.navbarLinks} href="/home" fz="md">Overview</Anchor>
            <Anchor className={classes.navbarLinks} href="/pay" fz="md">Pay Bills</Anchor>
            <Anchor className={classes.navbarLinks} href="/deposit" fz="md">Make Deposit</Anchor>
            <Anchor className={classes.navbarLinks} href="/transfer" fz="md">Transfer $$</Anchor>
            <Anchor className={classes.navbarLinks} href="/statements" fz="md">Statements</Anchor>
            <Anchor className={classes.lowerNavbarLinks} style={{marginTop:'65px', paddingTop:'25px', borderTop:'1px dotted #99f'}} href="/simpledemo" fz="sm">Quick One-Page TINAD Demo</Anchor>
            <Anchor className={classes.lowerNavbarLinks} href="/about" fz="sm">About the TINAD Demo Site</Anchor>
          </Stack>
    </>
  );
};

export default Navbar;
