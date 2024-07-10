import { SupportedChainId } from 'constants/chainsinfo'
import request from 'graphql-request'
import { useTransition } from 'hooks/useApiCall'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWRWrapper from 'swr'

const CHECKING_TIMEOUT = 30000

export const useApiBlockNumber = () => {
  const [tId, setId] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setId((v) => ++v)
    }, CHECKING_TIMEOUT)

    return () => clearInterval(id)
  }, [setId])

  return tId
}

export const useSWR = <T>(key: string, fetcher: (key: string) => Promise<T>) => {
  const { data: d, error, isLoading } = useSWRWrapper<T>(key, fetcher)

  const data = useTransition<T>(d!)

  return useMemo(() => {
    return { data, error, isLoading }
  }, [data, error, isLoading])
}

export const API_LIMITS = 500
const DEFAULT_URL = 'https://api-xswap.dapp-devs.com/'

export const API_URL = 'https://api-xswap.dapp-devs.com'

export const useApiQuery = (query: string, variables: any) => {
  const { chainId } = useActiveWeb3React()
  const url = useMemo(() => {
    switch (chainId) {
      case SupportedChainId.XFI_TESTNET: {
        return DEFAULT_URL
      }
    }

    return DEFAULT_URL
  }, [chainId])

  return useCallback(() => request(`${url}`, query, variables), [url, query, variables])
}
