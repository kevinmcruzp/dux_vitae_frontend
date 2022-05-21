import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";

type HeaderProps = {
  profile?: () => void;
  src?: string;
};

export function MenuUser({ profile, src }: HeaderProps) {
  const { colors } = useColors();

  const router = useRouter();

  function handleSignOut() {
    signOut();
  }

  return (
    <Menu autoSelect={false} direction="rtl" isLazy>
      <MenuButton
        as={Avatar}
        src={src}
        variant="outline"
        aria-label="Options"
        cursor="pointer"
        w="50px"
        h="50px"
      />
      <MenuList bg={colors.bgHover} borderColor={colors.divider}>
        {router.pathname !== "/admin/claim" &&
          router.pathname !== "/admin/nutritionist" &&
          router.pathname !== "/admin/dashboard" &&
          router.pathname !== "/admin/client" &&
          router.pathname !== "/admin/certificate" && (
            <MenuItem
              color={colors.color}
              _hover={{ bg: colors.bg }}
              onClick={profile}
            >
              Perfil
            </MenuItem>
          )}

        <MenuItem
          color={colors.color}
          _hover={{ bg: colors.bg }}
          onClick={handleSignOut}
        >
          Salir
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
