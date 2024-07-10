import { ButtonRedStyle } from 'components/Button'
import Column from 'components/Column'
import Modal, { ModalProps } from 'components/Modal'
import { FC } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

const DisconnectModal: FC<ModalProps & { onDisconnect?: () => void }> = ({ onDisconnect, ...modalProps }) => {
  return (
    <StyledModal className="StyledModal" {...modalProps}>
      <Column padding="24px" gap="24px">
        <TYPE.mediumHeader color="dark" textAlign="center">
          Are you sure you want to disconnect the wallet?
        </TYPE.mediumHeader>

        <ButtonRedStyle onClick={onDisconnect} padding="11px 16px" $borderRadius="24px">
          <TYPE.mediumHeader color="white">Disconnect wallet </TYPE.mediumHeader>
        </ButtonRedStyle>

        <TYPE.body color="dark" textAlign="center">
          You can add a new wallet at any time.
        </TYPE.body>
      </Column>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  &.StyledModal {
    ${({ theme }) => theme.mediaWidth.upToPhone`
      width: 100%;
      align-self: flex-end;
      border-radius: 24px 24px 0 0;
      
  `};
  }
`
export default DisconnectModal
