import * as React from 'react'
import { useTheme } from 'styled-components'
import { Color } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: Color }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = (props.color && (theme as any)[props.color]) || theme.white

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M3.80127 8.60059L7.00127 5.40059L10.2013 8.60059"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
