import '@fancyapps/ui/dist/fancybox/fancybox.css'
import '@reach/dialog/styles.css'
import 'inter-ui'
import 'react-dropdown/style.css'
import 'react-select-search/style.css'
import './i18n'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { TronProviders } from 'components'
import { ApproveProvider } from 'components/Approval/ApproveTx'
import Web3Provider from 'components/Web3Provider/Web3Provider'
import { TronContractProvider } from 'hooks/tronweb'
import { BlockNumberProvider } from 'hooks/useBlockNumber'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MulticallUpdater } from 'state/multicall/updater'

import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import RadialGradientByChainUpdater from './theme/RadialGradientByChainUpdater'
import ThemeProvider, { ThemedGlobalStyle } from './theme/theme'

if (window.ethereum) {
  // @ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

const container = document.getElementById('root') as HTMLElement

createRoot(container).render(
  <StrictMode>
    <TronProviders>
      <TronContractProvider>
        <GoogleOAuthProvider clientId="233861052884-egmm01m61k4u0og25fjsp1embrfrkkbt.apps.googleusercontent.com">
          <Provider store={store}>
            <BrowserRouter>
              <Web3Provider>
                <ApproveProvider>
                  <BlockNumberProvider>
                    <Updaters />
                    <ThemeProvider>
                      <ThemedGlobalStyle />
                      <App />
                    </ThemeProvider>
                  </BlockNumberProvider>
                </ApproveProvider>
              </Web3Provider>
            </BrowserRouter>
          </Provider>
        </GoogleOAuthProvider>
      </TronContractProvider>
    </TronProviders>
  </StrictMode>
)

serviceWorkerRegistration.unregister()
