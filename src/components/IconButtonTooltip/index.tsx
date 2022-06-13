import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useColors } from "../../hooks/useColors";

interface IIconButtonTooltip extends IconButtonProps {
  icon: ReactElement;
}

//Para la accesibilidad
export function IconButtonTooltip({ icon, ...rest }: IIconButtonTooltip) {
  const { colors } = useColors();

  return (
    <IconButton
      position="relative"
      bg={colors.secondary}
      size="sm"
      icon={icon}
      transition=".2s filter"
      {...rest}
      _hover={{
        filter: "brightness(120%)",
        _before: {
          opacity: 1,
          pointerEvents: "all",
        },
        _after: {
          opacity: 1,
          pointerEvents: "all",
        },
      }}
      _before={{
        zIndex: 100,
        opacity: 0,
        position: "absolute",
        content: '""',
        top: "34px",
        width: "6px",
        height: "6px",
        pointerEvents: "none",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
        borderBottom: "7px solid",
        borderBottomColor: colors.secondary,
        transition: ".2s",
      }}
      _after={{
        opacity: 0,
        position: "absolute",
        content: "attr(aria-label)",
        top: "40px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        background: colors.secondary,
        color: colors.color,
        borderRadius: "7px",
        padding: "4px 5px",
        fontSize: "16px",
        fontWeight: "normal",
        transition: ".2s",
      }}
    />
  );
}
