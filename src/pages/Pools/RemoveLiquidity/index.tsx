import { Button } from 'components'
import Modal from 'components/Modal'
import { usePairInfo } from 'pages/Swap/utils'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'

import { LiquidityContext, TransactionLoaderStyled } from '../AddLiquidity'
import { LiquidityHeader } from '../LiquidityHeader'
import { Form } from './RemoveLiquidityForm'

export const RemoveLiquidity = ({ pair = '' }: { pair?: string }) => {
  const { t } = useTranslation()

  const { setPair } = useContext(LiquidityContext)

  const toggle = useToggleModal(ApplicationModal.REMOVE_LIQUIDITY)

  return (
    <Button
      variant="outlined"
      onClick={() => {
        toggle()
        setPair(pair)
      }}
    >
      {t('pools.remove')}
    </Button>
  )
}

export const RemoveLiquidityModel = ({ apr }: { apr?: number }) => {
  const { t } = useTranslation()
  const { pair } = useContext(LiquidityContext)

  const { token0R, token1R } = usePairInfo(pair)

  const inputToken0 = token0R.result?.toString().toLowerCase()
  const inputToken1 = token1R.result?.toString().toLowerCase()

  const open = useModalOpen(ApplicationModal.REMOVE_LIQUIDITY)
  const toggle = useToggleModal(ApplicationModal.REMOVE_LIQUIDITY)

  const isError = token0R.error || token1R.error

  return (
    <Modal
      header={
        <LiquidityHeader
          apr={apr}
          token1={inputToken0}
          token2={inputToken1}
          title={t('pools.removeLiquidity')}
          poolAddress={pair}
        />
      }
      isOpenFlag={open}
      onDismissHandler={() => toggle()}
    >
      {isError ? <TransactionLoaderStyled /> : <Form lp={pair} inputToken0={inputToken0} inputToken1={inputToken1} />}
    </Modal>
  )
}
