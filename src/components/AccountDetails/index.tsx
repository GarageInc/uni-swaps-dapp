import { Stack } from '@mui/material'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { FlexContainer } from 'components/Flex'
import { HeaderIconImg, HeaderIconSvg } from 'components/Header/HeaderIcon'
import { useDisconnectWallet } from 'hooks/useDisconnectWallet'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useActiveWeb3React } from 'hooks/web3'
import { TronConnectButton } from 'pages/TokenSale/TronInfoBar/WarningBanner'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import { shortenString } from 'utils'

import TronLinkIcon from '../../assets/images/tron-link.png'
import { ReactComponent as MeatamaskIcon } from '../../assets/svg/metamask.svg'

const MenuItem = styled.li`
  display: flex;
  align-items: start;
  justify-content: space-between;
  transition: background-color 0.2s ease-in;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  width: 14.375rem;
  padding: 1.25rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.text12};
  &:hover {
    cursor: pointer;
    background-color: var(--White, #fff);
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
    padding: 1.25rem;
  `}
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Modal = styled.div`
  animation: ${fadeIn} 0.2s ease-in-out;
  border-radius: 1rem;
  background: var(--White, #fff);
  box-shadow: 0px 2px 15px 0px rgba(52, 57, 62, 0.19);
  display: inline-flex;
  padding: 1.25rem;
  flex-direction: row;
  min-height: 10.75rem;
  width: 32.25rem;
  align-items: flex-start;
  gap: 1.5rem;
  position: absolute;
  right: 0;
  top: calc(100% + 0.88rem);
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
    top: 0;
    right: 0;
    border-radius: 0;
    padding: 1.25rem;
    flex-direction: column;
    gap: .75rem;
    position: static;
    border-radius: 2rem 2rem 0 0;
  `}
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`

const WalletTitle = styled.div`
  color: ${({ theme }) => theme.text90};
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 1.275rem */

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1rem;
  `}
`
const WalletSubTitle = styled(WalletTitle)`
  color: ${({ theme }) => theme.text30};
  font-weight: 550;
`

const WalletAddress = styled.div`
  color: ${({ theme }) => theme.text100};
  font-size: 1.125rem;
  letter-spacing: -0.01125rem;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1rem;
  `}
`

const DisconnectWalletButton = styled.div`
  color: ${({ theme }) => theme.text60};
  font-size: 0.75rem;
  line-height: 120%; /* 0.9rem */
  text-transform: uppercase;
  padding-left: 2.25rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
    padding-left: 0;
    text-align: right;
  `}
`

const StyledTronConnectButton = styled(TronConnectButton)`
  background-color: ${({ theme }) => theme.inputDefault} !important;
  color: ${({ theme }) => theme.blue} !important;
  border: none !important;
  outline: none !important;
  height: 2.875rem !important;
  padding: 0 1.19rem !important;
  width: 100% !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
  font-weight: 400 !important;
  white-space: nowrap !important;
  border-radius: 0.75rem !important;

  &:hover {
    background-color: ${({ theme }) => theme.inputDefault} !important;
  }
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.8rem */
  letter-spacing: -0.015rem;
  margin: 0 0 0.5rem;
  position: relative;
  top: 0.25em;
`
const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  &:focus {
    outline: none;
  }
  width: 1.75rem;
  aspect-ratio: 1;

  svg {
    width: 100%;
    height: 100%;
  }
`

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  isOpen?: boolean
  openOptions: () => void
}

export default function AccountDetails({ isOpen, toggleWalletModal }: AccountDetailsProps) {
  const { disconnect } = useDisconnectWallet()
  const { account } = useActiveWeb3React()
  const modalRef = useRef<HTMLDivElement | null>(null)

  const { t } = useTranslation()

  const isMobile = useIsMobileDevice()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleWalletModal()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggleWalletModal])

  const { address: tronAddress, disconnect: disconnectTron } = useWallet()

  if (!isOpen) return null

  return (
    <ModalOverlay>
      <Modal ref={modalRef}>
        {isMobile && (
          <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
            <ModalTitle>{t('Header.connect')}</ModalTitle>
            <CloseBtn onClick={toggleWalletModal}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.70711 4.79289C5.31658 4.40237 4.68342 4.40237 4.29289 4.79289C3.90237 5.18342 3.90237 5.81658 4.29289 6.20711L10.5858 12.5L4.29289 18.7929C3.90237 19.1834 3.90237 19.8166 4.29289 20.2071C4.68342 20.5976 5.31658 20.5976 5.70711 20.2071L12 13.9142L18.2929 20.2071C18.6834 20.5976 19.3166 20.5976 19.7071 20.2071C20.0976 19.8166 20.0976 19.1834 19.7071 18.7929L13.4142 12.5L19.7071 6.20711C20.0976 5.81658 20.0976 5.18342 19.7071 4.79289C19.3166 4.40237 18.6834 4.40237 18.2929 4.79289L12 11.0858L5.70711 4.79289Z"
                  fill="#B7BCDD"
                />
              </svg>
            </CloseBtn>
          </Stack>
        )}
        <MenuItem>
          <WalletTitle>{t('Header.wallet')} 1</WalletTitle>
          <FlexContainer additionalStyles={{ flexDirection: isMobile ? 'row' : 'column', gap: '0.69rem' }}>
            <FlexContainer additionalStyles={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
              <HeaderIconSvg
                src={MeatamaskIcon}
                width={isMobile ? '1.25rem' : '1.5rem'}
                height={isMobile ? '1.25rem' : '1.5rem'}
                additionalStyles={{ position: 'relative', top: '-0.15rem' }}
              />
              <WalletAddress>{account && shortenString(account, 4)}</WalletAddress>
            </FlexContainer>
            <DisconnectWalletButton
              onClick={() => {
                disconnect()
                toggleWalletModal()
              }}
            >
              {t('Header.disconnect')}
            </DisconnectWalletButton>
          </FlexContainer>
        </MenuItem>

        <MenuItem>
          <FlexContainer additionalStyles={{ gap: '0.75rem', justifyContent: 'flex-start' }}>
            <WalletTitle>{t('Header.wallet')} 2</WalletTitle>
            <WalletSubTitle>{t('Header.tokenSale')}</WalletSubTitle>
          </FlexContainer>
          <FlexContainer additionalStyles={{ flexDirection: isMobile ? 'row' : 'column', gap: '0.69rem' }}>
            {tronAddress && (
              <FlexContainer additionalStyles={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                <HeaderIconImg
                  src={TronLinkIcon}
                  height={isMobile ? '1.25rem' : '1.5rem'}
                  width={isMobile ? '1.25rem' : '1.5rem'}
                  additionalStyles={{ position: 'relative', top: '-0.15rem' }}
                />
                <WalletAddress>{tronAddress ? shortenString(tronAddress, 3) : 'Token Sale'}</WalletAddress>
              </FlexContainer>
            )}
            {tronAddress ? (
              <DisconnectWalletButton onClick={disconnectTron}>{t('Header.disconnect')}</DisconnectWalletButton>
            ) : (
              <StyledTronConnectButton>Connect tron wallet</StyledTronConnectButton>
            )}
          </FlexContainer>
        </MenuItem>
      </Modal>
    </ModalOverlay>
  )
}

const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobileDevice()
  console.log('🚀 ~ ModalOverlay ~ isMobile:', isMobile)

  if (!isMobile) return <>{children}</>

  return <Overlay>{children}</Overlay>
}
