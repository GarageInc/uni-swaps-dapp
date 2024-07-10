import { FlexContainer } from 'components/Flex'
import { HeaderIconSvg } from 'components/Header/HeaderIcon'
import { useMenuArray } from 'constants/menu'
import { Paths } from 'constants/paths'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'

const Menu = styled.div`
  margin-top: 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  column-gap: 6.5rem;
  flex: 2;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    flex-direction: column;
    margin-top: 4.19rem;
    row-gap: 2rem;
  `};
`

const MenuItem = styled(NavLink)`
  color: ${({ theme }) => theme.text100};
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01375rem;
  text-transform: uppercase;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  & * {
    stroke: ${({ theme }) => theme.text100};
  }
  :hover {
    color: ${({ theme }) => theme.text60};
    & * {
      stroke: ${({ theme }) => theme.text60};
    }
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1rem;
  letter-spacing: -0.01rem;
  `};
`
const ExternalLinkMenuItem = styled.a`
  color: ${({ theme }) => theme.text100};
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01375rem;
  text-transform: uppercase;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  & * {
    stroke: ${({ theme }) => theme.text100};
  }
  :hover {
    color: ${({ theme }) => theme.text60};
    & * {
      stroke: ${({ theme }) => theme.text60};
    }
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1rem;
  letter-spacing: -0.01rem;
  `};
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  margin-top: 7.75rem;

  > img {
    width: 10.375rem;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-top: 4.5rem;
    > img {
      width: 5.375rem;
    }
  `};
`

const AllRightsReserved = styled.p`
  color: ${({ theme }) => theme.text40};
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
  margin-top: 7.88rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-top: 4.19rem;
    margin-bottom: 9rem;
  `};
`

export const Footer = () => {
  const menuArray = useMenuArray()

  const { t } = useTranslation()

  return (
    <FlexContainer
      additionalStyles={{
        flexDirection: 'column',
      }}
    >
      <LogoContainer to={Paths.DEFAULT}>
        <img width="auto" src={Logo} alt="logo" />
      </LogoContainer>
      <Menu>
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
      </Menu>
      <AllRightsReserved>{t('Home.allRights')}</AllRightsReserved>
    </FlexContainer>
  )
}
