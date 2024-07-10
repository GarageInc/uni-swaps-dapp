import { DocumentNode } from 'graphql/language/ast'
import request from 'graphql-request'
import gql from 'graphql-tag'
import { useTransition } from 'hooks/useApiCall'
import { useActiveWeb3React } from 'hooks/web3'
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

const DEFAULT_URL = 'https://xswap.squids.live/xswap/v/v1/graphql'

const useApiQuery = (query: DocumentNode, variables: any = undefined) => {
  return useCallback(() => request(`${DEFAULT_URL}`, query, variables), [query, variables])
}

export interface IApiPool {
  id: string
  token1: string
  token0: string
  APR: number
  TVL: number
  reserve0: string
  reserve1: string
  volume_24h: number
  volume_7d: number
}

const POOLS_QUERY = gql`
  query MyQuery {
    get_pools_stats {
      APR
      TVL
      id
      reserve0
      reserve1
      token0
      token1
      volume_24h
      volume_7d
    }
  }
`

const USER_POOLS_QUERY = gql`
  query userPools($address: String!) {
    get_user_info(address: $address) {
      pair_address
    }
  }
`

export interface IUserPool {
  pair_address: string
}

export const useUserPools = (): {
  list: IUserPool[]
  loading: boolean
  error: any
} => {
  const { account } = useActiveWeb3React()
  const fetchApi = useApiQuery(USER_POOLS_QUERY, { address: account })
  const { data, error } = useSWR(`useUserPools`, fetchApi)

  return {
    list: data ? data.get_user_info : [],
    loading: !data,
    error,
  }
}

export function useLiquidityPools(): {
  list: IApiPool[]
  mapped: Record<string, IApiPool>
  loading: boolean
  error: any
} {
  const fetchApi = useApiQuery(POOLS_QUERY)
  const { data, error } = useSWR(`useLiquidityPools`, fetchApi)

  return {
    list: data ? data.get_pools_stats : [],
    mapped: data
      ? data.get_pools_stats.reduce((acc: Record<string, IApiPool>, pool: IApiPool) => {
          acc[pool.id] = pool
          return acc
        }, {})
      : {},
    loading: !data,
    error,
  }
}
