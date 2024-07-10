import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.white

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M2.89844 18.001H12.4984" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3.69922 7.60059H11.6992"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6992 18.001V3.60098C11.6992 3.17663 11.5306 2.76966 11.2306 2.46961C10.9305 2.16955 10.5236 2.00098 10.0992 2.00098H5.29922C4.87487 2.00098 4.46791 2.16955 4.16785 2.46961C3.86779 2.76966 3.69922 3.17663 3.69922 3.60098V18.001"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6992 10.8004H13.2992C13.7236 10.8004 14.1305 10.969 14.4306 11.269C14.7306 11.5691 14.8992 11.976 14.8992 12.4004V14.0004C14.8992 14.4247 15.0678 14.8317 15.3678 15.1318C15.6679 15.4318 16.0749 15.6004 16.4992 15.6004C16.9236 15.6004 17.3305 15.4318 17.6306 15.1318C17.9306 14.8317 18.0992 14.4247 18.0992 14.0004V8.26439C18.0994 8.05326 18.0578 7.84419 17.9768 7.64922C17.8957 7.45425 17.777 7.27724 17.6272 7.12839L14.8992 4.40039"
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
