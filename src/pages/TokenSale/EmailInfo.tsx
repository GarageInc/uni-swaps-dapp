import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import InfoIcon from '../../assets/svg/info.svg'

export const EmailInfo = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Icon src={InfoIcon} alt="info" />
      <span>{t('TokenSale.EmailInfo')}</span>
    </Box>
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

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`
