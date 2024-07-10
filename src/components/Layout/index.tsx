import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui'
import { BodyWrapper } from 'components/BodyWrapper'
import { GradientBox } from 'components/GradientBox'
import Header from 'components/Header/Header'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled(GradientBox)`
  padding: 3.25rem 6.25rem;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    background: none;
    border-radius: 0;
    padding: 1rem;
  `}
`
function ScrollToTopOnMount() {
  useEffect(() => {
    document.body.scrollTo(0, 0)
  }, [])

  return null
}

export const TronProviders = ({ children }: { children: React.ReactNode }) => {
  const onError = useCallback((e: any) => {
    console.error(e)
  }, [])
  return (
    <WalletProvider onError={onError}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  )
}

export const CommonLayout = ({
  children,
  withoutHeader = false,
}: {
  children: React.ReactNode
  withoutHeader?: boolean
}) => {
  return (
    <>
      <Layout>
        <ScrollToTopOnMount />
        <BodyWrapper>
          <Container>
            {!withoutHeader && <Header />}
            {children}
          </Container>
        </BodyWrapper>
      </Layout>
    </>
  )
}
