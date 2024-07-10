import { Stack } from '@mui/material'
import { MouseoverTooltipContent } from 'components'
import useCopyClipboard from 'hooks/useCopyClipboard'
import styled from 'styled-components'
import { shortenString } from 'utils'

import CopyIcon from '../../assets/icons/copy.svg'

export const CopyAddress = ({ address, className }: { address: string; className?: string }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <Stack direction="row" gap="1.25rem" alignItems="center" marginTop=".41rem" className={className}>
      {shortenString(address, 5)}
      <MouseoverTooltipContent
        // onCLose={() => setShowCopy(false)}
        placement="bottom"
        show={isCopied}
        content="copied"
      >
        <CopyBtn onClick={() => setCopied(address)} src={CopyIcon} />
      </MouseoverTooltipContent>
    </Stack>
  )
}

const CopyBtn = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`
