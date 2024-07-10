import { useLocalStorage } from '@tronweb3/tronwallet-adapter-react-hooks'
import { CommonLayout, FlexContainer } from 'components'
import { CardCentered } from 'components/Card'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useYandexMetrikaHit } from 'hooks/useYandexMetrika'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSwapToolsStore } from 'stores/useSwapStore'
import styled from 'styled-components'

import FaucetIcon from '../../assets/svg/faucet.svg'
import GearIcon from '../../assets/svg/gear.svg'
import QuestionIcon from '../../assets/svg/question.svg'
import { FaucetModal } from './FaucetModal'
import SwapBlock from './SwapBlock'
import { Tools } from './Tools'
import { Icon, RoundedButton } from './Tools/styles'

const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;

  display: flex;
`

const Card = styled(CardCentered)`
  width: 100%;
  gap: 1.5rem;
  padding: 2rem 1.5rem;
`

const Title = styled.h2`
  font-size: 1.875rem;
  font-family: 'Helvetica Neue', sans-serif;

  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.5rem;
  letter-spacing: -0.015rem;
  `}
`

const Main = styled.div`
  width: 34.75rem;
  position: relative;
  margin-top: 6.5rem;
  ${({ theme }) =>
    theme.mediaWidth.upToTablet`
    width: 100%;
    transition: all ease-in-out 300ms;
  `}
`

export default function Swap() {
  useYandexMetrikaHit()

  const { t } = useTranslation()

  const mainRef = useRef<HTMLDivElement | null>(null)
  const [slippage, setSlippage] = useLocalStorage<number | undefined | string>('SWAP_SLIPPAGE', 0.3)

  const { setCurrentTool, setIsFaucetModalOpen } = useSwapToolsStore()
  const isMobile = useIsMobileDevice()
  useEffect(() => {
    if (!isMobile && mainRef.current) {
      mainRef.current.style.transform = 'translateX(0)'
    }
  }, [isMobile])

  return (
    <CommonLayout>
      <PageWrapper>
        <Main ref={mainRef}>
          <Card>
            <FlexContainer>
              <Title>{t('Swap.swap')}</Title>
              {isMobile && (
                <FlexContainer additionalStyles={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <RoundedButton
                    onClick={() => {
                      setIsFaucetModalOpen(true)
                    }}
                  >
                    <Icon src={FaucetIcon} />
                  </RoundedButton>
                  <RoundedButton
                    onClick={() => {
                      if (mainRef.current) {
                        mainRef.current.style.transform = 'translateX(calc(-100% - 1rem))'
                      }
                      setCurrentTool('slippage')
                    }}
                  >
                    <Icon src={GearIcon} />
                  </RoundedButton>
                  <RoundedButton
                    onClick={() => {
                      if (mainRef.current) {
                        mainRef.current.style.transform = 'translateX(calc(-100% - 1rem))'
                      }
                      setCurrentTool('help')
                    }}
                  >
                    <Icon src={QuestionIcon} />
                  </RoundedButton>
                </FlexContainer>
              )}
            </FlexContainer>
            <SwapBlock slippage={slippage} />
          </Card>
          <FaucetModal />
          <Tools slippage={slippage} onSlippageChange={setSlippage} mainRef={mainRef} />
        </Main>
      </PageWrapper>
    </CommonLayout>
  )
}
