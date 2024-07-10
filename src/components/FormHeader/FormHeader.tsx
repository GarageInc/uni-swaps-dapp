import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { Row, RowBetween } from 'components/Row'
import styled from 'styled-components'

const Header = styled(RowBetween)`
  align-items: center;
`

const SwapLabel = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
`

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`

interface IProps {
  icon: string
  label: string
  explanation: string
}

export const FormHeader = ({ icon, label, explanation }: IProps) => {
  return (
    <Header>
      <Row>
        <Icon src={icon}></Icon>
        <SwapLabel>{label}</SwapLabel>
      </Row>

      <ExplanationBtn title={explanation} />
    </Header>
  )
}
