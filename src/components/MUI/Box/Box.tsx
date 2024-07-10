import { BoxProps } from '@mui/material'
import MuiBox from '@mui/material/Box'
import styled from 'styled-components'
const Box: React.FC<BoxProps> = (props) => {
  return <MuiBox display="flex" flexDirection="column" {...props} />
}

export default styled(Box)``
