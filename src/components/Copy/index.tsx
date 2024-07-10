import useCopyClipboard from 'hooks/useCopyClipboard'
import React, { FC } from 'react'
import { CheckCircle, Copy as FeatherCopy } from 'react-feather'
import styled from 'styled-components'
import { LinkStyledButton } from 'theme/theme'
import { StyleProps } from 'types/common'

const CopyIcon = styled(LinkStyledButton)<StyleProps>`
  padding: ${({ padding }) => padding ?? '1px 6px'};
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'initial'};
  text-decoration: none;
  align-items: center;
  gap: ${({ gap }) => gap ?? '0px'};
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

type Props = {
  toCopy: string
  children?: React.ReactNode
  sx?: StyleProps
}

const Copy: FC<Props> = (props) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)} {...props.sx}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size="16" />
          <TransactionStatusText>
            <>Copied</>
          </TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <FeatherCopy size="16" />
        </TransactionStatusText>
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}

export default Copy
