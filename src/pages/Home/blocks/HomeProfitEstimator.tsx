import { Button, FlexContainer, GradientBox } from 'components'
import { BigNumber } from 'ethers'
import { useAnimatedInputValue } from 'hooks/useAnimatedInput'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'
const Container = styled(GradientBox)`
  background: linear-gradient(90deg, rgba(210, 233, 255, 0.5) -9.67%, rgba(255, 236, 220, 0.5) 109.48%);
  margin-top: 2.5rem;
  text-align: left;
  padding: 10rem 11.63rem 10.62rem 7.81rem;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  gap: 6.37rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  border-radius: 1.5rem;
  padding: 2.5rem 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  flex-direction: column;
  gap: 2.5rem;
  `}
`

const Title = styled.h2`
  font-size: 4.375rem;
  color: ${({ theme }) => theme.text100};
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.04375rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.5rem;
  line-height: 120%; /* 1.8rem */
  letter-spacing: -0.015rem;
  `}
`

const Description = styled.p`
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 120%; /* 2.1rem */
  color: ${({ theme }) => theme.text60};
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-right: 10rem;
  margin-bottom: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  font-style: normal;
  margin-right: -0.4rem;
  `}
`

const ProfitEstimator = styled.div`
  display: flex;
  width: 31.6875rem;
  height: 24.5rem;
  padding: 2.5rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.text60};
  background: rgba(255, 255, 255, 0.1);
  ${({ theme }) => theme.mediaWidth.upToTablet`
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: 1.5rem;
  height: fit-content;
  `}
`

const EstimatorTitle = styled.h3`
  color: ${({ theme }) => theme.text100};
  font-size: 1.875rem;
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
const EstimatorBlock = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.text50};
  background: rgba(255, 255, 255, 0.2);
`

const EstimatorBlockTitle = styled.p`
  color: ${({ theme }) => theme.text50};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 0.875rem;
  line-height: 110%;
  `}
`
const EstimatorBlockInput = styled.input<{ value: string; isMobile: boolean }>`
  /* Make the input transparent and remove borders */
  background-color: transparent;
  border: none;
  padding: 0;

  /* Remove input controls */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Adjust width based on value length */

  /* Other styles */
  color: ${({ theme }) => theme.text100};
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 550;
  line-height: 120%; /* 2.1rem */
  letter-spacing: 0.0625rem;
  margin: 0;
  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  `}
`
const EstimatorBlockCurrency = styled.div`
  color: ${({ theme }) => theme.text40};
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 550;
  line-height: 120%; /* 2.1rem */
  letter-spacing: 0.0625rem;
  margin: 0;
  position: absolute;
  left: 0;
  pointer-events: none;

  span {
    opacity: 0;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  `}
`
const InfoContainer = styled.div`
  width: 55rem;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  width: fit-content;
  `}
`

const DEFAULT = BigNumber.from(500)

export const HomeProfitEstimator = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useIsMobileDevice()
  const { value, setNumberValue, convertedValue, ref, inputRef } = useAnimatedInputValue(ZERO, 0, DEFAULT)

  const handleChange = useCallback(
    (e: any) => {
      const newValue = e.target.value.trim() // Remove leading and trailing spaces
      if (!isNaN(newValue) || newValue === '' || newValue === '.') {
        setNumberValue(newValue === '' ? '' : newValue)
      }
    },
    [setNumberValue]
  )

  return (
    <Container>
      <InfoContainer>
        <Title>{t('Home.joinTitle')}</Title>
        <Description>{t('Home.joinSubtext')}</Description>
        {!isMobile && (
          <Button
            onClick={() => {
              navigate('/token-sale')
            }}
            size="large"
            style={{
              marginTop: '3.5rem',
            }}
          >
            {t('Home.invest')}
          </Button>
        )}
      </InfoContainer>
      <ProfitEstimator>
        <EstimatorTitle>{t('Home.profitEstimator')}</EstimatorTitle>
        <FlexContainer additionalStyles={{ flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
          <EstimatorBlock>
            <EstimatorBlockTitle>{t('Home.youContribute')}</EstimatorBlockTitle>
            <FlexContainer
              ref={ref}
              additionalStyles={{ justifyContent: 'flex-start', gap: '0.5rem', position: 'relative' }}
            >
              <EstimatorBlockInput
                ref={inputRef}
                type="text"
                value={value === undefined ? '' : String(value)}
                onChange={handleChange}
                placeholder="0.00"
                isMobile={!!isMobile}
              />
              <EstimatorBlockCurrency>
                <span>{!value ? '0.00' : String(value)} </span>
                USDT
              </EstimatorBlockCurrency>
            </FlexContainer>
          </EstimatorBlock>
          <EstimatorBlock>
            <EstimatorBlockTitle>{t('Home.yourProfit')}</EstimatorBlockTitle>
            <FlexContainer additionalStyles={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
              <EstimatorBlockInput
                readOnly
                type="text"
                value={`$${formatDecimal(convertedValue.mul(3), 2, 0)}`}
                isMobile={!!isMobile}
              />
            </FlexContainer>
          </EstimatorBlock>
        </FlexContainer>
      </ProfitEstimator>
      {isMobile && (
        <Button
          onClick={() => {
            navigate('/token-sale')
          }}
          style={{
            height: '3.25rem',
            fontSize: '1.0625rem',
          }}
        >
          {t('Home.invest')}
        </Button>
      )}
    </Container>
  )
}
