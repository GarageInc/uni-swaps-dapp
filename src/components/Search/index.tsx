import styled from 'styled-components'

import SearchIconSrc from '../../assets/icons/search.svg'

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 2.87rem;
  border-radius: 1rem;
  border: 1px solid rgba(67, 70, 71, 0.2);
  font-family: 'Helvetica Neue', sans-serif;

  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.text100};

  &::placeholder {
    color: ${({ theme }) => theme.text40};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.text40};
  }
`

const SearchIcon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
  position: absolute;
  top: calc(50% - 0.15rem);
  left: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
`

export const Search = ({
  style,
  inputProps,
}: {
  style?: React.CSSProperties
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}) => {
  return (
    <InputWrapper style={style}>
      <Input type="text" placeholder="Search" {...inputProps} />
      <SearchIcon src={SearchIconSrc} alt="Search" />
    </InputWrapper>
  )
}
