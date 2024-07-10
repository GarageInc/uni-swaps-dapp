import styled from 'styled-components'

import Loader from '../Loader'

const PendingSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`

const StyledLoader = styled(Loader)`
  margin-right: 1rem;
`

const LoadingMessage = styled.div<{ error?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
  border-radius: 50px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.red : 'inherit')};
  border: 2px solid #f64562;

  & > * {
    padding: 15px 25px;
  }
`

const ErrorGroup = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
`

const ErrorButton = styled.div`
  border-radius: 50px;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
  margin-left: 65px;
  padding: 10px;
  font-weight: 600;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: #f64562;
  }
`

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`

export default function PendingView({ reset, error = false }: { error?: boolean; reset: () => void }) {
  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div>
                <>Error connecting</>
              </div>
              <ErrorButton
                onClick={() => {
                  reset()
                }}
              >
                <>Try Again</>
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <>
              <StyledLoader />
              <>Initializing...</>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
    </PendingSection>
  )
}
