import { DocumentNode } from 'graphql/language/ast'
import request from 'graphql-request'
import gql from 'graphql-tag'
import { useTransition } from 'hooks/useApiCall'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWRWrapper from 'swr'

const CHECKING_TIMEOUT = 30000

const useApiBlockNumber = () => {
  const [tId, setId] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setId((v) => ++v)
    }, CHECKING_TIMEOUT)

    return () => clearInterval(id)
  }, [setId])

  return tId
}

const useSWR = <T>(key: string, fetcher: (key: string) => Promise<T>) => {
  const { data: d, error, isLoading } = useSWRWrapper<T>(key, fetcher)

  const data = useTransition<T>(d!)

  return useMemo(() => {
    return { data, error, isLoading }
  }, [data, error, isLoading])
}

const API_LIMITS = 500
const DEFAULT_URL = 'https://crossfi.squids.live/xswap-indexer-ts/v/v1/graphql'

const useApiQuery = (query: DocumentNode, variables: any = undefined) => {
  return useCallback(() => request(`${DEFAULT_URL}`, query, variables), [DEFAULT_URL, query, variables])
}

export interface IApiPool {
  id: string
  token1: string
  token0: string
  decimals1: number
  decimalsLp: number
  decimals0: number
}

const POOLS_QUERY = gql`
  query MyQuery {
    pools {
      id
      token1
      token0
      decimals1
      decimalsLp
      decimals0
    }
  }
`

export function useLiquidityPools(): {
  list: IApiPool[]
  loading: boolean
  error: any
} {
  const fetchApi = useApiQuery(POOLS_QUERY)
  const { data, error } = useSWR(`useLiquidityPools`, fetchApi)

  return {
    list: data ? data.pools : [],
    loading: !data,
    error,
  }
}
