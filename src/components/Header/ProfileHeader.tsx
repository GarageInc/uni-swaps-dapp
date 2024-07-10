import { alpha } from '@mui/material'
import WhiteLogo from 'assets/svg/logo_white.svg'
import { useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import { WrongNetwork } from 'components/WrongNetwork'
import { Paths } from 'constants/paths'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'
import { shortenAddress } from 'utils'

import { useActiveWeb3React } from '../../hooks/web3'

const HeaderFrame = styled.div`
  position: fixed;
  top: 0;
  z-index: 21;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
  background-color: transparent;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding: 12px;
  `};
`

const Title = styled.a`
  :hover {
    cursor: pointer;
  }
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow: 0px 3.333px 16.667px 0px rgba(40, 46, 63, 0.08);
  background-color: ${({ theme }) => alpha(theme.white, 0.1)};
`

const LogoImg = styled.img``

export default function ProfileHeader() {
  const { account } = useActiveWeb3React()

  const { notSupportedChain } = useWarningFlag()

  if (notSupportedChain) {
    return <WrongNetwork />
  }

  if (!account) {
    return null
  }

  return (
    <>
      <HeaderFrame>
        <Flex>
          <Title href={Paths.DEFAULT}>
            <Icon>
              <LogoImg src={WhiteLogo} alt="logo" />
            </Icon>
          </Title>
        </Flex>

        {account && <TYPE.body color="light">{shortenAddress(account, 2)}</TYPE.body>}
      </HeaderFrame>
    </>
  )
}
