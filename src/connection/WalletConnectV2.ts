import { WalletConnect, WalletConnectConstructorArgs } from '@web3-react/walletconnect-v2'
import { L1_CHAIN_IDS, L2_CHAIN_IDS } from 'constants/chains'
import { Z_INDEX } from 'theme/zIndex'

import { RPC_URLS } from '../constants/networks'

// Avoid testing for the best URL by only passing a single URL per chain.
// Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(
  (map, [chainId, urls]) => ({
    ...map,
    [chainId]: urls[0],
  }),
  {}
)
export class WalletConnectV2 extends WalletConnect {
  ANALYTICS_EVENT = 'Wallet Connect QR Scan'
  constructor({
    actions,
    defaultChainId,
    qrcode = true,
    onError,
  }: Omit<WalletConnectConstructorArgs, 'options'> & {
    defaultChainId: number
    qrcode?: boolean
  }) {
    const darkmode = false // Boolean(window.matchMedia('(prefers-color-scheme: dark)'))
    super({
      actions,
      options: {
        projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
        chains: [defaultChainId],
        metadata: {
          name: 'xSwap',
          description: 'xSwap Interface',
          url: 'https://xswap.ve/',
          icons: ['https://xswap.ve/favicon.ico'],
        },
        optionalChains: [...L1_CHAIN_IDS, ...L2_CHAIN_IDS],
        showQrModal: qrcode,
        rpcMap: RPC_URLS_WITHOUT_FALLBACKS,
        // as of 6/16/2023 there are no docs for `optionalMethods`
        // this set of optional methods fixes a bug we encountered where permit2 signatures were never received from the connected wallet
        // source: https://uniswapteam.slack.com/archives/C03R5G8T8BH/p1686858618164089?thread_ts=1686778867.145689&cid=C03R5G8T8BH
        optionalMethods: [
          'eth_signTypedData',
          'eth_signTypedData_v4',
          'eth_sign',
          'wallet_switchEthereumChain',
          'wallet_watchAsset',
          'wallet_addEthereumChain',
        ],
        qrModalOptions: {
          desktopWallets: undefined,
          enableExplorer: true,
          explorerExcludedWalletIds: undefined,
          explorerRecommendedWalletIds: undefined,
          mobileWallets: undefined,
          privacyPolicyUrl: undefined,
          termsOfServiceUrl: undefined,
          themeMode: darkmode ? 'dark' : 'light',
          themeVariables: {
            '--wcm-font-family': '"Inter custom", sans-serif',
            '--wcm-z-index': Z_INDEX.modal.toString(),
          },
          walletImages: undefined,
        },
      },
      onError,
    })
  }

  activate(chainId?: number) {
    return super.activate(chainId)
  }
}
