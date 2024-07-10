import { IAppToken } from 'components/blocks/AmountInput/useAppCoins'
import { ITxTemplateInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'

import { TotalInfo } from './AdditionalInfo'

export const PendingSwapView = ({
  onBack,
  hash,
  txInfo,
  assetIn,
  assetOut,
  pointsAmount,
  priceChange,
  slippage,
  path,
}: {
  onBack: () => void
  hash: string
  txInfo?: ITxTemplateInfo
  assetIn?: IAppToken
  assetOut?: IAppToken
  pointsAmount?: BigNumber
  priceChange: BigNumber
  slippage?: number | string
  path?: string[]
}) => {
  return (
    <TxStatusView hash={hash} onBack={onBack}>
      <TotalInfo
        assetIn={assetIn}
        assetOut={assetOut}
        pointsAmount={pointsAmount}
        priceChange={priceChange}
        slippage={slippage}
        txInfo={txInfo}
        path={path}
      />
    </TxStatusView>
  )
}
