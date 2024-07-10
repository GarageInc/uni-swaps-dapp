import { Stack } from '@mui/material'
import replaceSvg from 'assets/icons/replace.svg'
import { Button, InfoBlock, Web3ConnectBtn } from 'components'
import { ApproveCheckerSwap, ApproveCheckerWXfi, ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithBalance } from 'components/blocks/AmountInput/AmountInput'
import { IAppToken, TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { Dots } from 'components/Dots'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import Loading from 'components/Loading'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { useWXFIAddress, useXUSDAddress } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useERC20Symbol } from 'hooks/useContractName'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { AdditionalInfo, MAX_PRICE_IMPACT } from './AdditionalInfo'
import { PendingSwapView } from './PendingView'
import { useSwap, useSwapAmountIn, useSwapAmountOut, useSwapTokens } from './utils'

const ExchangeBlock = styled.div`
  position: relative;
  margin: calc(0.75rem / 2) 0;
  cursor: pointer;
`

const AbsoluteSwapIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;
  padding: 1rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.inputGrayStroke};
  background: ${({ theme }) => theme.white};
`

const useAmountsSync = (
  amountInDeb: BigNumber | undefined = ZERO,
  amountOutDeb: BigNumber | undefined = ZERO,
  setAmountIn: any,
  setAmountOut: any,
  tokenIn: string,
  tokenOut: string,
  isWrappedSwap: boolean
) => {
  const [wasChangedFirst, setWasChangedFirst] = useState(false)
  const [wasChangedSecond, setWasChangedSecond] = useState(false)

  const { amount: contractAmountIn, loading: loadingAmountIn } = useSwapAmountIn(amountOutDeb, tokenIn, tokenOut)
  const { amount: contractAmountOut, loading: loadingAmountOut } = useSwapAmountOut(amountInDeb, tokenIn, tokenOut)

  useEffect(() => {
    if (!wasChangedFirst || loadingAmountIn || loadingAmountOut) {
      return
    }

    const tId = setTimeout(() => {
      if (contractAmountOut) {
        setAmountOut((prev: BigNumber | undefined) => {
          if (prev?.eq(contractAmountOut)) {
            return prev
          }

          return contractAmountOut
        })
      } else if (isWrappedSwap) {
        setAmountOut((prev: BigNumber | undefined) => {
          if (prev?.eq(amountInDeb)) {
            return prev
          }

          return amountInDeb
        })
      }

      setWasChangedFirst(false)
    })

    return () => clearTimeout(tId)
  }, [contractAmountOut, setAmountOut, amountInDeb, isWrappedSwap, wasChangedFirst, loadingAmountIn, loadingAmountOut])

  useEffect(() => {
    if (!wasChangedSecond || loadingAmountIn || loadingAmountOut) {
      return
    }

    const tId = setTimeout(() => {
      if (contractAmountIn) {
        setAmountIn((prev: BigNumber | undefined) => {
          if (prev?.eq(contractAmountIn)) {
            return prev
          }

          return contractAmountIn
        })
      } else if (isWrappedSwap) {
        setAmountIn((prev: BigNumber | undefined) => {
          if (prev?.eq(amountOutDeb)) {
            return prev
          }

          return amountOutDeb
        })
      }

      setWasChangedSecond(false)
    })

    return () => clearTimeout(tId)
  }, [contractAmountIn, setAmountIn, amountOutDeb, isWrappedSwap, wasChangedSecond, loadingAmountIn, loadingAmountOut])

  return {
    loadingAmountIn,
    loadingAmountOut,
    setWasChangedFirst,
    setWasChangedSecond,
    wasChangedFirst,
    wasChangedSecond,
  }
}

const getBonusPoints = (amount: BigNumber | undefined) => {
  return amount?.mul(10).div(100)
}

const usePointsAmount = (
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber | undefined,
  amountOut: BigNumber | undefined,
  path: string[] | undefined // TODO: calculate by each path
) => {
  const xUsdAddress = useXUSDAddress()

  const { amount: contractAmountOut, loading: loadingAmountOut } = useSwapAmountOut(amountIn, tokenIn, xUsdAddress)

  return useMemo(() => {
    if (tokenIn === xUsdAddress) {
      return {
        points: getBonusPoints(amountIn),
        loading: false,
      }
    }

    if (tokenOut === xUsdAddress) {
      return {
        points: getBonusPoints(amountOut),
        loading: false,
      }
    }

    if (loadingAmountOut) {
      return {
        points: ZERO,
        loading: true,
      }
    }

    if (path && path.some((p) => p.toLowerCase() === xUsdAddress.toLowerCase())) {
      return {
        points: getBonusPoints(contractAmountOut)?.mul(2),
        loading: false,
      }
    }

    return {
      points: ZERO,
      loading: false,
    }
  }, [tokenIn, tokenOut, amountIn, amountOut, path, xUsdAddress, contractAmountOut, loadingAmountOut])
}

export default function SwapBlock({ slippage }: { slippage?: number | string }) {
  const { t } = useTranslation()

  const { account } = useActiveWeb3React()

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
  } = useSwapTokens()

  const {
    pending,
    action,
    txInfo,
    calledWallet,
    path,
    loadingPath,
    isWrappedSwap,
    iswXfiToXfi,
    isError,
    loadingReserves,
    priceChange,
    loadingExpectedOut,
    redactedExpectedAmountOutPerOne,
  } = useSwap(tokenIn, tokenOut, amountIn, amountOut, setPendingTx, slippage)

  const { loadingAmountIn, loadingAmountOut, setWasChangedFirst, setWasChangedSecond } = useAmountsSync(
    amountIn,
    amountOut,
    setAmountIn,
    setAmountOut,
    tokenIn,
    tokenOut,
    isWrappedSwap
  )

  const wxfiToken = useWXFIAddress()
  const { symbol: symbolFirst, loading: loadingSymbolFirst } = useERC20Symbol(tokenIn === 'xfi' ? wxfiToken : tokenIn)
  const { symbol: symbolSecond, loading: loadingSymbolSecond } = useERC20Symbol(
    tokenOut === 'xfi' ? wxfiToken : tokenOut
  )

  const ConfirmBlock = useMemo(() => {
    return (
      <ConfirmInWalletBlock calledWallet={calledWallet}>
        {noValue ? (
          <Button disabled={noValue}>{t('Swap.enterAmount')}</Button>
        ) : (
          <Button onClick={action} disabled={isError || pending}>
            <FormActionBtn
              pending={pending}
              txInfo={txInfo}
              labelActive={t('Swap.swap')}
              labelInProgress={t('Swap.swapInProgress')}
            />
          </Button>
        )}
      </ConfirmInWalletBlock>
    )
  }, [calledWallet, noValue, t, action, isError, pending, txInfo])

  const handleInputFirst = useCallback(
    (v?: BigNumber) => {
      setAmountIn(v)

      if (!v || (v?.isZero && v.isZero())) {
        setAmountOut(ZERO)
      }

      setWasChangedFirst(true)
    },
    [setAmountIn, setAmountOut, setWasChangedFirst]
  )

  const handleInputSecond = useCallback(
    (v?: BigNumber) => {
      setAmountOut(v)

      if (!v || (v?.isZero && v.isZero())) {
        setAmountIn(ZERO)
      }

      setWasChangedSecond(true)
    },
    [setAmountIn, setAmountOut, setWasChangedSecond]
  )

  const { points: pointsAmount, loading: loadingPoints } = usePointsAmount(
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    path?.Path
  )

  const onSwapTokens = useCallback(() => {
    setTokenIn(tokenOut)
    setTokenOut(tokenIn)
    setWasChangedFirst(true)
  }, [tokenIn, tokenOut, setTokenIn, setTokenOut, setWasChangedFirst])

  const handleTokenChangeFirst = useCallback(
    (addressOrSymbol: string) => {
      setTokenIn(addressOrSymbol)
      setWasChangedFirst(true)
    },
    [setTokenIn, setWasChangedFirst]
  )

  const handleTokenChangeSecond = useCallback(
    (addressOrSymbol: string) => {
      setTokenOut(addressOrSymbol)
      setWasChangedSecond(true)
    },
    [setTokenOut, setWasChangedSecond]
  )

  if (pendingTx) {
    return (
      <PendingSwapView
        onBack={() => setPendingTx('')}
        hash={pendingTx}
        txInfo={txInfo}
        assetIn={tokenInModel as IAppToken}
        assetOut={tokenOutModel as IAppToken}
        pointsAmount={pointsAmount}
        priceChange={priceChange}
        slippage={slippage}
        path={path?.Path || []}
      />
    )
  }

  const pathError = !isWrappedSwap ? path?.Error : undefined

  return (
    <>
      <Stack>
        <AmountInputWithBalance
          inputValue={amountIn}
          setInputValue={handleInputFirst}
          disabled={loadingAssets}
          rightTokenOptions={tokensInList as any[]}
          rightToken={tokenInModel as any}
          onChangeRightToken={handleTokenChangeFirst}
          showBalanceRow={!!account}
        />

        <ExchangeBlock onClick={onSwapTokens}>
          <AbsoluteSwapIcon src={replaceSvg} />
        </ExchangeBlock>

        <AmountInputWithBalance
          inputValue={amountOut}
          setInputValue={handleInputSecond}
          disabled={loadingAssets || loadingAmountOut}
          rightToken={tokenOutModel as any}
          rightTokenOptions={tokensOutList as any[]}
          onChangeRightToken={handleTokenChangeSecond}
          validateBalanceExceedsZero={false}
          showBalanceRow={!!account}
        />
      </Stack>

      {pathError && amountIn && !amountIn.isZero() && <WarningBlock text={pathError} />}

      {!account ? (
        <Web3ConnectBtn as={Button} theme="dark" />
      ) : loadingAmountIn || loadingAmountOut || loadingPath ? (
        <Button disabled>
          <Dots>{t('Swap.loadingBestPath')}</Dots>
        </Button>
      ) : noValue || pathError ? (
        <Button disabled={noValue}>{t('Swap.enterAmount')}</Button>
      ) : tokenIn && tokenIn === TokenSymbol.xfi ? (
        ConfirmBlock
      ) : isWrappedSwap ? (
        iswXfiToXfi ? (
          <ApproveCheckerWXfi border={amountIn || ZERO} token={tokenIn}>
            {ConfirmBlock}
          </ApproveCheckerWXfi>
        ) : (
          ConfirmBlock
        )
      ) : (
        <ApproveCheckerSwap border={amountIn || ZERO} token={tokenIn}>
          {ConfirmBlock}
        </ApproveCheckerSwap>
      )}

      {priceChange.gte(MAX_PRICE_IMPACT) && (
        <WarningBlock
          text={`${t('Swap.priceImpactWarn1')} (${formatDecimal(priceChange, 2, 0)}%).  ${t('Swap.priceImpactWarn2')}`}
        />
      )}

      {pointsAmount && !loadingPoints && (
        <InfoBlock suggestionText={t('Swap.pointsInfo')}>
          +{formatDecimal(pointsAmount, 2)} {t('Swap.points')}
        </InfoBlock>
      )}

      {account && (
        <Loading loading={loadingSymbolFirst || loadingSymbolSecond || loadingExpectedOut || loadingReserves}>
          <AdditionalInfo
            symbolFirst={symbolFirst}
            symbolSecond={symbolSecond}
            decimalsOut={tokenOutModel?.decimals}
            expectedAmountOut={redactedExpectedAmountOutPerOne}
            slippage={slippage}
            priceChange={priceChange}
            txInfo={txInfo}
            path={path?.Path}
          />
        </Loading>
      )}
    </>
  )
}
