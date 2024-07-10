import { useContext } from 'react'
import { AlertCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'

import CheckCircle from '../../assets/svg/tick-circle.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink } from '../../theme/components'
import { TYPE } from '../../theme/theme'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  z-index: 10000;
`

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveWeb3React()

  const theme = useContext(ThemeContext)

  return (
    <RowNoFlex>
      <div style={{ paddingRight: '0.75rem', alignSelf: 'start' }}>
        {success ? <img src={CheckCircle} alt="tick-circle" /> : <AlertCircle color={theme.red} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <TYPE.body>{summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}</TYPE.body>

        {chainId && hash && (
          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            <span style={{ fontWeight: 550, color: '#0085FF' }}>View on Explorer</span>
          </ExternalLink>
        )}
      </AutoColumn>
    </RowNoFlex>
  )
}
