import { useWeb3React } from '@web3-react/core'
import { MouseoverTooltipContent } from 'components'
import { SupportedChainId } from 'constants/chainsinfo'
import { useERC20Symbol } from 'hooks/useContractName'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { shortenAddress } from 'utils'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

import ArrowDown from '../../../assets/icons/arrow-down.svg'
import CopyIcon from '../../../assets/icons/copy.svg'
import FrameIcon from '../../../assets/icons/frame.svg'
import { usePair } from '../utils'

const Container = styled.div`
  display: flex;
  padding: 0.375rem 0.75rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.inputDefault};
  cursor: pointer;
`

const TokenLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.divStroke};
`

const Text = styled.span`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  position: relative;
  top: 0.15rem;
  color: ${({ theme }) => theme.text100};
`

const ChainLinkArrow = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`

const DotLinePlaceholder = styled.div`
  flex: 1;
  height: 1px;
  border-bottom: 1px dashed ${({ theme }) => theme.text30};
  min-width: 1rem;
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: fit-content;
`

const PairedTokens = styled.div`
  display: flex;
  & > *:nth-child(2) {
    margin-left: -0.5rem;
  }
`
const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 1rem;
`

const TransactionLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const TransactionAddress = styled.div`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  position: relative;
  top: 0.1rem;
`

const TransactionIConBtn = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`

const TransactionRightSide = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3125rem;
  height: 1rem;
`

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.88rem;
`

const TransactionsDivider = styled.div`
  background-color: rgba(67, 70, 71, 0.1);
  height: 1px;
  width: 100%;
`

interface IChainLinkProps {
  pair: [string, string | undefined]
  isFirst: boolean
  isLast: boolean
  mode: string
}

const Transaction = ({
  symbol,
  address,
  mode,
  children,
}: {
  address?: string
  symbol?: string
  mode: string
  children?: any
}) => {
  const { chainId = SupportedChainId.XFI_TESTNET } = useWeb3React()
  const [showCopy, setShowCopy] = useState(false)

  const tokenAsset = useTokenAsset(address)

  const copyToClipboard = useCallback(() => {
    if (!address) {
      return
    }

    navigator.clipboard.writeText(address)
    setShowCopy(true)
    setTimeout(() => {
      setShowCopy(false)
    }, 1000)
  }, [address])

  return (
    <TransactionContainer>
      <TransactionLeftSide>
        {mode === 'single' ? (
          <>
            <TokenLogo src={tokenAsset?.icon} />
          </>
        ) : (
          children
        )}

        {address && <TransactionAddress>{shortenAddress(address, 2)}</TransactionAddress>}
      </TransactionLeftSide>

      <TransactionRightSide>
        <MouseoverTooltipContent onCLose={() => setShowCopy(false)} placement="bottom" show={showCopy} content="copied">
          <TransactionIConBtn onClick={copyToClipboard} src={CopyIcon} />
        </MouseoverTooltipContent>

        <TransactionIConBtn
          src={FrameIcon}
          onClick={() => {
            window.open(getExplorerLink(chainId, address, ExplorerDataType.ADDRESS), '_blank')
          }}
        />
      </TransactionRightSide>
    </TransactionContainer>
  )
}

export const ChainLink = ({ isFirst, isLast, mode, pair }: IChainLinkProps) => {
  const { pair: pairAddress } = usePair(pair[0], pair[1])

  const token0 = pair[0]
  const token1 = pair[1]

  const [show, setShow] = useState(false)

  const { symbol: symbolFirst } = useERC20Symbol(token0)
  const { symbol: symbolSecond } = useERC20Symbol(token1)

  const pairSymbol = `${symbolFirst}-${symbolSecond}`

  const open = useCallback(() => {
    setShow(true)
  }, [])

  const close = useCallback(() => {
    setShow(false)
  }, [])

  const assetFirst = useTokenAsset(token0)
  const assetSecond = useTokenAsset(token1)

  const TooltipContent = useMemo(() => {
    if (mode === 'single') {
      return <Transaction mode="single" symbol={symbolFirst} address={token0} />
    }

    return (
      <TransactionsList>
        <Transaction mode="double" symbol={pairSymbol} address={pairAddress}>
          <PairedTokens>
            <TokenLogo src={assetFirst?.icon} />
            <TokenLogo src={assetSecond?.icon} />
          </PairedTokens>
        </Transaction>

        <TransactionsDivider />

        <Transaction mode="single" address={token0} symbol={symbolFirst} />
        <Transaction mode="single" address={token1} symbol={symbolSecond} />
      </TransactionsList>
    )
  }, [assetFirst, assetSecond, mode, pairAddress, pairSymbol, symbolFirst, symbolSecond, token0, token1])

  return (
    <Wrap>
      {!isFirst && <DotLinePlaceholder />}
      <MouseoverTooltipContent placement="bottom-start" open={open} close={close} show={show} content={TooltipContent}>
        <Container onClick={open}>
          {mode === 'single' ? (
            <>
              <TokenLogo src={assetFirst?.icon} />
              <Text>{symbolFirst}</Text>
            </>
          ) : (
            <PairedTokens>
              <TokenLogo src={assetFirst?.icon} />
              <TokenLogo src={assetSecond?.icon} />
            </PairedTokens>
          )}
          <ChainLinkArrow src={ArrowDown} />
        </Container>
      </MouseoverTooltipContent>
      {!isLast && <DotLinePlaceholder />}
    </Wrap>
  )
}
