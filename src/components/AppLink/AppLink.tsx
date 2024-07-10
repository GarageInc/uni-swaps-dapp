import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AppLink = styled(Link)`
  color: ${({ theme }) => theme.red};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  align-items: center;
  display: flex;
  gap: 6px;
`
