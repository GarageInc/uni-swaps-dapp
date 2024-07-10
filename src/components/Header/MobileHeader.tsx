import { Portal } from '@mui/material'
import { useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import Web3Status from 'components/Web3Status'
import { WrongNetwork } from 'components/WrongNetwork'
import { useMenuArray } from 'constants/menu'
import { Paths } from 'constants/paths'
import { useState } from 'react'

import Logo from '../../assets/svg/logo.svg'
import Burger from './burger.svg'
import CloseBtnICcon from './close-btn.svg'
import { LanguageSelector } from './LanguageSelector'
import {
  AccountContainer,
  BurgerIcon,
  ExternalLinkMenuItem,
  HeaderFrame,
  LogoContainer,
  MenuItem,
  MobileMenuList,
  MobileMenuModal,
  MobileMenuModalCloseBtn,
} from './style'

export function MobileHeader() {
  const { notSupportedChain, account, isInBlackList } = useWarningFlag()

  return (
    <HeaderFrame>
      <MobileMenu />
      <LogoContainer to={Paths.DEFAULT}>
        <img width="auto" src={Logo} alt="logo" />
      </LogoContainer>

      <AccountContainer>
        <Web3Status />
      </AccountContainer>
      {notSupportedChain && account && !isInBlackList && <WrongNetwork />}
    </HeaderFrame>
  )
}

const MobileMenu = () => {
  const menuArray = useMenuArray()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <BurgerIcon>
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
        >
          <img
            src={Burger}
            alt="burger"
            // onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </button>
      </BurgerIcon>
      <Portal>
        {isMenuOpen && (
          <MobileMenuModal>
            <MobileMenuList>
              {menuArray.map(({ href, src, label, callback }) => {
                const isExternal = href.startsWith('http') || href.startsWith('https')
                if (isExternal) {
                  return (
                    <ExternalLinkMenuItem href={href} key={href} target="_blank" rel="noreferrer">
                      {label}
                    </ExternalLinkMenuItem>
                  )
                }
                return (
                  <MenuItem to={href} key={href} onClick={() => callback?.()}>
                    {label}
                  </MenuItem>
                )
              })}

              <LanguageSelector variant="mobile" />
            </MobileMenuList>
            <MobileMenuModalCloseBtn
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              <img src={CloseBtnICcon} alt="close" />
            </MobileMenuModalCloseBtn>
          </MobileMenuModal>
        )}
      </Portal>
    </>
  )
}
