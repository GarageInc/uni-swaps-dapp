import { useEffect } from 'react'

export const useYandexMetrikaHit = () => {
  useEffect(() => {
    window.ym(97292775, 'hit')
  }, [])
}
