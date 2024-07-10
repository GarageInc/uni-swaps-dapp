import { useMemo, useState } from 'react'

export const useHover = () => {
  const [hovered, setHovered] = useState(false)

  const hoverEventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true)
      },
      onMouseOut() {
        setHovered(false)
      },
    }),
    []
  )

  return { hovered, hoverEventHandlers }
}
