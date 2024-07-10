import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#34393E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12V8L16 8V11.9984C15.9991 9.79001 14.2086 8 12 8H8V16H12C9.79086 16 8 17.7909 8 20L8 24H16V20C16 22.2091 17.7909 24 20 24H24V16H20.0016C22.21 15.9991 24 14.2086 24 12Z"
        fill="white"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
