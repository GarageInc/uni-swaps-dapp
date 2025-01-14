import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg width="1001" height="1001" viewBox="0 0 1001 1001" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.273438" y="0.382812" width="999.997" height="999.997" rx="499.998" fill="black" />
      <path
        d="M714.492 446.532L554.126 286.166L634.91 205.383L795.276 205.381L795.275 365.749L714.492 446.532Z"
        fill="white"
      />
      <path
        d="M714.49 554.231L554.124 714.596L634.91 795.381L795.277 795.382L795.275 635.016L714.49 554.231Z"
        fill="white"
      />
      <path
        d="M365.624 795.381L660.625 500.381L365.627 205.383L205.276 205.381L205.277 365.749L339.91 500.382L205.277 635.015L205.275 795.382L365.624 795.381Z"
        fill="white"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
