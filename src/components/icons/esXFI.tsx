import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <g id="esXFI icon">
        <path
          id="esXFI"
          d="M13.2175 15.3557C13.2495 15.7105 12.3626 16.1628 12.0835 15.9413C9.68066 14.0344 6.32142 14.0339 3.91802 15.9398C3.63885 16.1612 2.75086 15.7081 2.78274 15.3533C2.92933 13.7218 2.2782 13.0707 0.646681 13.2172C0.291808 13.2491 -0.161203 12.3611 0.0601929 12.0819C1.96609 9.67866 1.96556 6.31983 0.0586273 3.91713C-0.16285 3.63807 0.289434 2.75102 0.644261 2.78297C2.27756 2.93005 2.92941 2.279 2.78274 0.646684C2.75085 0.291816 3.63885 -0.1612 3.91802 0.0601877C6.32142 1.96612 9.68066 1.9656 12.0835 0.0586228C12.3626 -0.162844 13.2495 0.28944 13.2175 0.644264C13.0703 2.27831 13.722 2.93009 15.3557 2.78298C15.7105 2.75103 16.1628 3.63801 15.9414 3.91708C14.0349 6.3198 14.0343 9.67874 15.9399 12.0819C16.1612 12.3611 15.7082 13.2491 15.3533 13.2172C13.7214 13.0707 13.0704 13.7225 13.2175 15.3557Z"
          fill={color}
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
