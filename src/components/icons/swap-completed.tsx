import * as React from 'react'
import { useTheme } from 'styled-components'
import { Color } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: Color }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = (props.color && (theme as any)[props.color]) || theme.darkOrange

  return (
    <svg
      width="79"
      height="78"
      viewBox="0 0 79 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M2.45 39C1.37305 39 0.494914 39.8737 0.548732 40.9493C0.900443 47.9786 3.14909 54.7952 7.07268 60.6672C11.3581 67.0808 17.449 72.0795 24.5753 75.0313C31.7017 77.9831 39.5433 78.7554 47.1085 77.2506C54.6738 75.7458 61.6229 72.0314 67.0772 66.5772C72.5314 61.1229 76.2458 54.1738 77.7506 46.6085C79.2554 39.0433 78.4831 31.2017 75.5313 24.0753C72.5795 16.949 67.5808 10.8581 61.1672 6.57269C55.2952 2.6491 48.4786 0.400444 41.4493 0.0487327C40.3737 -0.00508572 39.5 0.873045 39.5 1.95C39.5 3.02696 40.3737 3.89435 41.449 3.95414C47.7065 4.30209 53.7699 6.32042 59.0005 9.81542C64.7727 13.6723 69.2715 19.1541 71.9282 25.5678C74.5848 31.9815 75.2799 39.0389 73.9256 45.8477C72.5712 52.6564 69.2283 58.9106 64.3194 63.8195C59.4106 68.7283 53.1564 72.0712 46.3477 73.4256C39.5389 74.7799 32.4815 74.0848 26.0678 71.4282C19.6541 68.7715 14.1723 64.2727 10.3154 58.5005C6.82041 53.2699 4.80208 47.2065 4.45414 40.949C4.39435 39.8737 3.52696 39 2.45 39Z"
        fill={color}
      />
      <rect x="7.5" y="7" width="64" height="64" rx="32" fill={color} />
      <path
        d="M32.5 40L36.5 44L46.5 34"
        stroke="#F8FAFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
