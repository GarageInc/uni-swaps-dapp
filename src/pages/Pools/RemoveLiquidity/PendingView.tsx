import { Button } from 'components'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { IRemoveLiquiditySnapshot } from 'pages/Swap/utils'
import { useTranslation } from 'react-i18next'
import { useIsTransactionPending } from 'state/transactions/hooks'

import { RemoveLiqudityInfo } from '../AddLiquidity/LiquidityInfo'

export const PendingRemoveLiquidityView = ({
  onBack,
  hash,
  txSnapshot,
  lpAddress,
}: {
  onBack: () => void
  hash: string
  txSnapshot: IRemoveLiquiditySnapshot
  lpAddress: string
}) => {
  const { t } = useTranslation()

  const {
    token0,
    token1,
    data: { willReceive0, willReceive1 },
  } = txSnapshot

  const isPending = useIsTransactionPending(hash)

  return (
    <TxStatusView hash={hash}>
      <RemoveLiqudityInfo
        lpAddress={lpAddress}
        token0={token0}
        token1={token1}
        willReceive0={willReceive0}
        willReceive1={willReceive1}
        isPending={isPending}
      />
      <Button
        style={{
          marginTop: '1rem',
          width: '100%',
        }}
        onClick={onBack}
      >
        {t('transactionStatus.close')}
      </Button>
    </TxStatusView>
  )
}
