import { Interface } from '@ethersproject/abi'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import ERC721ABI from 'abis/erc721.json'
import { Erc20Interface } from 'abis/types/Erc20'
import { BigNumber } from 'ethers'
import { useMulticall2Contract } from 'hooks/useContract'
import JSBI from 'jsbi'
import { useMemo } from 'react'
import { ZERO } from 'utils/isZero'

import { useActiveWeb3React } from '../../hooks/web3'
import { isAddress } from '../../utils'
import { useMultipleContractSingleData, useSingleCallResult } from '../multicall/hooks'
/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */

const TOKEN_BALANCE_GAS_OVERRIDE: { [chainId: number]: number } = {}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const { chainId } = useActiveWeb3React()

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])
  const ERC20Interface = new Interface(ERC721ABI) as Erc20Interface
  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20Interface, 'balanceOf', [address], {
    gasRequired: (chainId && TOKEN_BALANCE_GAS_OVERRIDE[chainId]) ?? 100_000,
  })

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading,
  ]
}

function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useNativeCurrencyBalance(): BigNumber {
  const multicallContract = useMulticall2Contract()

  const { account } = useActiveWeb3React()
  const deps = useMemo(() => [account] as any[], [account])
  const results = useSingleCallResult(multicallContract, 'getEthBalance', deps)

  return results.result?.balance || ZERO
}
