import { ReactElement, useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'

import { TYPE } from '../../theme/theme'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  z-index: 10000;
`

export default function WarningPopup({
  success,
  title,
  description,
}: {
  success?: boolean
  title?: string | ReactElement
  description?: string | ReactElement
}) {
  const theme = useContext(ThemeContext)

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.green} size={24} /> : <AlertCircle color={theme.red} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <TYPE.body fontWeight={500}>{title}</TYPE.body>

        {description && <TYPE.main fontWeight={500}>{description}</TYPE.main>}
      </AutoColumn>
    </RowNoFlex>
  )
}
