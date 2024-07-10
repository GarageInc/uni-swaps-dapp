import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'

export const fetchCall = (url: string, headers: any) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  })

export const useApiCall = <T>(url = '', fetcher: any = fetchCall, headers?: any) => {
  const query = useQuery<any, Error, any, [string]>({
    queryKey: [url],
    queryFn: async () => {
      return fetcher(url, headers).then((res: any) => res.json())
    },
  })
  return { data: query.data, error: query.error, isLoading: query.isLoading }
}

export const useTransition = <T>(data: T) => {
  const [prev, setPrev] = useState(() => data)

  useEffect(() => {
    if (data) {
      setPrev((state: any) => {
        if (state && data && isEqual(data, state)) {
          return state
        }

        return data
      })
    }
  }, [data])

  return prev
}
