import { ExternalProvider } from '@ethersproject/providers'
import { Connector } from '@web3-react/types'
import { deprecatedNetworkConnection, networkConnection, walletConnectV2Connection } from 'connection'
import { CHAIN_INFO, SupportedChainId } from 'constants/chainsinfo'
import { RPC_URLS } from 'constants/networks'
import { utils } from 'ethers'

import { getExplorerLink } from './getExplorerLink'

interface SwitchNetworkArguments {
  connector: Connector
  provider: ExternalProvider
  chainId: SupportedChainId
}

function getRpcUrls(chainId: SupportedChainId): [string] {
  if (RPC_URLS[chainId]) {
    return [RPC_URLS[chainId][0]]
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints')
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ connector, provider, chainId }: SwitchNetworkArguments): Promise<null | void> {
  if (!provider.request) {
    return
  }
  const formattedChainId = utils.hexValue(chainId) // hexStripZeros(BigNumber.from(chainId).toHexString());

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    })
  } catch (error: any) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if (error?.code === 4902 || chainId) {
      const info = CHAIN_INFO[chainId]
      const addChainParameter = {
        chainId: formattedChainId,
        chainName: info.label,
        rpcUrls: getRpcUrls(chainId),
        nativeCurrency: info.nativeCurrency,
        blockExplorerUrls: [getExplorerLink(chainId)],
      }

      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [addChainParameter],
        })
      } catch (e) {
        console.log('Can not call wallet_addEthereumChain', e)
      }

      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }],
        })
      } catch (error) {
        console.debug('Added network but could not switch chains', error)
      }

      try {
        if (
          [
            walletConnectV2Connection.connector,
            networkConnection.connector,
            deprecatedNetworkConnection.connector,
          ].includes(connector)
        ) {
          await connector.activate(chainId)
        } else {
          await connector.activate(addChainParameter)
        }
      } catch {
        // In activating a new chain, the connector passes through a deactivated state.
        // If we fail to switch chains, it may remain in this state, and no longer be usable.
        // We defensively re-activate the connector to ensure the user does not notice any change.
        try {
          await connector.activate()
        } catch (error) {
          console.error('Failed to re-activate connector', error)
        }
        throw error
      }
    } else {
      throw error
    }
  }
}
