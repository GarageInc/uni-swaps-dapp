import { Divider as MuiDivider, DividerProps } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { FC } from 'react'

interface Props extends DividerProps {
  height?: string
  orientation?: 'horizontal' | 'vertical'
  color?: string
}

const Divider: FC<Props> = ({ height = '1px', orientation = 'horizontal', color, ...rest }) => {
  const theme = useTheme()
  return (
    <MuiDivider
      sx={{
        width: orientation === 'horizontal' ? '100%' : 'auto',
        height: 'auto',
        margin: orientation === 'vertical' ? '0 4px' : '4px 0',
        borderRightWidth: orientation === 'vertical' ? height : 0,
        borderBottomWidth: orientation === 'horizontal' ? height : 0,
        borderColor: color || theme.dark10,
      }}
    />
  )
}

export default Divider
