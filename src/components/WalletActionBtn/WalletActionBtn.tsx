import disconnectIcon from 'assets/icons/out.svg'
import reloadIcon from 'assets/icons/reload.svg'
import { ActionBtn } from 'components/ActionBtn/ActionBtn'
import DisconnectModal from 'components/Modals/DisconnectModal'
import { Menu, StyledMenuItem } from 'components/MUI'
import { RowGapped } from 'components/Row'
import { useDisconnectWallet } from 'hooks/useDisconnectWallet'
import { useCallback } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

export const WalletActionBtn = () => {
  const { disconnect } = useDisconnectWallet()

  const isDisconnectModalOpen = useModalOpen(ApplicationModal.DISCONNECT)

  const toggleDisconnectModal = useToggleModal(ApplicationModal.DISCONNECT)

  const onDisconnect = useCallback(() => {
    disconnect()
    toggleDisconnectModal()
  }, [disconnect, toggleDisconnectModal])

  return (
    <>
      <Menu trigger={() => <ActionBtn />} isChildrenCloseMenu>
        <StyledMenuItem>
          {/*TODO add Resync balance onClick*/}
          <RowGapped gap="8px">
            <StyledIcon src={reloadIcon} />
            <TYPE.body fontWeight={400}>Resync balance </TYPE.body>
          </RowGapped>
        </StyledMenuItem>
        <StyledMenuItem>
          <RowGapped gap="8px" onClick={toggleDisconnectModal}>
            <StyledIcon src={disconnectIcon} />
            <TYPE.body fontWeight={400} color="error">
              Disconnect wallet
            </TYPE.body>
          </RowGapped>
        </StyledMenuItem>
      </Menu>

      <DisconnectModal
        isOpenFlag={isDisconnectModalOpen}
        onDismissHandler={toggleDisconnectModal}
        onDisconnect={onDisconnect}
      />
    </>
  )
}

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`
