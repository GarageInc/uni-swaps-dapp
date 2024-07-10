import { FlexContainer } from 'components/Flex'
import { Suggestion } from 'components/Suggestion'
import styled from 'styled-components'

export const InfoBlock = ({
  children,
  suggestionText,
  style,
}: {
  children: React.ReactNode
  suggestionText: string
  style?: React.CSSProperties
}) => {
  return (
    <Container
      style={{
        ...style,
      }}
    >
      <FlexContainer
        style={{
          justifyContent: 'flex-start',
          gap: '.25rem',
        }}
      >
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.2442 11.7582C20.8876 7.23597 17.2641 3.61247 12.7418 3.25583C12.4993 3.24156 12.2425 3.22729 12 3.22729C6.87862 3.22729 2.72729 7.37862 2.72729 12.5C2.72729 17.6214 6.87862 21.7728 12 21.7728C17.1214 21.7728 21.2728 17.6214 21.2728 12.5C21.2728 12.2575 21.2585 12.0007 21.2442 11.7582ZM13.2554 13.7554L12 16.0665L10.7446 13.7554L8.43359 12.5L10.7446 11.2446L12 8.93359L13.2554 11.2446L15.5665 12.5L13.2554 13.7554Z"
            fill="#67DA8E"
          />
        </svg>
        <Text>{children}</Text>
      </FlexContainer>
      <Suggestion
        size="small"
        replaceIcon={
          <IconWrapper>
            <Icon />
          </IconWrapper>
        }
      >
        {suggestionText}
      </Suggestion>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 0.75rem;
  border: 1px solid rgba(103, 218, 142, 0.3);
  background: var(--Light-Green, #f4fdf7);
  display: flex;
  width: 31.75rem;
  height: 3.6875rem;
  padding: 1.25rem 1rem;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
  `}
`

const Text = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin: 0;
  margin-top: 0.15rem;
`

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`

const Icon = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22.5C17.5 22.5 22 18 22 12.5C22 7 17.5 2.5 12 2.5C6.5 2.5 2 7 2 12.5C2 18 6.5 22.5 12 22.5Z"
        stroke="#67DA8E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12V17" stroke="#67DA8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.9945 8.5H12.0035" stroke="#67DA8E" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
