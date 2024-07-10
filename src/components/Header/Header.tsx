import { useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import { WrongNetwork } from 'components/WrongNetwork'
import { useMenuArray } from 'constants/menu'
import { Paths } from 'constants/paths'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'

import Logo from '../../assets/svg/logo.svg'
import Web3Status from '../Web3Status'
import { HeaderIconSvg } from './HeaderIcon'
import { LanguageSelector } from './LanguageSelector'
import { MobileHeader } from './MobileHeader'
import { ExternalLinkMenuItem, HeaderFrame, HeaderMenu, LogoContainer, MenuItem } from './style'

export default function Header() {
  const isMobile = useIsMobileDevice()

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

function DesktopHeader() {
  const menuArray = useMenuArray()
  const { notSupportedChain, account, isInBlackList } = useWarningFlag()

  return (
    <HeaderFrame>
      <LogoContainer to={Paths.DEFAULT}>
        <img width="auto" src={Logo} alt="logo" />
      </LogoContainer>
      <HeaderMenu>
        {menuArray.map(({ href, src, label, callback }) => {
          const isExternal = href.startsWith('http') || href.startsWith('https')
          if (isExternal) {
            return (
              <ExternalLinkMenuItem href={href} key={href} target="_blank" rel="noreferrer">
                <span>{label}</span>
                {src && <HeaderIconSvg src={src} />}
              </ExternalLinkMenuItem>
            )
          }
          return (
            <MenuItem to={href} key={href} onClick={() => callback?.()}>
              <span>{label}</span>
              {src && <HeaderIconSvg src={src} />}
            </MenuItem>
          )
        })}
      </HeaderMenu>
      <HeaderMenu style={{ columnGap: '2rem' }}>
        <LanguageSelector />
        <Web3Status />
      </HeaderMenu>
      {notSupportedChain && account && !isInBlackList && <WrongNetwork />}
    </HeaderFrame>
  )
}
