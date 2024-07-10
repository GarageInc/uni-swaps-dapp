import { Button } from 'components'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
import { useTranslation } from 'react-i18next'

import { ILiquidityToken } from '../InfoBox'
import { LiqudityInfo } from './LiquidityInfo'

export const PendingAddLiquidityView = ({
  onBack,
  hash,
  token0,
  token1,
  lpAddress,
  amount0,
  amount1,
}: {
  onBack: () => void
  hash: string
  token0: ILiquidityToken
  token1: ILiquidityToken
  lpAddress: string
  amount0?: BigNumber
  amount1?: BigNumber
}) => {
  const { t } = useTranslation()

  return (
    <TxStatusView hash={hash}>
      <LiqudityInfo lpAddress={lpAddress} token0={token0} token1={token1} amount0={amount0} amount1={amount1} />

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
