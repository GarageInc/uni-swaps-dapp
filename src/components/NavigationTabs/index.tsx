import { darken } from 'polished'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const activeClassName = 'active'

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})<{ inactive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 20px;

  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
