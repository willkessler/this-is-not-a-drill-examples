import { Anchor, Stack } from '@mantine/core';
import classes from '../css/MainLayout.module.css';

const Navbar = () => {
  return (
    <>
      <Stack justify="flex-start" align="flex-start">
            <Anchor className={classes.navbarLinks} href="/home" fz="md">Dashboard</Anchor>
            <Anchor className={classes.navbarLinks} href="/pay" fz="md">Pay Bills</Anchor>
            <Anchor className={classes.navbarLinks} href="/deposit" fz="md">Make Deposit</Anchor>
            <Anchor className={classes.navbarLinks} href="/transfer" fz="md">Transfer $$</Anchor>
            <Anchor className={classes.navbarLinks} href="/statements" fz="md">Statements</Anchor>
            <Anchor className={classes.navbarLinks} href="/about" fz="md">About This Demo</Anchor>
          </Stack>
    </>
  );
};

export default Navbar;
