import * as React from 'react'
import { useTheme } from 'styled-components'
import { Color } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: Color }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = (props.color && (theme as any)[props.color]) || theme.green

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M0.840684 13.0002C0.487222 13.0002 0.199014 13.2869 0.216678 13.64C0.332111 15.947 1.07013 18.1842 2.35787 20.1115C3.76435 22.2164 5.76344 23.8571 8.10233 24.8259C10.4412 25.7947 13.0149 26.0481 15.4978 25.5542C17.9808 25.0604 20.2615 23.8413 22.0516 22.0512C23.8418 20.2611 25.0608 17.9803 25.5547 15.4974C26.0486 13.0144 25.7951 10.4407 24.8263 8.10185C23.8575 5.76295 22.2169 3.76387 20.112 2.35738C18.1847 1.06964 15.9475 0.331623 13.6405 0.21619C13.2874 0.198526 13.0007 0.486733 13.0007 0.840196C13.0007 1.19366 13.2874 1.47834 13.6404 1.49797C15.6941 1.61216 17.6841 2.27459 19.4009 3.42167C21.2953 4.6875 22.7719 6.48668 23.6438 8.59168C24.5157 10.6967 24.7438 13.013 24.2993 15.2476C23.8548 17.4823 22.7577 19.535 21.1466 21.1461C19.5355 22.7572 17.4828 23.8543 15.2481 24.2988C13.0135 24.7433 10.6972 24.5152 8.59217 23.6433C6.48717 22.7714 4.68799 21.2948 3.42215 19.4004C2.27508 17.6836 1.61265 15.6936 1.49845 13.6399C1.47883 13.287 1.19415 13.0002 0.840684 13.0002Z"
        fill="#F4F5FB"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
