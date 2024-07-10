import { SupportedChainId } from 'constants/chainsinfo'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useHandleChainSwitch } from './Header/NetworkSelector'
import { WarningBanner } from './WarningBanner'

export const WrongNetwork = () => {
  const { t } = useTranslation()
  const handleChainSwitch = useHandleChainSwitch()

  const toggleChain = useCallback(() => {
    handleChainSwitch(SupportedChainId.XFI_TESTNET, true)
  }, [handleChainSwitch])

  return (
    <WrongNetworkWrapper>
      <WarningBanner text={t('WrongNetwork.title')} buttonText={t('WrongNetwork.button')} onClick={toggleChain} />
    </WrongNetworkWrapper>
  )
}

const WrongNetworkWrapper = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  right: 0;
  z-index: 100;
  max-width: min(80vw, 88rem);

  ${({ theme }) => theme.mediaWidth.upToTablet`
    max-width: 100vw;
    width: 100%;
    padding: 0 1rem;
    bottom: 2rem;
    `}
`
