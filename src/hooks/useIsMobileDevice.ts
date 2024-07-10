import { useMemo } from 'react'
import { MEDIA_WIDTHS } from 'theme/theme'

import { useWindowSize } from './useWindowSize'

export const useIsMobileDevice = () => {
  const { width: windowWidth } = useWindowSize()

  return useMemo(() => windowWidth && windowWidth <= MEDIA_WIDTHS.upToTablet, [windowWidth])
}
