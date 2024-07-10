import { ButtonBase } from '@mui/material'
import styled from 'styled-components'

export const ArrowButton = styled(ButtonBase).attrs({
  variant: 'text',
})`
  :before {
    content: unset !important;
  }
  min-width: 64px;
  min-height: 64px;
  border-radius: 50%;

  &,
  &:hover {
    background-color: ${({ theme }) => theme.grey} !important;
  }

  &.slick-prev {
    z-index: 1;
    img {
      transform: rotate(180deg) !important;
    }
  }

  &.slick-disabled {
    display: none !important;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    &.slick-next {
      right: -14px;
    }
    &.slick-prev {
      left: -14px;
    }
  `};
`
