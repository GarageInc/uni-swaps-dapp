import { useEffect } from 'react'

export const useDebounceEffect = (fn: () => void, delay: number, deps: any[]) => {
  useEffect(() => {
    console.log('handler', deps)
    const handler = setTimeout(() => {
      fn()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [deps, fn, delay])
}
