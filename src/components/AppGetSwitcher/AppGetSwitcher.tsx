import networkDirectionIcon from 'assets/icons/network-direction.svg'
import NetworkSwitcher, { ChainInfo } from 'components/AppGetSwitcher/NetworkSwitcher'
import { NetworkButtonColor } from 'components/AppGetSwitcher/NetworkSwitcherButton'
import { useHandleChainSwitch } from 'components/Header/NetworkSelector'
import OptimismIcon from 'components/icons/xfi'
import ArbitrumIcon from 'components/icons/xfi'
import Polygon from 'components/icons/xfi'
import XfiIcon from 'components/icons/xfi'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'
import { ZERO } from 'utils/isZero'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  height: 44px;
  width: fit-content;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    width: 100%;
  `};
`

const Icon = styled.img`
  cursor: pointer;
`

interface IChainGetInfo {
  [key: number]: ChainInfo
}

const GET_CHAINS: IChainGetInfo = {
  [SupportedChainId.BNB]: {
    from: SupportedChainId.BNB,
    icon: (color?: ThemeColors) => <XfiIcon color={color} />,
    toChain: SupportedChainId.ARBITRUM_ONE,
    label: 'BNB',
  },

  [SupportedChainId.OPTIMISM]: {
    from: SupportedChainId.OPTIMISM,
    icon: (color?: ThemeColors) => <OptimismIcon color={color} />,
    toChain: SupportedChainId.BNB,
    label: 'Optimisim',
  },

  [SupportedChainId.ARBITRUM_ONE]: {
    from: SupportedChainId.ARBITRUM_ONE,
    icon: (color?: ThemeColors) => <ArbitrumIcon color={color} />,
    toChain: SupportedChainId.BNB,
    label: 'ArbitrumOne',
  },

  [SupportedChainId.POLYGON]: {
    from: SupportedChainId.POLYGON,
    icon: (color?: ThemeColors) => <Polygon color={color} />,
    toChain: SupportedChainId.BNB,
    label: 'Polygon',
  },
}

interface IProps {
  color?: NetworkButtonColor
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
  onUserInput?: (v: BigNumber) => void
  setToChainId: (v: SupportedChainId) => void
}

const getTargetBridgeChain = (fromChain: SupportedChainId) => {
  let toChain

  switch (+fromChain) {
    case SupportedChainId.BNB: {
      toChain = SupportedChainId.ARBITRUM_ONE
      break
    }
    case SupportedChainId.ARBITRUM_ONE: {
      toChain = SupportedChainId.BNB
      break
    }
    case SupportedChainId.MAINNET: {
      toChain = SupportedChainId.BNB
      break
    }
    default: {
      toChain = SupportedChainId.MAINNET
      console.error('Bridge error')
    }
  }

  return toChain
}

const OPTIONS = Object.values(GET_CHAINS)

export const AppGetSwitcher = ({ color = 'main', fromChainId, toChainId, onUserInput, setToChainId }: IProps) => {
  const handleChainSwitch = useHandleChainSwitch()

  const toggleCurrentChain = useCallback(
    (chain: SupportedChainId) => {
      handleChainSwitch(chain, true)
      onUserInput && onUserInput(ZERO)

      setToChainId(getTargetBridgeChain(chain))
    },
    [handleChainSwitch, setToChainId, onUserInput]
  )

  const handleChainChange = useCallback(
    (changeToChain: SupportedChainId) => {
      setToChainId(changeToChain)
    },
    [setToChainId]
  )

  const handleExchange = useCallback(() => {
    handleChainSwitch(toChainId, true)
    onUserInput && onUserInput(ZERO)
    setToChainId(fromChainId)
  }, [fromChainId, handleChainSwitch, toChainId, onUserInput, setToChainId])

  const fromChain = GET_CHAINS[fromChainId]
  const toChain = GET_CHAINS[toChainId]

  const toChainOptions = useMemo(() => {
    return OPTIONS.filter((option) => option.from !== fromChainId)
  }, [fromChainId])

  if (!fromChain || !toChain) {
    return null
  }

  return (
    <Wrapper>
      <NetworkSwitcher color={color} selected={fromChain} options={OPTIONS} onChange={toggleCurrentChain} />

      <Icon src={networkDirectionIcon} onClick={handleExchange} />

      <NetworkSwitcher
        color="green"
        tail="to"
        selected={toChain}
        options={toChainOptions}
        onChange={handleChainChange}
      />
    </Wrapper>
  )
}
