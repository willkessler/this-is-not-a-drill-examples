import { Burger, Image, Group } from '@mantine/core';
import { useEnv } from '../envContext';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header:React.FC<HeaderProps> = ({opened, toggle}) => {
  const { TINAD_IMAGE_LOCATION } = useEnv();

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
            h={250}
            src={`${TINAD_IMAGE_LOCATION}UnifiedTextLogo2.png`} />
            </a>
       </Group>

    </>
  );
};

export default Header;
