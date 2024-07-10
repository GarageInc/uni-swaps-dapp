import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useWeb3React } from '@web3-react/core'
import { HeaderIconSvg } from 'components/Header/HeaderIcon'
import StatusIcon, { SmallIconPosition } from 'components/Identicon/StatusIcon'
import { getConnection } from 'connection'
import { useConnectionReady } from 'connection/eagerlyConnect'
import { ConnectionMeta, getPersistedConnectionMeta, setPersistedConnectionMeta } from 'connection/meta'
import { Paths } from 'constants/paths'
import { useActiveWeb3React } from 'hooks/web3'
import { TronConnectButton } from 'pages/TokenSale/TronInfoBar/WarningBanner'
import { ReactElement, useEffect, useMemo, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import { ApplicationModal } from 'state/application/actions'
import { TransactionDetails } from 'state/transactions/types'
import styled from 'styled-components'

import ArrowDownIcon from '../../assets/icons/arrow-down.svg'
import { ReactComponent as MeatamaskIcon } from '../../assets/svg/metamask.svg'
import WalletSVG from '../../assets/svg/wallet.svg'
import WalletLightSVG from '../../assets/svg/wallet_light.svg'
import useENSName from '../../hooks/useENSName'
import { useHasSocks } from '../../hooks/useSocksBalance'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { shortenAddress, shortenString } from '../../utils'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal/WalletModal'

const Web3StatusConnect = styled.button`
  color: ${({ theme }) => theme.text100};
  font-family: 'Helvetica Neue', sans-serif;

  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.0125rem;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Web3StatusConnected = styled.div<{ pending: boolean }>`
  display: flex;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
  position: relative;
`

const Text = styled.p`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.0125rem;
  text-transform: uppercase;
  margin: 0;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
  `};
`

const Icon = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.75rem;
  transition: transform 0.3s ease;
  transform-origin: 50% 50%;
  position: absolute;
  top: -0.3rem;
  left: -2rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: .875em;
    height: .875rem;
    margin-right: .38rem;
  `};

  svg {
    height: 100%;
    width: 100%;
  }
`

const ArrowDown = styled(animated.img)`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  position: relative;
  top: -0.15rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.38rem;
  `};
`

const WalletWrapper = styled.div`
  position: relative;
`

const WalletIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`

const StyledTronConnectButton = styled(TronConnectButton)`
  color: ${({ theme }) => theme.text100} !important;
  font-family: Helvetica Neue !important;
  font-size: 1.25rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 120% !important;
  letter-spacing: -0.0125rem !important;
  text-transform: uppercase !important;
  background: none !important;
  border: none !important;
  padding: 0 !important;
  cursor: pointer !important;

  &:hover {
    background: none !important;
  }
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Sock() {
  return (
    <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
      🧦
    </span>
  )
}

export function StatusIconWrapper({
  size,
  smallIconPosition = 'right',
}: {
  size: number
  smallIconPosition?: SmallIconPosition
}) {
  const { account, connector } = useActiveWeb3React()
  if (isMobile || !account) {
    return null
  }

  const connection = getConnection(connector)

  return <StatusIcon account={account} connection={connection} size={size} smallIconPosition={smallIconPosition} />
}

function Web3StatusInner({ text, className }: IWebStatus) {
  const { account, connector } = useActiveWeb3React()

  const { t } = useTranslation()

  const { ENSName, loading: ENSLoading } = useENSName(account)
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)

  const rotateAnimation = useSpring({
    transform: walletModalOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    config: {
      duration: 200,
    },
  })

  const connectionReady = useConnectionReady()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()

  const connection = getConnection(connector)

  // Display a loading state while initializing the connection, based on the last session's persisted connection.
  // The connection will go through three states:
  // - startup:       connection is not ready
  // - initializing:  account is available, but ENS (if preset on the persisted initialMeta) is still loading
  // - initialized:   account and ENS are available
  // Subsequent connections are always considered initialized, and will not display startup/initializing states.
  const initialConnection = useRef(getPersistedConnectionMeta())
  const isConnectionInitializing = Boolean(
    initialConnection.current?.address === account && initialConnection.current?.ENSName && ENSLoading
  )
  const isConnectionInitialized = connectionReady && !isConnectionInitializing
  // Clear the initial connection once initialized so it does not interfere with subsequent connections.
  useEffect(() => {
    if (isConnectionInitialized) {
      initialConnection.current = undefined
    }
  }, [isConnectionInitialized])
  // Persist the connection if it changes, so it can be used to initialize the next session's connection.
  useEffect(() => {
    if (account || ENSName) {
      const meta: ConnectionMeta = {
        type: connection.type,
        address: account,
        ENSName: ENSName ?? undefined,
      }
      setPersistedConnectionMeta(meta)
    }
  }, [ENSName, account, connection.type])

  const location = useLocation()

  const { address: tronAddress } = useWallet()

  const isSalePage = location.pathname === Paths.TOKEN_SALE

  const toggleWalletModal = useWalletModalToggle()

  if (isSalePage) {
    if (tronAddress) {
      return (
        <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
          <>
            <Text>{shortenString(tronAddress)}</Text>
          </>
        </Web3StatusConnected>
      )
    } else {
      return (
        <StyledTronConnectButton>
          <Text>{t('Header.connect')}</Text>
        </StyledTronConnectButton>
      )
    }
  }

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        <HeaderIconSvg
          src={MeatamaskIcon}
          width="1.5rem"
          height="1.5rem"
          additionalStyles={{ marginRight: '0.75rem', position: 'relative', top: '-0.15rem' }}
        />
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>
              {pending?.length} <>Pending</>
            </Text>{' '}
            <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {hasSocks ? <Sock /> : null}
            <Text>{ENSName || shortenAddress(account)}</Text>
            <ArrowDown style={rotateAnimation} src={ArrowDownIcon} />
          </>
        )}
      </Web3StatusConnected>
    )
  } else {
    return <Web3ConnectBtn className={className} />
  }
}

export const Web3ConnectBtn = ({
  className,
  as: El = Web3StatusConnect,
  theme = 'light',
}: {
  className?: string
  as?: any
  theme?: 'light' | 'dark'
}) => {
  const toggleWalletModal = useWalletModalToggle()
  const { t } = useTranslation()

  return (
    <El className={className} id="connect-wallet" onClick={toggleWalletModal}>
      {isMobile ? (
        <WalletIcon src={theme === 'light' ? WalletSVG : WalletLightSVG} />
      ) : (
        <Text>{t('Header.connect')}</Text>
      )}
    </El>
  )
}

interface IWebStatus {
  text?: ReactElement
  className?: string
}

export default function Web3Status({ text, className }: IWebStatus) {
  const { account } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  return (
    <WalletWrapper>
      <Web3StatusInner text={text} className={className} />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </WalletWrapper>
  )
}
