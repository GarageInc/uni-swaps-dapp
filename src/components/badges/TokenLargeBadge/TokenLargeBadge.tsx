import TokenSmallBadge, { TokenSmallBadgeProps } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { FC } from 'react'
import styled from 'styled-components'

const TokenLargeBadge: FC<TokenSmallBadgeProps> = ({ variant, asset, className, ...rest }) => {
  return <StyledBadge variant={variant} asset={asset} className={className} {...rest} />
}

const StyledBadge = styled(TokenSmallBadge)``
export default TokenLargeBadge
