import { Unicon } from 'components/Unicon'
import { Connection, ConnectionType } from 'connection/types'
import useENSAvatar from 'hooks/useENSAvatar'
import styled from 'styled-components'
import { flexColumnNoWrap } from 'theme/styles'

import sockImg from '../../assets/svg/socks.svg'
import { useHasSocks } from '../../hooks/useSocksBalance'
import Identicon from '../Identicon'

export type SmallIconPosition = 'left' | 'right' | 'center'

const IconWrapper = styled.div<{ size?: number }>`
  position: relative;
  ${flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const MiniIconContainer = styled.div<{ side: SmallIconPosition }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  bottom: -4px;
  ${({ side }) => {
    const positions = {
      left: '-4px',
      right: '-4px',
      center: 'calc(50% - 6px)',
    }
    return `${side === 'left' || side === 'center' ? 'left' : 'right'}: ${positions[side]};`
  }};
  border-radius: 50%;
  outline-offset: -0.1px;
  overflow: hidden;
  @supports (overflow: clip) {
    overflow: clip;
  }
`

const MiniImg = styled.img`
  width: 16px;
  height: 16px;
`

const Socks = () => {
  return (
    <MiniIconContainer side="left">
      <MiniImg src={sockImg} />
    </MiniIconContainer>
  )
}

const MiniWalletIcon = ({ connection, side }: { connection: Connection; side: SmallIconPosition }) => {
  return (
    <MiniIconContainer side={side}>
      <MiniImg src={connection.getProviderInfo?.().icon} alt={`${connection.getProviderInfo().name} icon`} />
    </MiniIconContainer>
  )
}

const MainWalletIcon = ({ account, connection, size }: { account: string; connection: Connection; size: number }) => {
  const { avatar } = useENSAvatar(account ?? undefined)

  if (!account) {
    return null
  } else if (
    avatar ||
    (connection.type === ConnectionType.INJECTED && connection.getProviderInfo().name === 'MetaMask')
  ) {
    return <Identicon account={account} size={size} />
  } else {
    return <Unicon address={account} size={size} />
  }
}

export default function StatusIcon({
  account,
  connection,
  size = 16,
  showMiniIcons = true,
  smallIconPosition = 'right',
}: {
  account: string
  connection: Connection
  size?: number
  showMiniIcons?: boolean
  smallIconPosition?: SmallIconPosition
}) {
  const hasSocks = useHasSocks()

  return (
    <IconWrapper size={size} data-testid="StatusIconRoot">
      <MainWalletIcon account={account} connection={connection} size={size} />
      {showMiniIcons && <MiniWalletIcon connection={connection} side={smallIconPosition} />}
      {hasSocks && showMiniIcons && <Socks />}
    </IconWrapper>
  )
}
