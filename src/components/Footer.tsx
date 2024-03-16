import {  Stack, Text } from '@mantine/core';

const Footer = () => {
  return (
    <>
          <Stack align="flex-start" justify="flex-end" gap="xs">
            <Text size="sm" style={{fontStyle:'italic', textAlign:'left'}}>Copyright (c) 2024 Unified Financial Federal Credit Union, LLC</Text>
      <Text size="xs" style={{fontStyle:'italic', textAlign:'left'}}>Any resemblance to an actual financial institution is purely coincidental. <br />This site is intended only to be a playground for the <a href="https://this-is-not-a-drill.com" target="_blank">This Is Not A Drill!</a> Notifications Service.</Text>
          </Stack>
    </>
  );
};

export default Footer;
