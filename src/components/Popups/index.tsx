import { SupportedChainId } from 'constants/chainsinfo'
import { useActiveWeb3React } from 'hooks/web3'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme/theme'

import { useActivePopups } from '../../state/application/hooks'
import { AutoColumn } from '../Column'
import PopupItem from './PopupItem'

const StopOverflowQuery = `@media screen and (min-width: ${MEDIA_WIDTHS.upToMedium + 1}px) and (max-width: ${
  MEDIA_WIDTHS.upToMedium + 500
}px)`

const FixedPopupColumn = styled(AutoColumn)<{ extraPadding?: boolean; xlPadding: boolean }>`
  position: fixed;
  bottom: 7.19rem;
  right: 6.94rem;
  border-radius: 24px;
  max-width: 355px !important;
  width: 100%;
  height: fit-content;
  z-index: 1000000;
  /* background-color: ${({ theme }) => theme.bg1}; */

  ${({ theme }) => theme.mediaWidth.upToTablet`
    top: 1%;
    left: 50%;
    transform: translateX(-50%);
    
  `}

  ${StopOverflowQuery} {
    bottom: 7.19rem;
    // top: ${({ extraPadding, xlPadding }) => (xlPadding ? '64px' : extraPadding ? '64px' : '56px')};
  }
`

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups()

  // need extra padding if network is not L1 Ethereum
  const { chainId } = useActiveWeb3React()
  const isNotOnMainnet = Boolean(chainId && chainId !== SupportedChainId.MAINNET)

  return (
    <FixedPopupColumn gap="20px" extraPadding={false} xlPadding={isNotOnMainnet}>
      {activePopups
        .slice(0)
        .reverse()
        .map((item) => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
    </FixedPopupColumn>
  )
}
