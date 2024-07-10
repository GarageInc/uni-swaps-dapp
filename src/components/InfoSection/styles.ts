import { Typography } from '@mui/material'
import { Box } from 'components/MUI'
import styled from 'styled-components'

export const InfoPanel = styled(Box)`
  flex-direction: row;
  align-items: flex-start;
  padding: 11px;
  border: 1px solid #52526b;
  border-radius: 12px;
  white-space: pre-wrap;
`

export const FooterLabel = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
  line-height: 21px;
`
