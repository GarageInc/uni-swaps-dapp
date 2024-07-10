import Loading from 'components/Loading'
import { RowGapped } from 'components/Row'
import { ITxTemplateInfo, useEstimatesGasValue } from 'components/TransactionInfo/TransactionInfo'
import { useMemo } from 'react'
import { formatDecimal } from 'utils/numberWithCommas'

export const useTxEstimatedGasValue = (txInfo?: ITxTemplateInfo) => {
  const estimatedGas = useEstimatesGasValue(txInfo)

  const [integer, decimals] = useMemo(() => {
    return estimatedGas && txInfo ? formatDecimal(estimatedGas, 2, 5).split('.') : [0, 0]
  }, [estimatedGas, txInfo])

  return [integer, decimals]
}

export const FormActionBtn = ({
  pending,
  labelInProgress,
  labelActive,
}: {
  pending: boolean
  txInfo?: ITxTemplateInfo
  labelActive: string
  labelInProgress: string
}) => {
  return (
    <Loading loading={pending} loadingLabel={labelInProgress}>
      <RowGapped justify="center" gap="10px">
        {labelActive}
      </RowGapped>
    </Loading>
  )
}
