import { Button, TransactionLoader } from 'components'
import Modal from 'components/Modal'
import { usePairInfo } from 'pages/Swap/utils'
import { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import styled from 'styled-components'

import { LiquidityHeader } from '../LiquidityHeader'
import { Form } from './AddLiquidityForm'

const DEFAULT_PAIR = '0xb18dd6f1e5a4ce76ea71a6163bdbf80e8af002d8'

export const TransactionLoaderStyled = styled(TransactionLoader)`
  margin: 2.5rem 0;
`

export const LiquidityContext = createContext({
  pair: '',
  setPair: (pair: string) => {
    console.error('setPair function is not defined')
  },
})

export const AddLiquidity = ({ pair = DEFAULT_PAIR }: { pair?: string }) => {
  const { t } = useTranslation()

  const { setPair } = useContext(LiquidityContext)

  const toggle = useToggleModal(ApplicationModal.ADD_LIQUIDITY)

  return (
    <Button
      onClick={() => {
        toggle()
        setPair(pair)
      }}
    >
      {t('pools.add')}
    </Button>
  )
}

export const AddLiquidityModel = ({ apr }: { apr?: number }) => {
  const { t } = useTranslation()
  const { pair } = useContext(LiquidityContext)

  const { token0R, token1R } = usePairInfo(pair)

  const isError = token0R.error || token1R.error

  const inputToken0 = token0R.result?.toString().toLowerCase()
  const inputToken1 = token1R.result?.toString().toLowerCase()

  const open = useModalOpen(ApplicationModal.ADD_LIQUIDITY)
  const toggle = useToggleModal(ApplicationModal.ADD_LIQUIDITY)

  return (
    <Modal
      header={
        <LiquidityHeader
          apr={apr}
          token1={inputToken0}
          token2={inputToken1}
          title={t('pools.addLiquidity')}
          poolAddress={pair}
        />
      }
      isOpenFlag={open}
      onDismissHandler={() => toggle()}
    >
      {isError ? <TransactionLoaderStyled /> : <Form inputToken0={inputToken0} inputToken1={inputToken1} />}
    </Modal>
  )
}
