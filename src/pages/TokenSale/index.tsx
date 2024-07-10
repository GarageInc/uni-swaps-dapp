import '@tronweb3/tronwallet-adapter-react-ui/style.css'

import { Stack } from '@mui/material'
import { useLocalStorage } from '@tronweb3/tronwallet-adapter-react-hooks'
import { Button, CommonLayout, Suggestion, TransactionLoader } from 'components'
import { BigNumber } from 'ethers'
import { useAnimatedInputValue } from 'hooks/useAnimatedInput'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useSavedRefCode } from 'hooks/useSavedRefCode'
import { useYandexMetrikaHit } from 'hooks/useYandexMetrika'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'

import { InfoBlock } from './InfoBlock'
import { ProfitEstimator } from './ProfitEstimator'
import { Progress } from './Progress'
import { ReferralModal } from './ReferralModal'
import SaleForm, { TX_STATE } from './SaleForm'
import { Statistic } from './Statistic'
import { Card, Container, PageTitle, PageWrapper, Title } from './styled'
import { TronInfoBar } from './TronInfoBar'
import { VideoGuides } from './VideoGuides'

export default function TokenSale() {
  return <Layout />
}

const ButtonClose = styled(Button)``

const Layout = () => {
  useYandexMetrikaHit()

  const { refCode, isCodeAvailable, refContract, loading, setRefCode, checkCode } = useSavedRefCode()

  return (
    <RefLayout
      refCode={refCode}
      isCodeAvailable={isCodeAvailable}
      refContract={refContract}
      loading={loading}
      setRefCode={setRefCode}
      checkCode={checkCode}
    />
  )
}

const RefLayout = ({
  refCode,
  isCodeAvailable,
  refContract,
  setRefCode,
  loading,
  checkCode,
}: {
  refCode: string
  isCodeAvailable: boolean
  refContract: any
  setRefCode: (code: string) => void
  loading: boolean
  checkCode: (code: string) => Promise<boolean>
}) => {
  const [showReferralModal, setShowReferralModal] = useLocalStorage<boolean>('SHOR_REFERRAL_MODAL', true)
  const [isClosedManually, setIsClosedManually] = useLocalStorage<boolean>('SHOR_REFERRAL_MODAL_CLOSED', false)
  const { t, i18n } = useTranslation()

  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState<TX_STATE>(TX_STATE.UNKNOWN)

  const isMobile = useIsMobileDevice()

  const [amount, setAmount] = useState<BigNumber | undefined>()

  const { setBnValue, convertedValue, ref } = useAnimatedInputValue(amount || ZERO, 6, ZERO)

  const handleAmountChange = useCallback(
    (v: BigNumber) => {
      setAmount(v)
      setBnValue(v || ZERO)
    },
    [setBnValue, setAmount]
  )

  const onOpenHandler = useCallback(() => {
    setShowReferralModal(true)
  }, [setShowReferralModal])

  const onCloseManually = useCallback(() => {
    setIsClosedManually(true)
  }, [setIsClosedManually])

  const onCloseHandler = useCallback(() => setShowReferralModal(false), [setShowReferralModal])

  const alreadyHasActiveRefCode = isCodeAvailable

  console.log('isCodeAvailable', isCodeAvailable, refCode)

  return (
    <CommonLayout>
      <PageWrapper>
        {isMobile && <PageTitle>{t('TokenSale.TokenSale')}</PageTitle>}

        <TronInfoBar
          style={{
            alignSelf: 'stretch',
            marginBottom: '1.25rem',
          }}
        />

        <Progress
          style={{
            marginBottom: '1.25rem',
          }}
        />

        <Stack direction={isMobile ? 'column-reverse' : 'row'} gap="1.25rem" alignItems="stretch" width="100%">
          <Container>
            <Stack direction={isMobile ? 'column' : 'row'} gap="1.25rem">
              <Card ref={ref} gap="16px">
                {!isMobile && <Title>{t('TokenSale.TokenSale')}</Title>}
                {pending || success !== TX_STATE.UNKNOWN ? (
                  <>
                    <TransactionLoader done={success === TX_STATE.SUCCESS} error={success === TX_STATE.ERROR} />

                    <InfoBlock />

                    {success && (
                      <ButtonClose
                        onClick={() => {
                          setSuccess(TX_STATE.UNKNOWN)
                          setPending(false)
                        }}
                        size="medium"
                      >
                        {t('TokenSale.close')}
                      </ButtonClose>
                    )}
                  </>
                ) : (
                  <SaleForm
                    pending={pending}
                    setAmount={handleAmountChange}
                    amount={amount}
                    setPending={setPending}
                    setSuccess={setSuccess}
                    refCode={refCode}
                    isCodeAvailable={isCodeAvailable}
                    refContract={refContract}
                    loading={loading}
                  />
                )}
              </Card>

              <Stack
                minWidth={isMobile ? 'auto' : i18n.language === 'en' ? '24.8125rem;' : '28.0625rem'}
                justifyContent="flex-start"
                gap="1.25rem"
              >
                <Card>
                  <Title
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {t('TokenSale.ProfitEstimator')}
                    <Suggestion>{t('TokenSale.ProfitSuggestion')}</Suggestion>
                  </Title>
                  <ProfitEstimator
                    tokenIcon="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                    tokenVal={convertedValue}
                    usdVal={convertedValue.mul(3)}
                    isCodeAvailable={alreadyHasActiveRefCode}
                  />
                  {!alreadyHasActiveRefCode ? (
                    <WantMore>
                      {t('referrals.wantMore_1')}&nbsp;
                      <button onClick={() => setShowReferralModal(true)}>{t('referrals.wantMore_2')}</button>&nbsp;
                      {t('referrals.wantMore_3')}
                    </WantMore>
                  ) : null}
                  <ReferralModal
                    open={showReferralModal}
                    onClose={onCloseHandler}
                    onOpen={onOpenHandler}
                    refCode={refCode}
                    loading={loading}
                    setRefCode={setRefCode}
                    isClosedManually={isClosedManually}
                    onClosedManually={onCloseManually}
                    checkCode={checkCode}
                  />
                </Card>
                <Statistic />
              </Stack>
            </Stack>
          </Container>
        </Stack>

        <Container>
          <VideoGuides marginTop={isMobile ? '4rem' : '6.5rem'} />
        </Container>
      </PageWrapper>
    </CommonLayout>
  )
}

const WantMore = styled.p`
  margin: 0;
  margin-top: 1rem;
  color: ${({ theme }) => theme.black};
  line-height: 120%; /* 1.2rem */
  font-size: 14px;

  button {
    font-size: 14px;
    display: inline;
    border: none;
    background: none;
    color: ${({ theme }) => theme.blue};
    font-weight: 550;
    cursor: pointer;
    padding: 0;
  }
`
