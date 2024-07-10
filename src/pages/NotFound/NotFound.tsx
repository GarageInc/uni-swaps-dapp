import { Button, CommonLayout } from 'components'
import { StringWithBR } from 'components/StringWithBR'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PageWrapper = styled.div`
  flex: 1;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
`

const Title = styled.h2`
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.04375rem;

  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 3.1875rem;
  `}
`

export default function NotFound() {
  const { t } = useTranslation()
  const nav = useNavigate()

  return (
    <CommonLayout withoutHeader>
      <PageWrapper>
        <Title>
          <StringWithBR>{t('404.notFound')}</StringWithBR>
        </Title>
        <Button
          onClick={() => {
            nav('/')
          }}
        >
          {t('404.backToHome')}
        </Button>
      </PageWrapper>
    </CommonLayout>
  )
}
