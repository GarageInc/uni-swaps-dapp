import useBlockNumber from 'hooks/useBlockNumber'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE } from '../../theme/theme'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'

const StyledPolling = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 0;
  color: ${({ theme }) => theme.green};
`

const StyledPollingNumber = styled(TYPE.small)<{ breathe: boolean; hovering: boolean }>`
  transition: opacity 0.25s ease;
  opacity: ${({ breathe, hovering }) => (hovering ? 0.7 : breathe ? 1 : 0.5)};
  color: ${({ theme }) => theme.text2};

  letter-spacing: 1px;

  position: relative;
  top: 1px;

  :hover {
    opacity: 1;
  }

  font-size: 10px !important;
`

const StyledPollingDot = styled.div`
  width: 6px;
  height: 6px;
  min-height: 6px;
  min-width: 6px;
  margin-right: 8px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme }) => theme.green};
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid #5e2fdd;
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;

  left: -3px;
  top: -3px;
`

export default function Polling() {
  const { chainId } = useActiveWeb3React()

  const blockNumber = useBlockNumber()

  const [isMounting, setIsMounting] = useState(false)
  const [isHover, setIsHover] = useState(false)

  useEffect(
    () => {
      if (!blockNumber) {
        return
      }

      setIsMounting(true)
      const mountingTimer = setTimeout(() => setIsMounting(false), 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(mountingTimer)
      }
    },
    [blockNumber] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  return (
    <ExternalLink
      style={{ marginLeft: 'auto', marginBottom: '6px', marginTop: '6px' }}
      href={chainId && blockNumber ? getExplorerLink(chainId, blockNumber.toString(), ExplorerDataType.BLOCK) : ''}
    >
      <StyledPolling onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <StyledPollingDot>{isMounting && <Spinner />}</StyledPollingDot>
        <StyledPollingNumber breathe={isMounting} hovering={isHover}>
          {blockNumber}
        </StyledPollingNumber>
      </StyledPolling>
    </ExternalLink>
  )
}
