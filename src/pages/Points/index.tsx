import { Stack } from '@mui/material'
import { CommonLayout } from 'components'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Description } from './Description'
import { PointsStats } from './PointsStats'
import { PointsTable } from './Table'

const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;

  display: flex;
`

const Title = styled.h2`
  font-size: 2.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 3.375rem */
  letter-spacing: -0.02813rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 2.1875rem;
  `}
`

const Main = styled.div`
  margin-top: 5.88rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-top: 3.01rem;
  `}
`

export default function Points() {
  const isMobile = useIsMobileDevice()

  const { t } = useTranslation()

  return (
    <CommonLayout>
      <PageWrapper>
        <Main>
          <Title>{t('Points.title')}</Title>
          <Stack direction="row" alignItems="flex-start" marginTop={isMobile ? '1.06rem' : '2.31rem'} gap="1rem">
            <Stack flex="1" gap={isMobile ? '2.5rem' : '1.5rem'}>
              <Stack gap=".5rem">
                <PointsStats />
                {isMobile && <Description />}
              </Stack>

              <PointsTable />
            </Stack>
            {!isMobile && <Description />}
          </Stack>
        </Main>
      </PageWrapper>
    </CommonLayout>
  )
}
