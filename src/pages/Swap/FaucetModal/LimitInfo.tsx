import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import InfoIcon from '../../../assets/svg/info.svg'
import WarningIcon from '../../../assets/svg/warning.svg'

export const LimitInfo = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Icon src={InfoIcon} alt="info" />
      {t('faucet.limitWarn')}
    </Box>
  )
}

export const MetamaskMobileWarning = () => {
  const { t } = useTranslation()

  return (
    <WarningBox>
      <Icon src={WarningIcon} alt="info" />
      {t('faucet.metamask_in_app_browser')}
    </WarningBox>
  )
}

export const InvalidRefCodeWarning = ({ className }: { className?: string }) => {
  const { t } = useTranslation()

  return (
    <WarningBox className={className}>
      <Icon src={WarningIcon} alt="info" />
      {t('referrals.invalid_code')}
    </WarningBox>
  )
}

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem 1rem;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 133, 255, 0.4);
  color: var(--TEXT-100, #434647);
  font-size: 1rem;
  line-height: 120%; /* 1.2rem */

  ${({ theme }) => theme.mediaWidth.upToTablet`
      padding: 0.875rem 1rem;
      font-size: 0.875rem;
  `};
`

const WarningBox = styled(Box)`
  background-color: #fff3f5;
  border: none;
`

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`
