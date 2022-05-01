import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Router from "next/router";
import { useColors } from "../../hooks/useColors";

export function MenuUser() {
  const { colors } = useColors();

  function handleSignOut() {
    Router.push('/')
  }

  return (
    <Menu autoSelect={false} direction='rtl' isLazy>
      <MenuButton
        as={Avatar}
        src='https://avatars.githubusercontent.com/u/59587859?v=4'
        variant='outline'
        aria-label='Options'
        cursor='pointer'
        w='50px'
        h='50px'
      />
      <MenuList bg={colors.bgHover} borderColor={colors.divider} >
        <MenuItem
          color={colors.color}
          _hover={{ bg: colors.bg }}
          onClick={handleSignOut}
        >
          Salir
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
