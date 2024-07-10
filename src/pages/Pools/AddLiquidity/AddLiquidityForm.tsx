import { Button, Web3ConnectBtn } from 'components'
import { ApproveCheckerSwap, ApproveContext, ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithBalance } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { AutoColumn } from 'components/Column'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { useWXFIAddress } from 'constants/app-contracts'
import { ZERO_ADDRESS } from 'constants/misc'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { useAddLiquiditySwap, useLiquidityTokens } from 'pages/Swap/utils'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'

import { AddLiquidityInfo, useLockedInPool } from '../InfoBox'
import { AddLiquidityProgress, StepStatus } from './AddLIqudityProgress'
import { PendingAddLiquidityView } from './PendingView'

const WarningBlockStyled = styled(WarningBlock)`
  margin-bottom: 1rem;
`

export function Form({ inputToken0, inputToken1 }: { inputToken0?: string; inputToken1?: string }) {
  const {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    setPendingTx,
    noValue,
    pendingTx,
    tokenInModel,
    tokenOutModel,
    setAmountIn,
    setAmountOut,
    tokensInList,
    setTokenIn,
    tokensOutList,
    loadingAssets,
    setTokenOut,

    loadingReserves,
    reserves,
    pair,
  } = useLiquidityTokens(inputToken0, inputToken1)

  const wxfiToken = useWXFIAddress()

  const isWXfiIn = inputToken0 === wxfiToken
  const isWXfiOut = inputToken1 === wxfiToken

  console.log('inputToken0', isWXfiIn, inputToken0)

  const tokensFirstList = useMemo(() => {
    return isWXfiIn
      ? tokensInList.filter((item) => {
          return (
            item.address?.toLowerCase() === wxfiToken ||
            item.address?.toLowerCase() === inputToken0?.toLowerCase() ||
            item.address === TokenSymbol.xfi
          )
        })
      : []
  }, [inputToken0, isWXfiIn, tokensInList, wxfiToken])

  const tokensSecondList = useMemo(() => {
    return isWXfiOut
      ? tokensOutList.filter((item) => {
          return (
            item.address?.toLowerCase() === wxfiToken ||
            item.address?.toLowerCase() === inputToken1?.toLowerCase() ||
            item.address === TokenSymbol.xfi
          )
        })
      : []
  }, [inputToken1, isWXfiOut, tokensOutList, wxfiToken])

  const { t } = useTranslation()

  const [wasChangedFirst, setWasChangedFirst] = useState(false)
  const [wasChangedSecond, setWasChangedSecond] = useState(false)

  const { approved, pending: pendingApproval } = useContext(ApproveContext)

  const { pending, action, isError, txInfo, calledWallet, path, loadingPath, isXfiIn, isXfiOut } = useAddLiquiditySwap(
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    setPendingTx
  )

  const approveSteps = useMemo(() => {
    const statusFirst =
      !amountIn || amountIn.isZero()
        ? StepStatus.PENDING
        : approved[tokenInModel.address]
        ? StepStatus.COMPLETE
        : pendingApproval[tokenInModel.address]
        ? StepStatus.PENDING
        : StepStatus.CURRENT

    const statusSecond =
      statusFirst === StepStatus.PENDING || statusFirst === StepStatus.CURRENT
        ? StepStatus.PENDING
        : approved[tokenOutModel.address]
        ? StepStatus.COMPLETE
        : pendingApproval[tokenOutModel.address]
        ? StepStatus.PENDING
        : StepStatus.CURRENT

    if (isXfiIn) {
      return [
        {
          name: t('pools.approve') + ' ' + tokenOutModel.symbol,
          status: statusSecond,
        },
        {
          name: t('pools.provideLiquidity'),
          status: statusSecond === StepStatus.COMPLETE ? StepStatus.CURRENT : StepStatus.PENDING,
        },
      ]
    }

    if (isXfiOut) {
      return [
        {
          name: t('pools.approve') + ' ' + tokenInModel.symbol,
          status: statusFirst,
        },
        {
          name: t('pools.provideLiquidity'),
          status: statusFirst === StepStatus.COMPLETE ? StepStatus.CURRENT : StepStatus.PENDING,
        },
      ]
    }

    return [
      {
        name: t('pools.approve') + ' ' + tokenInModel.symbol,
        status: statusFirst,
      },
      {
        name: t('pools.approve') + ' ' + tokenOutModel.symbol,
        status: statusSecond,
      },
      {
        name: t('pools.provideLiquidity'),
        status:
          statusFirst === StepStatus.COMPLETE && statusSecond === StepStatus.COMPLETE
            ? StepStatus.CURRENT
            : StepStatus.PENDING,
      },
    ]
  }, [
    amountIn,
    approved,
    pendingApproval,
    t,
    tokenInModel.address,
    tokenInModel.symbol,
    tokenOutModel.address,
    tokenOutModel.symbol,
    isXfiIn,
    isXfiOut,
  ])

  useEffect(() => {
    if (!wasChangedFirst) {
      return
    }

    const tId = setTimeout(() => {
      if (reserves && tokenIn && tokenOut) {
        const reservesFirst = reserves[(tokenIn === TokenSymbol.xfi ? wxfiToken : tokenIn).toLowerCase()]
        const reservesSecond = reserves[(tokenOut === TokenSymbol.xfi ? wxfiToken : tokenOut).toLowerCase()]

        if (amountIn && reservesSecond && reservesFirst) {
          const amountOutNew = amountIn.mul(reservesSecond).div(reservesFirst)
          setAmountOut((prev) => {
            if (prev?.eq(amountOutNew)) {
              return prev
            }

            return amountOutNew
          })
        }
      } else {
        if (!amountIn) {
          setAmountOut(undefined)
        }
      }
      setWasChangedSecond(false)
    })

    return () => clearTimeout(tId)
  }, [amountIn, reserves, tokenIn, tokenOut, setAmountIn, setAmountOut, wxfiToken, wasChangedFirst])

  useEffect(() => {
    if (!wasChangedSecond) {
      return
    }

    const tId = setTimeout(() => {
      if (amountOut && reserves && tokenIn && tokenOut) {
        const reservesFirst = reserves[(tokenIn === TokenSymbol.xfi ? wxfiToken : tokenIn).toLowerCase()]
        const reservesSecond = reserves[(tokenOut === TokenSymbol.xfi ? wxfiToken : tokenOut).toLowerCase()]

        if (amountOut && reservesSecond && reservesFirst) {
          const amountInNew = amountOut.mul(reservesFirst).div(reservesSecond)
          setAmountIn((prev) => {
            if (prev?.eq(amountInNew)) {
              return prev
            }

            return amountInNew
          })
        }
      } else {
        if (!amountOut) {
          setAmountIn(undefined)
        }
      }
      setWasChangedFirst(false)
    })

    return () => clearTimeout(tId)
  }, [amountOut, reserves, tokenIn, tokenOut, setAmountIn, setAmountOut, wxfiToken, wasChangedSecond])

  const setInputFirst = useCallback(
    (v?: BigNumber) => {
      setAmountIn(v)
      setWasChangedFirst(true)
    },
    [setAmountIn]
  )

  const setInputSecond = useCallback(
    (v?: BigNumber) => {
      setAmountOut(v)
      setWasChangedSecond(true)
    },
    [setAmountOut]
  )

  const data = useLockedInPool(pair, tokenInModel.address, tokenOutModel.address, ZERO)

  const { account } = useActiveWeb3React()

  if (pendingTx) {
    return (
      <AutoColumn
        gap=".5rem"
        style={{
          margin: '1.5rem 0',
        }}
      >
        <PendingAddLiquidityView
          onBack={() => setPendingTx('')}
          hash={pendingTx}
          token0={tokenInModel}
          token1={tokenOutModel}
          lpAddress={pair}
          amount0={amountIn}
          amount1={amountOut}
        />
      </AutoColumn>
    )
  }

  const ConfirmBlock = (
    <ConfirmInWalletBlock calledWallet={calledWallet}>
      {noValue ? (
        <Button disabled={noValue}>{t('pools.enterAmount')}</Button>
      ) : (
        <Button onClick={action} disabled={isError || loadingPath}>
          <FormActionBtn
            pending={pending || loadingPath}
            txInfo={txInfo}
            labelActive={t('pools.addLiquidity')}
            labelInProgress={t('pools.adding')}
          />
        </Button>
      )}
    </ConfirmInWalletBlock>
  )

  return (
    <>
      <AutoColumn
        gap=".5rem"
        style={{
          margin: '1.5rem 0',
        }}
      >
        <AddLiquidityInfo data={data} token1={tokenInModel} token2={tokenOutModel} />

        <AmountInputWithBalance
          showBalanceRow={!!account}
          inputValue={amountIn}
          setInputValue={setInputFirst}
          disabled={loadingAssets || loadingReserves}
          rightToken={tokenInModel as any}
          rightTokenOptions={tokensFirstList as any[]}
          onChangeRightToken={setTokenIn}
        />

        <AmountInputWithBalance
          showBalanceRow={!!account}
          inputValue={amountOut}
          setInputValue={setInputSecond}
          disabled={loadingAssets || loadingReserves}
          rightToken={tokenOutModel as any}
          rightTokenOptions={tokensSecondList as any[]}
          onChangeRightToken={setTokenOut}
          validateBalanceExceedsZero={false}
        />
      </AutoColumn>

      {pair && pair === ZERO_ADDRESS && <WarningBlockStyled text={t('pools.pairDoesntExist')} />}

      {path?.Error && amountIn && !amountIn.isZero() ? <WarningBlockStyled text={path?.Error} /> : null}

      {!account ? (
        <Web3ConnectBtn as={Button} theme="dark" />
      ) : isXfiIn ? (
        <ApproveCheckerSwap border={amountOut || ZERO} token={tokenOut}>
          {ConfirmBlock}
        </ApproveCheckerSwap>
      ) : isXfiOut ? (
        <ApproveCheckerSwap border={amountIn || ZERO} token={tokenIn}>
          {ConfirmBlock}
        </ApproveCheckerSwap>
      ) : (
        <ApproveCheckerSwap border={amountIn || ZERO} token={tokenIn}>
          <ApproveCheckerSwap border={amountOut || ZERO} token={tokenOut}>
            {ConfirmBlock}
          </ApproveCheckerSwap>
        </ApproveCheckerSwap>
      )}

      <AddLiquidityProgress steps={approveSteps} />
    </>
  )
}
