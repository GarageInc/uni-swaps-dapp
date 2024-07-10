import { Box } from '@mui/material'
import { AssetLogo } from 'components/AssetLogo/AssetLogo'
import { IAppToken } from 'components/blocks/AmountInput/useAppCoins'
import EsXFIIcon from 'components/icons/esXFI'
import WethIcon from 'components/icons/ethereum'
import LpXfiIcon from 'components/icons/lp-xfi'
import UsdtIcon from 'components/icons/usdt'
import XfiIcon from 'components/icons/xfiToken'
import XUsdIcon from 'components/icons/xusd'
import { FC, PropsWithChildren } from 'react'
import styled, { useTheme } from 'styled-components'

import ArrowIcon from './arrow.svg'

export type TokenSmallBadgeProps = PropsWithChildren<{
  variant?: TokenSmallBadgeVariant
  className?: string
  showLabel?: boolean
  showArrow?: boolean
  asset?: IAppToken
  size?: number
  onClick?: () => void
}>

const TokenSmallBadge: FC<TokenSmallBadgeProps> = ({
  variant,
  className,
  children,
  showLabel = true,
  showArrow = true,
  asset,
  size = 32,
  onClick,
}) => {
  const theme = useTheme()

  const {
    label,
    icon,
    textColor = 'text100',
  } = VARIANTS[variant?.toLowerCase() as TokenSmallBadgeVariant] ||
  VARIANTS[variant as TokenSmallBadgeVariant] ||
  asset ||
  {}

  return (
    <Badge onClick={onClick} className={className}>
      <Box display="flex" width="100%" gap="0" alignItems="center">
        {icon ? (
          <Icon className="smallBadgeIcon">{icon}</Icon>
        ) : (
          <AssetLogo className="smallBadgeIcon" size={size} symbol={asset?.symbol || variant?.toLowerCase()} />
        )}
        {showLabel && <TokenLabel className="smallBadgeLabel">{label || asset?.symbol || variant}</TokenLabel>}
        {showArrow && <Arrow src={ArrowIcon} />}
      </Box>

      {children && <Box color={theme[textColor]}>{children}</Box>}
    </Badge>
  )
}

const VARIANTS = {
  weth: {
    label: 'WETH',
    icon: <WethIcon color="black" />,
    textColor: 'dark80',
    iconBg: 'white',
  },
  lpXFI: {
    label: 'lpXFI',
    icon: <LpXfiIcon color="appViolet" />,
    textColor: 'appViolet',
    iconBg: 'appViolet25',
  },
  xfi: { label: 'XFI', icon: <XfiIcon color="main" />, textColor: 'main' },
  wxfi: { label: 'wXFI', icon: <XfiIcon color="main" />, textColor: 'main' },
  esXFI: {
    label: 'esXFI',
    icon: <EsXFIIcon color="fuchsia" />,
    textColor: 'fuchsia',
    iconBg: 'fuchsia25',
  },
  xusd: {
    label: 'XUSD',
    icon: <XUsdIcon color="black" />,
    textColor: 'black',
  },
  usdt: {
    label: 'USDT',
    icon: <UsdtIcon color="dark80" />,
    textColor: 'dark80',
  },
  eth: { label: 'ETH', icon: <WethIcon color="dark" />, bg: 'main15', textColor: 'dark80', iconBg: 'main15' },
} as const

export type TokenSmallBadgeVariant = keyof typeof VARIANTS

const Badge = styled.div<{ bg?: string }>`
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.62rem;
  width: 2rem;
  height: 2rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.5rem;
    margin-right: 0.5rem;
  `}

  svg, img {
    width: 100%;
    height: 100%;
  }
`

const TokenLabel = styled.span`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.text100};
  line-height: 1;
  position: relative;
  top: 0.1rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.25rem;
  `}
`

const Arrow = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
`

export default TokenSmallBadge
