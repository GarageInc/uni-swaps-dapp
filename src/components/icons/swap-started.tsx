import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      width="81"
      height="80"
      viewBox="0 0 81 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <rect x="8.5" y="8" width="64" height="64" rx="32" fill={color} fillOpacity="0.15" />
      <mask id="mask0_3474_10158" maskUnits="userSpaceOnUse" x="28" y="28" width="25" height="24">
        <path d="M52.5 28H28.5V52H52.5V28Z" fill="white" />
      </mask>
      <g mask="url(#mask0_3474_10158)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.5857 28H28.5857V34C28.5857 37.0554 30.8696 39.5775 33.8233 39.952C30.8282 40.2882 28.5 42.8294 28.5 45.9143L28.5 51.9143H34.5C37.5554 51.9143 40.0775 49.6304 40.452 46.6767C40.7882 49.6719 43.3294 52 46.4143 52H52.4143V46C52.4143 42.9446 50.1304 40.4225 47.1767 40.048C50.1719 39.7118 52.5 37.1706 52.5 34.0857V28.0857L46.5 28.0857C43.4446 28.0857 40.9225 30.3696 40.548 33.3233C40.2118 30.3282 37.6706 28 34.5857 28Z"
          fill={color}
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
