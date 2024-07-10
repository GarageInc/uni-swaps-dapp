import { useEffect } from 'react'

export const useIntervalEffect = (callback: () => void, delay = 1000) => {
  useEffect(() => {
    const tId = setTimeout(() => {
      callback()
    })

    return () => clearTimeout(tId)
  }, [callback])

  useEffect(() => {
    const id = setInterval(() => {
      callback()
    }, delay)
    return () => clearInterval(id)
  }, [callback, delay])
}
