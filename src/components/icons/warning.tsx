import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.orange

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <path d="M12 9V14" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M12.0001 21.4098H5.94005C2.47005 21.4098 1.02005 18.9298 2.70005 15.8998L5.82006 10.2798L8.76006 4.99979C10.5401 1.78979 13.4601 1.78979 15.2401 4.99979L18.1801 10.2898L21.3001 15.9098C22.9801 18.9398 21.5201 21.4198 18.0601 21.4198H12.0001V21.4098Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M11.9945 17H12.0035" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
