import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="black" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.1513L15.2312 4.92009L19.08 4.92004L19.08 8.76888L15.8487 12.0001L19.08 15.2313L19.08 19.0801L15.2312 19.0801L12 15.8489L8.76876 19.0801L4.91993 19.0801L4.91997 15.2313L8.15118 12.0001L4.91997 8.76887L4.91992 4.92008L8.76875 4.92009L12 8.1513ZM11.2359 8.91531L8.3212 6.00057L6.00041 6.00056L6.00044 8.32132L8.91519 11.2361L11.2359 8.91531ZM9.6792 12.0001L12 9.67932L14.3207 12.0001L12 14.3208L9.6792 12.0001ZM8.91519 12.7641L6.00045 15.6788L6.00042 17.9996L8.32121 17.9996L11.2359 15.0849L8.91519 12.7641ZM12.764 15.0849L15.6787 17.9996L17.9995 17.9996L17.9995 15.6788L15.0847 12.7641L12.764 15.0849ZM15.0847 11.2361L12.764 8.91531L15.6787 6.00056L17.9995 6.00053L17.9995 8.32133L15.0847 11.2361Z"
        fill="white"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
