import { Burger, Image, Group } from '@mantine/core';
import { envConfig } from '../envConfig';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header:React.FC<HeaderProps> = ({opened, toggle}) => {

  return (
    <>
       <Group gap="xs">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          style={{marginLeft:'20px'}}
        />
            <a href="/home">
          <Image 
            me="xs"
            h={220}
            src={`${envConfig.TINAD_IMAGE_LOCATION}UnifiedTextLogo2.png`} />
            </a>
       </Group>

    </>
  );
};

export default Header;
