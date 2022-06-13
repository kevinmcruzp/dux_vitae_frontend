import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../hooks/useColors";

type HeaderProps = {
  profile?: () => void;
  userName?: string;
};

export function MenuUser({ userName, profile }: HeaderProps) {
  const { colors } = useColors();
  const { signOut } = useAuth();

  const router = useRouter();

  function handleSignOut() {
    if (typeof window !== "undefined") {
      signOut();
    }
  }

  return (
    <Menu autoSelect={false} direction="rtl" isLazy>
      {/* <MenuButton
        as={Avatar}
        src={src}
        variant="outline"
        aria-label="Options"
        cursor="pointer"
        w="50px"
        h="50px"
      /> */}
      <MenuButton>
        <Avatar name={userName} />
      </MenuButton>
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
