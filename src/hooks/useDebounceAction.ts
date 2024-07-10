import { debounce } from 'lodash'
import { useMemo } from 'react'

export const useDebouncedAction = (action: (data: any) => void, delay = 1000) => {
  const debounced = useMemo(() => {
    return debounce(action, delay)
  }, [action, delay])

  return debounced
}
