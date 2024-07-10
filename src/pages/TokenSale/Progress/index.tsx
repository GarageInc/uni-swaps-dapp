import { Stack } from '@mui/material'
import { FlexContainer } from 'components'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { ComponentProps, FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'

import { useMaxDeposit, useTotalDeposit } from '../InfoBlock'
import BG from './bg.jpg'
import { TimeLeftChecker } from './TimeLeftChecker'

type Props = {
  style?: React.CSSProperties
}

const ComingSoonTitle = styled.p`
  color: ${({ theme }) => theme.text100};
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.4rem */
  letter-spacing: -0.02rem;
  margin: 0;
  padding: 0;
`
export const ComingSoon = ({ style }: ComponentProps<'div'>) => {
  const { t } = useTranslation()

  return (
    <Box style={style}>
      <FlexContainer additionalStyles={{ justifyContent: 'center' }}>
        <ComingSoonTitle>{t('TokenSale.comingSoon')}</ComingSoonTitle>
      </FlexContainer>
    </Box>
  )
}

export const Progress: FC<Props> = ({ style }) => {
  const isMobile = useIsMobileDevice()

  const { t, i18n } = useTranslation()

  const { maxDeposit } = useMaxDeposit()

  const { deposit: locked } = useTotalDeposit()

  const left = useMemo(() => {
    return maxDeposit?.sub(locked || ZERO)
  }, [maxDeposit, locked])

  const percentsLocked = useMemo((): number => {
    if (!locked || !maxDeposit || maxDeposit.isZero()) return 0

    return Number.parseFloat(locked?.mul(100).mul(100).div(maxDeposit).toString()) / 10
  }, [locked, maxDeposit])

  return (
    <Box style={style} desktopFSZ={i18n.language === 'vi' ? '1.1875rem' : '1.25rem'}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {!isMobile && <TimeLeftChecker />}
      </Stack>
      <ProgressBar>
        <div style={{ width: `${percentsLocked}%` }} />
      </ProgressBar>
      {isMobile && (
        <Stack alignItems="center" marginTop="1.25rem">
          <TimeLeftChecker />
        </Stack>
      )}
    </Box>
  )
}

const Box = styled.div<{
  desktopFSZ?: string
}>`
  width: 100%;
  padding: 2rem 1.5rem;

  border-radius: 2rem;
  background: ${({ theme }) => theme.inputDefault} url(${BG}) 0px 0px / 100% 100% no-repeat;

  font-size: ${({ desktopFSZ }) => desktopFSZ};
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 0.875rem;
  padding: 1.25rem 1rem;
  border-radius: 1.5rem;
`}
`
const ProgressBar = styled.div`
  width: 100%;
  margin-top: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 2.375rem;
  background: var(--White, #fff);

  ${({ theme }) => theme.mediaWidth.upToTablet`
    height: 0.75rem;
    margin-top: 0.5rem;
  `}

  & > div {
    height: 100%;
    border-radius: 2.375rem;
    background: #d4e9fe;
  }
`

const TokenIcon = styled.img`
  width: 2rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.125rem;
  `}
`
