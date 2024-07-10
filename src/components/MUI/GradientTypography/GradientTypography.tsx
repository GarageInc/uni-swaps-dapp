import { Typography } from '@mui/material'
import styled from 'styled-components'

const GradientTypography = styled(Typography)<{ $gradientColor?: string }>`
  background: ${({ $gradientColor, theme }) => $gradientColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default GradientTypography
