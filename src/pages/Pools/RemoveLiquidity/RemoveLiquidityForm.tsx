import { Button, Web3ConnectBtn } from 'components'
import { ApproveCheckerSwap, ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithBalance } from 'components/blocks/AmountInput/AmountInput'
import { AutoColumn } from 'components/Column'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { ZERO_ADDRESS } from 'constants/misc'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { useRemoveLiquidity, useRemoveLiquidityTokens } from 'pages/Swap/utils'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal, getPrecision } from 'utils/numberWithCommas'

import { RemoveLiquidityInfo } from '../InfoBox'
import { PendingRemoveLiquidityView } from './PendingView'

const WarningBlockStyled = styled(WarningBlock)`
  margin-bottom: 1rem;
`

export function Form({ lp, inputToken0, inputToken1 }: { lp: string; inputToken0?: string; inputToken1?: string }) {
  const { t } = useTranslation()

  const {
    tokenIn,
    tokenOut,
    amountIn,
    setPendingTx,
    noValue,
    pendingTx,
    pairModel,
    setAmountIn,
    tokenInModel,
    tokenOutModel,
    pair,
  } = useRemoveLiquidityTokens(inputToken0, inputToken1, lp)

  const { pending, action, isError, txInfo, calledWallet, path, loadingPath, txSnapshot, data } = useRemoveLiquidity(
    pair,
    tokenInModel,
    tokenOutModel,
    amountIn,
    setPendingTx
  )

  const setInputFirst = useCallback(
    (v?: BigNumber) => {
      setAmountIn(v)
    },
    [setAmountIn]
  )

  const { account } = useActiveWeb3React()

  const info = useMemo(() => {
    return `${formatDecimal(data.willReceive0, getPrecision(tokenInModel.decimals), tokenInModel.decimals)} ${
      tokenInModel.symbol
    } | ${formatDecimal(data.willReceive1, getPrecision(tokenOutModel.decimals), tokenOutModel.decimals)} ${
      tokenOutModel.symbol
    }`
  }, [data, tokenInModel, tokenOutModel])

  if (pendingTx) {
    return (
      <AutoColumn
        gap=".5rem"
        style={{
          margin: '1.5rem 0',
        }}
      >
        <PendingRemoveLiquidityView
          lpAddress={pair}
          txSnapshot={txSnapshot}
          onBack={() => setPendingTx('')}
          hash={pendingTx}
        />
      </AutoColumn>
    )
  }

  return (
    <>
      <AutoColumn
        gap=".5rem"
        style={{
          margin: '1.5rem 0',
        }}
      >
        <RemoveLiquidityInfo data={data} token1={tokenInModel} token2={tokenOutModel} />
        <AmountInputWithBalance
          inputValue={amountIn}
          setInputValue={setInputFirst}
          tokenBadgeVariant="pair"
          rightToken={pairModel as any}
          additionalInfo={info}
        />
      </AutoColumn>

      {pair && pair === ZERO_ADDRESS && <WarningBlockStyled text={t('pools.pairDoesntExist')} />}

      {path?.Error && amountIn && !amountIn.isZero() ? <WarningBlockStyled text={path?.Error} /> : null}

      {!account ? (
        <Web3ConnectBtn as={Button} theme="dark" />
      ) : (
        <ApproveCheckerSwap border={amountIn || ZERO} token={pair}>
          <ConfirmInWalletBlock calledWallet={calledWallet}>
            {noValue ? (
              <Button disabled={noValue}>{t('pools.enterAmount')}</Button>
            ) : (
              <Button onClick={action} disabled={isError || loadingPath}>
                <FormActionBtn
                  pending={pending || loadingPath}
                  txInfo={txInfo}
                  labelActive={t('pools.removeLiquidity')}
                  labelInProgress={t('pools.removing')}
                />
              </Button>
            )}
          </ConfirmInWalletBlock>
        </ApproveCheckerSwap>
      )}
    </>
  )
}
