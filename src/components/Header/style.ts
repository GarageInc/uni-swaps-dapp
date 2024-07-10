import { Link, NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

export const HeaderFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > * {
    flex: 1;
  }
`

export const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  column-gap: 3.25rem;
  flex: 2;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
  `};
`

export const AccountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`

export const MenuItem = styled(NavLink)`
  color: ${({ theme }) => theme.text60};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.35rem */
  letter-spacing: -0.01125rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.38rem;

  :hover {
    color: ${({ theme }) => theme.text100};
    & * {
      stroke: ${({ theme }) => theme.text100};
    }
  }

  &.active {
    color: ${({ theme }) => theme.text100};
    & * {
      stroke: ${({ theme }) => theme.text100};
    }
    text-decoration-line: underline;
  }
`
export const ExternalLinkMenuItem = styled.a`
  color: ${({ theme }) => theme.text60};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.35rem */
  letter-spacing: -0.01125rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.38rem;

  :hover {
    color: ${({ theme }) => theme.text100};
    & * {
      stroke: ${({ theme }) => theme.text100};
    }
  }

  &.active {
    color: ${({ theme }) => theme.text100};
    & * {
      stroke: ${({ theme }) => theme.text100};
    }
    text-decoration-line: underline;
  }
`

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  flex: 2;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    justify-content: center;
  `};

  > img {
    width: 8rem;

    ${({ theme }) => theme.mediaWidth.upToTablet`
      width: 5.3rem;
    `};
  }
`

export const BurgerIcon = styled.div`
  button {
    background: none;
    border: none;
    cursor: pointer;
    width: 1.43rem;
    padding: 0;
  }

  img {
    width: 100%;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const MobileMenuModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 6rem 1.25rem 2.2rem;
  z-index: 100;
  animation: ${fadeIn} 0.2s ease-in-out;
  overflow-y: auto;
`

export const MobileMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
`

export const MobileMenuModalCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 4.125rem;
  aspect-ratio: 1/1;
  transition: all 0.2s ease;

  :hover {
    transform: scale(0.8);
    opacity: 0.8;
  }
`
