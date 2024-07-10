import AccountDetails from 'components/AccountDetails'
import { connections, deprecatedNetworkConnection, networkConnection } from 'connection'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { isSupportedChain } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import Modal from '../Modal'
import ConnectionErrorView from './ConnectionErrorView'
import Option from './Option'
import PendingView from './PendingView'

const Arrow2 = styled.div`
  font-family: 'Font Awesome 6 Pro';
  font-weight: normal;
  font-size: 22px;
  padding: 8px 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text100};

  border-radius: 10px;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  color: ${({ theme }) => theme.text100};
`

const UpperSection = styled.div`
  position: relative;
  margin-top: 2rem;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
  `};
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  // important that these are destructed from the account-specific web3-react context
  const { chainId, account, connector } = useActiveWeb3React()

  const { activationState } = useActivationState()
  const fallbackProviderEnabled = true
  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  useEffect(() => {
    if (chainId && isSupportedChain(chainId) && connector !== networkConnection.connector) {
      if (fallbackProviderEnabled) {
        networkConnection.connector.activate(chainId)
      } else {
        deprecatedNetworkConnection.connector.activate(chainId)
      }
    }
  }, [chainId, connector, fallbackProviderEnabled])

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && connector && connector !== connectorPrevious) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, connector, walletModalOpen, connectorPrevious])

  if (account && walletView === WALLET_VIEWS.ACCOUNT) {
    return (
      <AccountDetails
        isOpen={walletModalOpen}
        toggleWalletModal={toggleWalletModal}
        pendingTransactions={pendingTransactions}
        confirmedTransactions={confirmedTransactions}
        ENSName={ENSName}
        openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
      />
    )
  }

  return (
    <Modal
      header={
        walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow>
            <Arrow2
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              <></>
            </Arrow2>
          </HeaderRow>
        ) : (
          <HeaderRow>Connect wallet</HeaderRow>
        )
      }
      isOpenFlag={walletModalOpen}
      onDismissHandler={toggleWalletModal}
      minHeight={false}
      maxHeight={90}
    >
      <UpperSection>
        {walletView === WALLET_VIEWS.PENDING ? (
          <PendingView error={pendingError} reset={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
        ) : (
          <>
            {activationState.status === ActivationStatus.ERROR ? (
              <ConnectionErrorView />
            ) : (
              <OptionGrid data-testid="option-grid">
                {connections
                  .filter((connection) => connection.shouldDisplay())
                  .map((connection) => (
                    <Option key={connection.getProviderInfo().name} connection={connection} />
                  ))}
              </OptionGrid>
            )}
          </>
        )}
      </UpperSection>
    </Modal>
  )
}
