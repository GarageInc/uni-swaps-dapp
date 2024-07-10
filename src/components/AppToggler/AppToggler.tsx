import { ButtonEmpty } from 'components/Button'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.dark04};
  border-radius: 24px;
  padding: 4px;
  height: 44px;
  width: fit-content;
`

const ButtonStyled = styled(ButtonEmpty)<{ selected?: boolean }>`
  background-color: ${({ theme, selected }) => (selected ? theme.light : 'transparent')};
  border: none;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 24px;
  height: 100%;
  min-width: fit-content;
  box-shadow: ${({ theme, selected }) => selected && theme.boxShadow};
`

interface IProps {
  tab: string
  setTab: (tab: string) => void
  tabs: {
    id: string
    title: string | JSX.Element
  }[]
}

export const AppToggler = ({ tab, setTab, tabs }: IProps) => {
  return (
    <Wrapper>
      {tabs.map((item, index) => {
        const selected = tab === item.id
        return (
          <ButtonStyled key={index} onClick={() => setTab(item.id)} selected={selected}>
            <TYPE.mediumHeader fontWeight={400} color={selected ? 'dark' : 'dark70'}>
              {item.title}
            </TYPE.mediumHeader>
          </ButtonStyled>
        )
      })}
    </Wrapper>
  )
}
