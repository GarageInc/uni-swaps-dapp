import { Button, Stack } from '@mui/material'
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui'
import WarningIcon from 'assets/icons/warning.svg'
import { getTronProvider } from 'hooks/tronweb'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import BG from './bg.png'

const Icon = styled.img`
  width: 2.3125rem;
  height: 2.3125rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.75rem;
    height: 1.75rem;
  `};
`

const RowStyled = styled.div`
  display: flex;
  padding: 1.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  align-self: stretch;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.lightRed} url(${BG}) 0px 0px / 100% 100% no-repeat;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  `};
`

const Text = styled.div`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.125rem;
  `};
`

const TextWarning = styled(Text)`
  text-align: center;
  font-weight: bold;
`

type Props = {
  style?: React.CSSProperties
}

export const TronConnectButton = styled(WalletActionButton)<{
  loading?: boolean
  size?: 'large' | 'medium'
}>`
  border-radius: 3.75rem !important;
  font-family: Helvetica Neue, sans-serif !important;
  font-style: normal !important;
  font-size: 1.5625rem !important;
  font-weight: 400 !important;
  display: inline-flex !important;
  padding: 1.375rem 3rem !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 0.5rem !important;
  box-shadow: none !important;
  transition: all 0.2s ease 0s !important;
  line-height: 110% !important;

  &.adapter-react-button .button-icon,
  &.adapter-react-button .button-icon img {
    display: none;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.0625rem !important;
    padding: 1rem !important;
  `};

  background: ${({ theme }) => theme.dark} !important;
  color: ${({ theme }) => theme.light} !important;

  ${({ loading, theme }) =>
    loading &&
    `
      pointer-events: none !important;
      background: linear-gradient(90deg, #FFECDC, #D2E9FF, #FFECDC) !important;
      background-size: 200% auto !important;
      color: ${theme.text100} !important;
    `}

  ${({ size }) =>
    size === 'medium' &&
    `
      padding: 1rem 3rem !important;
      font-size: 1.375rem !important;
    `}

  &:hover {
    background: ${({ theme }) => theme.dark} !important;
    opacity: 0.8 !important;
    box-shadow: none !important;
  }

  &:disabled {
    opacity: 0.6;
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.light};
    pointer-events: none;
  }

  padding: 1rem 2rem !important;
  background: ${({ theme }) => theme.red} !important;
  height: auto !important;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
  `};
`

const TronMobileButton = styled(Button)<{
  loading?: boolean
  size?: 'large' | 'medium'
}>`
  border-radius: 3.75rem !important;
  font-family: Helvetica Neue, sans-serif !important;
  font-style: normal !important;
  font-size: 1.5625rem !important;
  font-weight: 400 !important;
  display: inline-flex !important;
  padding: 1.375rem 3rem !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 0.5rem !important;
  box-shadow: none !important;
  transition: all 0.2s ease 0s !important;
  line-height: 110% !important;

  &.adapter-react-button .button-icon,
  &.adapter-react-button .button-icon img {
    display: none;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.0625rem !important;
    padding: 1rem !important;
  `};

  background: ${({ theme }) => theme.dark} !important;
  color: ${({ theme }) => theme.light} !important;

  ${({ loading, theme }) =>
    loading &&
    `
      pointer-events: none !important;
      background: linear-gradient(90deg, #FFECDC, #D2E9FF, #FFECDC) !important;
      background-size: 200% auto !important;
      color: ${theme.text100} !important;
    `}

  ${({ size }) =>
    size === 'medium' &&
    `
      padding: 1rem 3rem !important;
      font-size: 1.375rem !important;
    `}

  &:hover {
    background: ${({ theme }) => theme.dark} !important;
    opacity: 0.8 !important;
    box-shadow: none !important;
  }

  &:disabled {
    opacity: 0.6;
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.light};
    pointer-events: none;
  }

  padding: 1rem 2rem !important;
  background: ${({ theme }) => theme.red} !important;
  height: auto !important;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
  `};
`

export const WarningBanner: FC<Props> = ({ style }) => {
  const { t } = useTranslation()

  const provider = getTronProvider(true)

  const isMobile = useIsMobileDevice()

  return (
    <RowStyled style={style}>
      <Stack direction="row" alignItems="start" gap="1rem">
        <Icon src={WarningIcon} alt="warning" />
        <Text>
          {t('TokenSale.WarningBanner.text1')}
          <br />
          {t('TokenSale.WarningBanner.text2')}
        </Text>
      </Stack>

      {isMobile && !provider ? (
        <>
          <TextWarning>{t('TokenSale.WarningBanner.mobileWarning')}</TextWarning>
          <TronMobileButton href="tronlinkoutside://pull.activity?param={}">
            {t('TokenSale.WarningBanner.connect')}
          </TronMobileButton>
        </>
      ) : (
        <TronConnectButton>
          <Text>{t('TokenSale.WarningBanner.open')}</Text>
        </TronConnectButton>
      )}
    </RowStyled>
  )
}
