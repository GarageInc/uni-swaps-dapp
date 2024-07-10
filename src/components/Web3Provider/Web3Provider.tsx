import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { connections, getConnection } from 'connection'
import usePrevious from 'hooks/usePrevious'
import { ReactNode, useEffect } from 'react'
import { useConnectedWallets } from 'state/wallets/hooks'

export default function Web3Provider({ children }: { children: ReactNode }) {
  const connectors = connections.map<[Connector, Web3ReactHooks]>(({ hooks, connector }) => [connector, hooks])

  return (
    <Web3ReactProvider connectors={connectors}>
      <Updater />
      {children}
    </Web3ReactProvider>
  )
}

/** A component to run hooks under the Web3ReactProvider context. */
function Updater() {
  const { account, chainId, connector, provider } = useWeb3React()

  // Send analytics events when the active account changes.
  const previousAccount = usePrevious(account)
  const [connectedWallets, addConnectedWallet] = useConnectedWallets()
  useEffect(() => {
    if (account && account !== previousAccount) {
      const walletType = getConnection(connector)?.getProviderInfo().name

      if (!walletType) {
        return
      }

      provider?.send('web3_clientVersion', []).catch((error) => {
        console.warn('Failed to get client version', error)
      })

      // User properties *must* be set before sending corresponding event properties,
      // so that the event contains the correct and up-to-date user properties.

      addConnectedWallet({ account, walletType })
    }
  }, [account, addConnectedWallet, chainId, connectedWallets, connector, previousAccount, provider])

  return null
}
