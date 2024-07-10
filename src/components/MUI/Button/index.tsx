import MuiButton from '@mui/material/Button'
import styled, { keyframes } from 'styled-components'

const Base = styled(MuiButton)`
  border-radius: 3.75rem;
  font-family: Helvetica Neue, sans-serif;
  font-style: normal;
  font-size: 1.5625rem;
  font-weight: 400;
  display: inline-flex;
  padding: 1.375rem 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: none;
  transition: all 0.2s ease 0s;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.0625rem;
    padding: 1rem;
  `};
`

const LoadingAnimation = keyframes`
  to  {
      background-position: -200%;
  }
`

export const Button = styled(Base)<{
  loading?: boolean
  size?: 'large' | 'medium'
  variant?: 'default' | 'outlined' | 'secondary'
}>`
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  animation: ${(loading) => (loading ? LoadingAnimation : 'none')} 1.5s linear infinite;
  padding: 1rem 3rem;
  font-size: 1.375rem;

  ${({ loading, theme }) =>
    loading &&
    `
    pointer-events: none;
    background: linear-gradient(90deg, #FFECDC, #D2E9FF, #FFECDC);
    background-size: 200% auto;
    color: ${theme.text100};
  `}

  ${({ size }) =>
    size === 'large' &&
    `
      padding: 1.375rem 3rem;
      font-size: 1.5625rem;
  `}

  &:hover {
    background: ${({ theme }) => theme.dark};
    opacity: 0.8;
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.light};
    pointer-events: none;
  }

  ${({ variant, theme }) =>
    variant === 'outlined' &&
    `
    background: transparent;
    color: ${theme.dark};
    border: 1px solid ${theme.dark};

    &:hover {
      background: ${theme.dark};
      box-shadow: none;
      color: ${theme.light};
      border: 1px solid ${theme.dark};
    }

    &:disabled {
      opacity: 0.6;
      background: ${theme.light};
      color: ${theme.dark};
      pointer-events: none;
    }
  `}
`

export const OutlinedButton = styled(Base)`
  background: transparent;
  color: ${({ theme }) => theme.dark};
  border: 1px solid ${({ theme }) => theme.dark};
  transition: all 0.2s ease 0s;

  &:hover {
    background: transparent;
    box-shadow: none;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    background: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.dark};
    pointer-events: none;
  }
`

export const LinkLikeButton = styled.button`
  color: ${({ theme }) => theme.blue};
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Helvetica Neue', sans-serif;

  font-size: 1rem;
  font-style: normal;
  font-weight: 550;
  line-height: 120%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`
