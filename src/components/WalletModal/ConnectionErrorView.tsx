import { ButtonEmpty, ButtonPrimary } from 'components/Button'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { flexColumnNoWrap } from 'theme/styles'

const Wrapper = styled.div`
  ${flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
`

const AlertTriangleIcon = styled(AlertTriangle)`
  width: 90px;
  height: 90px;
  stroke-width: 1;
  margin: 36px;
`

const noop = () => {
  console.log('noop 2')
}

// TODO(cartcrom): move this to a top level modal, rather than inline in the drawer
export default function ConnectionErrorView() {
  const { activationState, tryActivation, cancelActivation } = useActivationState()

  if (activationState.status !== ActivationStatus.ERROR) return null

  const retry = () => tryActivation(activationState.connection, noop)

  return (
    <Wrapper>
      <AlertTriangleIcon />
      <ThemedText.HeadlineSmall marginBottom="8px">
        <>Error connecting</>
      </ThemedText.HeadlineSmall>
      <ThemedText.BodyPrimary fontSize={16} marginBottom={24} lineHeight="24px" textAlign="center">
        <>The connection attempt failed. Please click try again and follow the steps to connect in your wallet.</>
      </ThemedText.BodyPrimary>
      <ButtonPrimary $borderRadius="16px" onClick={retry}>
        <>Try again</>
      </ButtonPrimary>
      <ButtonEmpty width="fit-content" padding="0" marginTop={20}>
        <ThemedText.Link onClick={cancelActivation} marginBottom={12}>
          <>Back to wallet selection</>
        </ThemedText.Link>
      </ButtonEmpty>
    </Wrapper>
  )
}
