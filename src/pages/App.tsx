import './App.scss'

import { IconsContext, TokenLogoLookupTable } from 'components/AssetLogo/token-logo-lookup'
import Loader from 'components/Loader'
import Popups from 'components/Popups'
import { useReferralCodeFromParams } from 'hooks/useSavedRefCode'
import { Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import ErrorBoundary from '../components/ErrorBoundary'
import { Paths } from '../constants/paths'
import Home from './Home/Home'
import NotFound from './NotFound/NotFound'
import Points from './Points'
import Pools from './Pools/Pools'
import { ReactQueryProvider } from './react-query-provider'
import Swap from './Swap/Swap'
import TokenSale from './TokenSale'

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: ${({ theme }) => theme.text100};
`

const iconsLookup = new TokenLogoLookupTable()

export default function App() {
  useReferralCodeFromParams()

  return (
    <CookiesProvider>
      <ErrorBoundary>
        <ReactQueryProvider withDevtools={true}>
          <AppWrapper>
            <Popups />
            <Content />
          </AppWrapper>
        </ReactQueryProvider>
      </ErrorBoundary>
    </CookiesProvider>
  )
}

const Content = () => {
  return (
    <IconsContext.Provider value={iconsLookup}>
      <AppRoutes />
    </IconsContext.Provider>
  )
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={Paths.SWAP} element={<Swap />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
        <Route path={Paths.DEFAULT} element={<Home />} />
        <Route path={Paths.POOLS} element={<Pools />} />
        <Route path={Paths.TOKEN_SALE} element={<TokenSale />} />
        <Route path={Paths.POINTS} element={<Points />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  )
}
