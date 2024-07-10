import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <path
        d="M10.0508 5.63022L6.96891 3.25332L10.0508 0.876411L13.9181 0.876479L17 3.25338M10.0508 5.63022L13.9181 5.63029M10.0508 5.63022V15.1334M13.9181 5.63029L17 3.25338M13.9181 5.63029V10.5599V15.1334M17 3.25338V7.49799L15.9321 8.89487L17 10.2918V12.7565L13.9181 15.1334M4.08189 5.62037L1 3.24346M4.08189 5.62037L7.9492 5.62043M4.08189 5.62037V10.5499V15.1235M1 3.24346L4.08189 0.866554L7.9492 0.866622L11.0311 3.24353L7.9492 5.62043M1 3.24346V7.48807L2.06789 8.88495L1 10.2818V12.7466L4.08189 15.1235M7.9492 5.62043V15.1236M10.0508 15.1334L13.9181 15.1334M10.0508 15.1334L8.99366 14.3181L7.9492 15.1236M4.08189 15.1235L7.9492 15.1236"
        stroke={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
