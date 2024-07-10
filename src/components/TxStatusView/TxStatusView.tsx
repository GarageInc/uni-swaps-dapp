import { Button, TransactionLoader } from 'components'
import { ColumnCenter } from 'components/Column'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsTransactionPending } from 'state/transactions/hooks'
import styled, { css } from 'styled-components'
import { rotate } from 'theme/components'

const TokenBadge = styled.div<{ animated: boolean }>`
  margin-bottom: 16px;
  ${({ animated }) =>
    animated
      ? css`
          animation: 2s ${rotate} linear infinite;
        `
      : ''}
`

const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const ColumnCenterStyled = styled(ColumnCenter)`
  justify-content: center;
  gap: 16px;
`

type Props = PropsWithChildren<{
  isLoading?: boolean
  hash: string
  onBack?: () => void
}>

export const TxStatusView: FC<Props> = ({ isLoading = false, hash, children, onBack }) => {
  const { t } = useTranslation()

  const isPending = useIsTransactionPending(hash)
  const isInProcess = isLoading || isPending

  return (
    <ColumnCenterStyled>
      <TransactionLoader done={!isInProcess} />

      {children}

      {!isInProcess && onBack && (
        <Button onClick={onBack} size="medium" style={{ width: '100%' }}>
          {t('transactionStatus.close')}
        </Button>
      )}
    </ColumnCenterStyled>
  )
}
