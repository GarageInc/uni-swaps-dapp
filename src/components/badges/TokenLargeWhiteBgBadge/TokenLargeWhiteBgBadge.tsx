import clsx from 'clsx'
import TokenLargeBadge from 'components/badges/TokenLargeBadge/TokenLargeBadge'
import { TokenSmallBadgeProps } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'

type Props = TokenSmallBadgeProps & {
  isDisabled?: boolean
  showArrow?: boolean
}
const TokenLargeWhiteBgBadge: FC<Props> = ({ variant, asset, isDisabled = false, showArrow, onClick }) => {
  const [isBadgeClassName, setIsBadgeClassName] = useState(false)
  const settings = (variant ? VARIANTS[variant] : undefined) || ({ iconBg: 'main15' } as any)

  return (
    <StyledBadge
      {...settings}
      onMouseEnter={() => {
        !isDisabled && setIsBadgeClassName(true)
      }}
      onMouseLeave={() => {
        setIsBadgeClassName(false)
      }}
      onClick={onClick}
      style={{ cursor: isDisabled || !showArrow ? 'auto' : 'pointer' }}
    >
      <TokenLargeBadge
        variant={variant}
        asset={asset}
        className={clsx({ badge: isBadgeClassName, isDisabled })}
        showArrow={showArrow}
      />
    </StyledBadge>
  )
}

const VARIANTS = {
  weth: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
  },
  lpXFI: {
    disabledBg: 'appViolet15',
    disabledIconBg: 'appViolet15',
    disabledTextColor: 'appViolet35',
  },
  xfi: {
    disabledBg: 'main15',
    disabledIconBg: 'main15',
    disabledTextColor: 'main35',
  },
  wxfi: {
    disabledBg: 'main15',
    disabledIconBg: 'main15',
    disabledTextColor: 'main35',
  },
  esXFI: {
    disabledBg: 'fuchsia15',
    disabledIconBg: 'fuchsia15',
    disabledTextColor: 'fuchsia35',
  },
  xusd: {
    disabledBg: 'dark06',
    disabledIconBg: 'dark06',
    disabledTextColor: 'dark30',
  },
  usdt: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
  },
  eth: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
  },
} as const

const StyledBadge = styled.div<{
  disabledBg: ThemeColors
  disabledIconBg: ThemeColors
  disabledTextColor: ThemeColors
}>`
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.inputGrayStroke};
  cursor: pointer;
  .isDisabled {
    cursor: auto;

    .smallBadgeIcon {
      svg {
        opacity: 0.35;
      }
    }

    .smallBadgeLabel {
    }
  }
`
export default TokenLargeWhiteBgBadge
