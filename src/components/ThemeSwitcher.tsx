import { IconButton, useColorMode } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

type ThemeSwitcherProps = {
  color?: string
}

export function ThemeSwitcher({ color = 'white' }: ThemeSwitcherProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <header>
      <IconButton
        icon={colorMode === 'light'
          ? <RiMoonLine size='22px' />
          : <RiSunLine size='22px' />
        }
        variant='switchTheme'
        aria-label='Color mode switcher'
        colorScheme='whiteAlpha'
        color={color}
        onClick={toggleColorMode}
      >
        Switch Mode
      </IconButton>
    </header>
  )
}
