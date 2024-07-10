import './sidebar.scss'

import { useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import { useMenuArray } from 'constants/menu'
import React, { useCallback, useEffect, useState } from 'react'
import { ProSidebar, SidebarContent } from 'react-pro-sidebar'
import styled from 'styled-components'

import { activeClassName, StyledNavLink } from '../NavigationTabs'

const StyledMenuLinkBattle = styled(StyledNavLink).attrs({
  activeClassName,
})<{
  isWhite?: boolean
}>`
  opacity: ${({ inactive = false }) => (inactive ? '0.4' : '1')};
  pointer-events: ${({ inactive = false }) => (inactive ? 'none' : 'initial')};
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 15px;
  align-items: center;

  font-weight: bold;
  transition: all 0.3s;
  color: ${({ theme, isWhite }) => (isWhite ? theme.light : theme.dark)};

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0px;
  }

  transition: all 0.3s ease-in;

  &:hover {
    transform: translateX(10px);
    color: ${({ theme }) => theme.darkOrange};
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.darkOrange};
  }
`

const Btn = styled.span`
  border-radius: 12px;
  min-width: 60px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  font-size: 25px;

  min-width: 50px;
  font-size: 20px;
  border-radius: 10px;
  padding: 14px 14px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 40px;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
  `};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow: hidden;
    z-index: 100;
  `};
`

const BtnImg = styled.img``

const Label = styled.span``

// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/src/scss/variables.scss
const mql = window.matchMedia(`(min-width: 1024px)`)

export const useSidebarState = () => {
  const [open, setOpen] = useState(false)
  const [docked, setDocked] = useState(() => mql.matches)

  const onToggle = (value: boolean) => setOpen(value)
  const onOpen = () => setOpen(true)

  const mediaQueryChanged = useCallback(() => {
    setDocked(mql.matches)
    setOpen(false)
  }, [setDocked, setOpen])

  useEffect(() => {
    mql.addListener(mediaQueryChanged)

    return () => mql.removeListener(mediaQueryChanged)
  }, [mediaQueryChanged])

  return { open, onToggle, onOpen, docked }
}

interface IProps {
  onToggle: (b: boolean) => void
  open: boolean
  isWhite?: boolean
}

const SidebarInner = ({ open, onToggle, isWhite = false }: IProps) => {
  const menuArray = useMenuArray()

  const { notSupportedChain } = useWarningFlag()

  return (
    <ProSidebar toggled={open} onToggle={onToggle}>
      <SidebarContent>
        <Content>
          {menuArray.map(({ href, src, label }) => (
            <StyledMenuLinkBattle to={href} key={href} isWhite={isWhite} inactive={notSupportedChain}>
              <Btn>
                <BtnImg src={src} alt={label} />
              </Btn>
              <Label>{label}</Label>
            </StyledMenuLinkBattle>
          ))}
        </Content>
      </SidebarContent>
    </ProSidebar>
  )
}

export default SidebarInner
