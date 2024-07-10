import dots from 'assets/icons/dots.svg'
import styled from 'styled-components'

export const ActionBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button onClick={onClick}>
      <Icon src={dots} />
    </Button>
  )
}

const Button = styled.button`
  width: 44px;
  height: 44px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: none;
  background: ${({ theme }) => theme.light};
  box-shadow: 0px 5.5px 27.5px 0px rgba(40, 46, 63, 0.08);
  cursor: pointer;

  img {
    opacity: 0.25;
    transition: opacity 0.3s;
  }

  :hover img {
    opacity: 0.4;
  }

  :active img {
    opacity: 0.7;
  }
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`
