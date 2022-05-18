import { useColorMode } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'
import { useColors } from '../../hooks/useColors'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
  colorCustom?: string
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  colorCustom = 'white',
  ...rest
}: ActiveLinkProps) {
  const { colorMode } = useColorMode()
  const { asPath } = useRouter()

  const { colors } = useColors()

  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (!shouldMatchExactHref
    && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color:
          colorMode === 'light'
            ? (isActive
              ? colors.secondary
              : colorCustom
            )
            : (isActive
              ? colors.secondary
              : colorCustom
            ),
      })}
    </Link>
  )
}
