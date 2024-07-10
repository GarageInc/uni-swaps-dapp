import { BoxProps } from '@mui/material'
import { InputLabel } from 'components/blocks/InputLabelRow/styles'
import { Box } from 'components/MUI'
import React from 'react'

export type IinputLabelRow = {
  firstLabel: string
  secondLabel: string
}

const InputLabelRow = ({ firstLabel, secondLabel, ...props }: IinputLabelRow & BoxProps) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" {...props}>
      <InputLabel>{firstLabel}</InputLabel>
      <InputLabel>{secondLabel}</InputLabel>
    </Box>
  )
}

export default InputLabelRow
