import { TransactionResponse } from '@ethersproject/providers'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import {
  usePoolContract,
  useUniswapRouter,
  useUniswapV2Factory,
  useUSDTAddress,
  useWXFIAddress,
  useWXfiContract,
} from 'constants/app-contracts'
import { ZERO_ADDRESS } from 'constants/misc'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useApiCall } from 'hooks/useApiCall'
import { useERC20Symbol } from 'hooks/useContractName'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useActiveWeb3React } from 'hooks/web3'
import { ILiquidityResults, ILiquidityToken, useLockedInPool } from 'pages/Pools/InfoBox'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { BN_1E18, ZERO } from 'utils/isZero'

const API_URL = 'https://api-xswap.dapp-devs.com'

interface IPathResponse {
  Path: string[]
  Error?: string
}

const ONE_WEY = '1'

const useGetSwapPath = (
  token0?: string,
  token1?: string,
  amountIn = ONE_WEY
): {
  result?: IPathResponse
  pending: boolean
} => {
  const wxfiAddress = useWXFIAddress()

  const url = useMemo(() => {
    const targetIn = token0 === TokenSymbol.xfi ? wxfiAddress : token0
    const targetOut = token1 === TokenSymbol.xfi ? wxfiAddress : token1

    if (!targetIn || !targetOut) {
      return ''
    }

    return `${API_URL}/get_path?token0=${targetIn}&token1=${targetOut}&amount_in=${amountIn?.toString()}`
  }, [token0, token1, amountIn, wxfiAddress])

  const { data, isLoading } = useApiCall<IPathResponse>(url)

  return {
    result: data,
    pending: isLoading,
  }
}

export interface ISwapToken {
  address: string
  data: {
    name: string
    symbol: string
    decimals: number
  }
}

const XFI_API_MODEL = {
  address: TokenSymbol.xfi,
  data: {
    name: 'XFI',
    symbol: 'XFI',
    decimals: 18,
  },
}

export const useSwapTokensList = (): {
  result?: ISwapToken[]
  pending: boolean
} => {
  const { data, isLoading } = useApiCall<
    {
      address: string
      data: {
        name: string
        symbol: string
        decimals: number
      }
    }[]
  >(`${API_URL}/get_tokens_data`)

  return useMemo(() => {
    return {
      result: data ? [...data, XFI_API_MODEL] : [],
      pending: isLoading,
    }
  }, [data, isLoading])
}

const getTheoreticalPrice = (
  price?: BigNumber,
  expectedAmount?: BigNumber,
  amountIn?: BigNumber,
  divider?: BigNumber
) => {
  if (!price || !expectedAmount || !amountIn) {
    return ZERO
  }

  const theoreticalCost = divider ? price.mul(amountIn).div(divider) : price.mul(amountIn)

  if (theoreticalCost.isZero()) {
    return ZERO
  }

  const priceChange = theoreticalCost.mul(100).sub(expectedAmount.mul(100)).div(theoreticalCost)
  return priceChange
}

export const useSwap = (
  tokenIn?: string,
  tokenOut?: string,
  amountIn: BigNumber = ZERO,
  amountOut: BigNumber = ZERO,
  setPendingTx?: (txHash: string) => void,
  slippage?: number | string
) => {
  const contract = useUniswapRouter()
  const wXfiContract = useWXfiContract()
  const wXfiAddress = useWXFIAddress()

  const { account = '' } = useActiveWeb3React()

  const { result: path, pending } = useGetSwapPath(tokenIn, tokenOut)

  const isXfiToWxfi = tokenIn === TokenSymbol.xfi && tokenOut?.toLowerCase() === wXfiAddress?.toLowerCase()
  const iswXfiToXfi = tokenIn?.toLowerCase() === wXfiAddress?.toLowerCase() && tokenOut === TokenSymbol.xfi
  const isWrappedSwap = isXfiToWxfi || iswXfiToXfi

  const pair = usePair(tokenIn, tokenOut)

  const { loading: loadingReserves, mapped } = useReserves(pair.pair)

  const dataFunc = useCallback(
    async (clickedByUser: any) => {
      const deadline = getDeadline()

      if (!isWrappedSwap && !path?.Path) return

      if (isXfiToWxfi) {
        return {
          ...(await wXfiContract?.populateTransaction.deposit()),
          value: amountIn,
        }
      }

      if (iswXfiToXfi) {
        return await wXfiContract?.populateTransaction.withdraw(amountIn)
      }

      if (tokenIn === TokenSymbol.xfi && path?.Path) {
        return {
          ...(await contract?.populateTransaction.swapExactETHForTokens(
            getAmountSlippage97(amountOut, slippage ? +slippage : undefined),
            path?.Path,
            account,
            deadline
          )),
          value: amountIn,
        }
      }

      if (tokenOut === TokenSymbol.xfi && path?.Path) {
        return await contract?.populateTransaction.swapExactTokensForETH(
          amountIn,
          getAmountSlippage97(amountOut, slippage ? +slippage : undefined),
          path?.Path,
          account,
          deadline
        )
      }

      if (!path?.Path) return

      return await contract?.populateTransaction.swapExactTokensForTokens(
        amountIn,
        getAmountSlippage97(amountOut, slippage ? +slippage : undefined),
        path?.Path,
        account,
        deadline
      )
    },
    [
      contract,
      amountIn,
      amountOut,
      path?.Path,
      account,
      wXfiContract,
      isWrappedSwap,
      isXfiToWxfi,
      iswXfiToXfi,
      tokenIn,
      tokenOut,
      slippage,
    ]
  )

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx && setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  const mappedReserves = mapped

  const { amount: expectedAmountOutPerOne, loading: loadingExpectedOut } = useSwapAmountOut(BN_1E18, tokenIn, tokenOut)

  const redactedExpectedAmountOutPerOne = useMemo(() => {
    if (isWrappedSwap) {
      return BN_1E18
    }

    return expectedAmountOutPerOne
  }, [expectedAmountOutPerOne, isWrappedSwap])

  const wxfiToken = useWXFIAddress()

  const priceChange = useMemo(() => {
    if (!mappedReserves || !amountIn || !amountOut || !redactedExpectedAmountOutPerOne) {
      return getTheoreticalPrice(redactedExpectedAmountOutPerOne, amountOut, amountIn, BN_1E18)
    }

    const reservesFirst = mappedReserves[(tokenIn === TokenSymbol.xfi ? wxfiToken : tokenIn || '').toLowerCase()]
    const reservesSecond = mappedReserves[(tokenOut === TokenSymbol.xfi ? wxfiToken : tokenOut || '').toLowerCase()]

    if (!reservesFirst || !reservesSecond || reservesSecond.isZero() || reservesFirst.isZero() || amountIn.isZero()) {
      return getTheoreticalPrice(redactedExpectedAmountOutPerOne, amountOut, amountIn, BN_1E18)
    }

    return getTheoreticalPrice(reservesSecond, amountOut, amountIn, reservesFirst)
  }, [mappedReserves, amountIn, amountOut, redactedExpectedAmountOutPerOne, tokenIn, tokenOut, wxfiToken])

  return {
    ...useTxTemplate(TxTemplateTypes.Swapped, `$swap_${tokenIn}_${tokenOut}`, `Swap tokens`, dataFunc, setTx),
    path,
    loadingPath: pending,
    isXfiToWxfi,
    iswXfiToXfi,
    isWrappedSwap,
    loadingReserves,
    mappedReserves: mapped,
    priceChange,
    loadingExpectedOut,
    redactedExpectedAmountOutPerOne,
  }
}

export const useSwapAmountOut = (amountIn: BigNumber = ZERO, tokenIn?: string, tokenOut?: string) => {
  const contract = useUniswapRouter()

  const { result: path, pending } = useGetSwapPath(tokenIn, tokenOut)

  const deps = useMemo(() => {
    return [amountIn, path?.Path]
  }, [path, amountIn])

  const result = useSingleCallResult(contract, 'getAmountsOut', deps)

  return useMemo(() => {
    return {
      amount: result.result?.amounts?.[result.result?.amounts?.length - 1] ?? null, // get last element
      loading: result.loading || pending,
    }
  }, [result, pending])
}

export const useSwapAmountIn = (amountIn: BigNumber = ZERO, tokenIn?: string, tokenOut?: string) => {
  const contract = useUniswapRouter()

  const { result: path } = useGetSwapPath(tokenIn, tokenOut)

  const deps = useMemo(() => {
    return [amountIn, path?.Path]
  }, [path, amountIn])

  const result = useSingleCallResult(contract, 'getAmountsIn', deps)

  return {
    amount: result.result?.amounts?.[0] ?? null, // get first element
    loading: result.loading,
  }
}

const getDeadline = () => Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time

const getAmountSlippage97 = (amount: BigNumber, slippage?: number) => {
  if (!slippage) return amount.mul(97).div(100)

  const percents = +(100 - slippage).toFixed(2) * 100

  return amount.mul(percents).div(100).div(100)
}

export const useAddLiquiditySwap = (
  token0?: string,
  token1?: string,
  amount0: BigNumber = ZERO,
  amount1: BigNumber = ZERO,
  setPendingTx?: (txHash: string) => void
) => {
  const contract = useUniswapRouter()

  const { account = '' } = useActiveWeb3React()

  const { result: path, pending } = useGetSwapPath(token0, token1)

  const isXfiIn = token0 === TokenSymbol.xfi
  const isXfiOut = token1 === TokenSymbol.xfi

  const dataFunc = useCallback(async () => {
    const deadline = getDeadline() // 20 minutes from the current Unix time

    if (!token0 || !token1 || pending) return

    if (isXfiIn || isXfiOut) {
      const token = isXfiIn ? token1 : token0
      const amount = isXfiIn ? amount1 : amount0

      return {
        ...(await contract?.populateTransaction.addLiquidityETH(
          token,
          amount,
          getAmountSlippage97(amount),
          getAmountSlippage97(isXfiIn ? amount0 : amount1),
          account,
          deadline
        )),
        value: isXfiIn ? amount0 : amount1,
      }
    }

    return await contract?.populateTransaction.addLiquidity(
      token0,
      token1,
      amount0,
      amount1,
      getAmountSlippage97(amount0),
      getAmountSlippage97(amount1),
      account,
      deadline
    )
  }, [contract, amount0, amount1, account, token0, token1, pending, isXfiIn, isXfiOut])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx && setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  return {
    ...useTxTemplate(TxTemplateTypes.Swapped, `$add_liquidity_${token0}_${token1}`, `Add liquidity`, dataFunc, setTx),
    path,
    loadingPath: pending,
    isXfiIn,
    isXfiOut,
  }
}

export interface IRemoveLiquiditySnapshot {
  token0: ILiquidityToken
  token1: ILiquidityToken
  data: ILiquidityResults
}

export const useRemoveLiquidity = (
  pair: string,
  tokenIn: ILiquidityToken,
  tokenOut: ILiquidityToken,
  amount: BigNumber = ZERO,
  setPendingTx?: (txHash: string) => void
) => {
  const contract = useUniswapRouter()

  const data = useLockedInPool(pair, tokenIn.address, tokenOut.address, amount)

  const [txSnapshot, setSnapshotTx] = useState<IRemoveLiquiditySnapshot>({
    token0: tokenIn,
    token1: tokenOut,
    data,
  })

  const { account = '' } = useActiveWeb3React()

  const { result: path, pending } = useGetSwapPath(tokenIn?.address, tokenOut?.address)

  const dataFunc = useCallback(async () => {
    const deadline = getDeadline() // 20 minutes from the current Unix time

    if (!tokenIn || !tokenOut) return

    const isXfiIn = tokenIn.address === TokenSymbol.xfi
    const isXfiOut = tokenOut.address === TokenSymbol.xfi

    if (isXfiIn || isXfiOut) {
      return await contract?.populateTransaction.removeLiquidityETH(
        isXfiIn ? tokenOut.address : tokenIn.address,
        amount,
        0,
        0,
        account,
        deadline
      )
    }

    return await contract?.populateTransaction.removeLiquidity(
      tokenIn.address,
      tokenOut.address,
      amount,
      0,
      0,
      account,
      deadline
    )
  }, [contract, amount, account, tokenIn, tokenOut])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx && setPendingTx(tx.hash)

      setSnapshotTx({
        token0: tokenIn,
        token1: tokenOut,
        data,
      })
    },
    [setPendingTx, data, setSnapshotTx, tokenIn, tokenOut]
  )

  return {
    ...useTxTemplate(
      TxTemplateTypes.Swapped,
      `$remove_liquidity_${tokenIn}_${tokenOut}`,
      `Removed liquidity`,
      dataFunc,
      setTx
    ),
    path,
    loadingPath: pending,
    txSnapshot,
    data,
  }
}

const XFI_MODEL = {
  address: TokenSymbol.xfi,
  name: 'XFI',
  symbol: 'XFI',
  decimals: 18,
}

export const useSwapTokens = () => {
  const parsed = useParsedQueryString()

  const usdtAddress = useUSDTAddress()

  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const [tokenIn, setTokenIn] = useState<string>((parsed?.in as string) || XFI_MODEL.address)
  const [tokenOut, setTokenOut] = useState<string>((parsed?.out as string) || usdtAddress)

  const [amountOut, setAmountOut] = useState<BigNumber>()
  const [amountIn, setAmountIn] = useState<BigNumber>()

  const noValue = !amountIn || amountIn.isZero()

  const { result, pending: loadingAssets } = useSwapTokensList()

  const allowedAssets = useMemo(() => {
    return result || []
  }, [result])

  const tokensInList = useMemo(() => {
    const targetAddress = tokenOut?.toLowerCase()
    return (
      allowedAssets
        ?.filter((item) => item.address.toLowerCase() !== targetAddress)
        .map((token) => ({
          ...token.data,
          address: token.address,
        })) || []
    )
  }, [allowedAssets, tokenOut])

  const tokensOutList = useMemo(() => {
    const targetAddress = tokenIn?.toLowerCase()
    return (
      allowedAssets
        ?.filter((item) => item.address.toLowerCase() !== targetAddress)
        .map((token) => ({
          ...token.data,
          address: token.address,
        })) || []
    )
  }, [allowedAssets, tokenIn])

  const tokenOutModel = useMemo(
    () => tokensOutList.find((item) => item.address === tokenOut) || XFI_MODEL,
    [tokenOut, tokensOutList]
  )

  const tokenInModel = useMemo(
    () => tokensInList.find((item) => item.address === tokenIn) || XFI_MODEL,
    [tokenIn, tokensInList]
  )

  return {
    pendingTx,
    setPendingTx,
    tokenIn,
    setTokenIn,
    tokenOut,
    setTokenOut,
    amountOut,
    setAmountOut,
    amountIn,
    setAmountIn,
    noValue,
    loadingAssets,
    tokensInList,
    tokensOutList,
    tokenOutModel,
    tokenInModel,
  }
}

const useFormTokens = (tokenIn?: string, tokenOut?: string) => {
  const { result, pending: loadingAssets } = useSwapTokensList()

  const allowedAssets = useMemo(() => {
    return result || []
  }, [result])

  const tokensInList = useMemo(() => {
    const targetAddress = tokenOut?.toLowerCase()
    return (
      allowedAssets
        ?.filter((item) => item.address.toLowerCase() !== targetAddress)
        .map((token) => ({
          ...token.data,
          address: token.address,
        })) || []
    )
  }, [allowedAssets, tokenOut])

  const tokensOutList = useMemo(() => {
    const targetAddress = tokenIn?.toLowerCase()
    return (
      allowedAssets
        ?.filter((item) => item.address.toLowerCase() !== targetAddress)
        .map((token) => ({
          ...token.data,
          address: token.address,
        })) || []
    )
  }, [allowedAssets, tokenIn])

  const tokenOutModel = useMemo(
    () => tokensOutList.find((item) => item.address.toLowerCase() === tokenOut?.toLowerCase()) || XFI_MODEL,
    [tokenOut, tokensOutList]
  )

  const tokenInModel = useMemo(
    () => tokensInList.find((item) => item.address.toLowerCase() === tokenIn?.toLowerCase()) || XFI_MODEL,
    [tokenIn, tokensInList]
  )

  return {
    loadingAssets,
    tokensInList,
    tokensOutList,
    tokenOutModel,
    tokenInModel,
  }
}

export const useLiquidityTokens = (inputToken0?: string, inputToken1?: string) => {
  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const [tokenIn, setTokenIn] = useState<string>(inputToken0 || '')
  const [tokenOut, setTokenOut] = useState<string>(inputToken1 || '')

  useEffect(() => {
    inputToken0 && setTokenIn(inputToken0)
    inputToken1 && setTokenOut(inputToken1)
  }, [inputToken0, inputToken1])

  const [amountOut, setAmountOut] = useState<BigNumber>()
  const [amountIn, setAmountIn] = useState<BigNumber>()

  const pair = usePair(tokenIn, tokenOut)

  const { loading: loadingReserves, mapped } = useReserves(pair.pair)

  const noValue = !amountIn || amountIn.isZero()

  const { loadingAssets, tokensInList, tokensOutList, tokenOutModel, tokenInModel } = useFormTokens(tokenIn, tokenOut)

  return {
    pendingTx,
    setPendingTx,
    tokenIn,
    setTokenIn,
    tokenOut,
    setTokenOut,
    amountOut,
    setAmountOut,
    amountIn,
    setAmountIn,
    noValue,
    loadingAssets,
    tokensInList,
    tokensOutList,
    tokenOutModel,
    tokenInModel,
    reserves: mapped,
    loadingReserves,
    pair: pair.pair,
  }
}

export const useRemoveLiquidityTokens = (
  inputToken0: string | undefined,
  inputToken1: string | undefined,
  lp: string
) => {
  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const tokenIn = inputToken0
  const tokenOut = inputToken1

  const [amountIn, setAmountIn] = useState<BigNumber>()

  const { symbol: symbolFirst } = useERC20Symbol(tokenIn)
  const { symbol: symbolSecond } = useERC20Symbol(tokenOut)

  const { loadingAssets, tokensInList, tokensOutList, tokenOutModel, tokenInModel } = useFormTokens(tokenIn, tokenOut)

  const pair = usePair(tokenIn, tokenOut)

  const noValue = !amountIn || amountIn.isZero()

  const pairModel = useMemo(
    () => ({
      symbol: symbolFirst && symbolSecond ? `${symbolFirst}/${symbolSecond}` : 'LP',
      address: pair.pair,
    }),
    [pair.pair, symbolFirst, symbolSecond]
  )

  return {
    tokenIn,
    tokenOut,
    amountIn,
    setPendingTx,
    noValue,
    pendingTx,
    pairModel,
    setAmountIn,
    loadingAssets,
    tokensInList,
    tokensOutList,
    tokenOutModel,
    tokenInModel,
    pair: pair.pair,
  }
}

export const usePair = (
  tokenIn?: string,
  tokenOut?: string
): {
  pair: string
  loading: boolean
} => {
  const contract = useUniswapV2Factory()

  const wxfiAddress = useWXFIAddress()

  const deps = useMemo(() => {
    return [
      !tokenIn || tokenIn === TokenSymbol.xfi ? wxfiAddress : tokenIn,
      !tokenOut || tokenOut === TokenSymbol.xfi ? wxfiAddress : tokenOut,
    ]
  }, [tokenIn, tokenOut, wxfiAddress])

  const result = useSingleCallResult(contract, 'getPair', deps)

  return {
    pair: result?.result?.[0] || ZERO_ADDRESS, // get last element
    loading: result.loading,
  }
}

export const usePairInfo = (pair: string) => {
  const contract = usePoolContract(pair)

  const reservesR = useSingleCallResult(contract, 'getReserves')
  const token0R = useSingleCallResult(contract, 'token0')
  const token1R = useSingleCallResult(contract, 'token1')

  return {
    token0R,
    token1R,
    reservesR,
  }
}

export const useReserves = (pair: string) => {
  const { reservesR, token0R, token1R } = usePairInfo(pair)

  return useMemo(() => {
    const token0 = token0R.result?.toString().toLowerCase()
    const token1 = token1R.result?.toString().toLowerCase()

    if (reservesR.loading || token0R.loading || token1R.loading) return { loading: true }

    const mapped: {
      [key: string]: BigNumber | undefined
    } =
      token0 && token1
        ? {
            [token0]: reservesR.result?._reserve0,
            [token1]: reservesR.result?._reserve1,
          }
        : {}

    return {
      loading: false,
      mapped,
    }
  }, [reservesR, token0R, token1R])
}
