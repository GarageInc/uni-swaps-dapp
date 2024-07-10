import { TextField } from '@mui/material'
import { GreyCard } from 'components/Card'
import { Box } from 'components/MUI'
import { Row } from 'components/Row'
import styled, { CSSObject } from 'styled-components'
import { Color } from 'theme/styled'

export const AmountValueInput = styled(TextField)`
  .MuiOutlinedInput-root {
    &.MuiInputBase-adornedStart {
      padding-left: 16px;
    }

    &.MuiInputBase-adornedEnd {
      padding-right: 0;
    }

    .MuiInputAdornment-positionStart {
      margin-right: 12px;
    }

    .MuiInputAdornment-positionEnd {
    }

    .MuiInputAdornment-root {
      max-height: unset;
      height: unset;
    }

    .MuiInputBase-input {
      padding: 0px 0;
      font-size: 1.75rem;
      font-family: 'Helvetica Neue', sans-serif;

      font-style: normal;
      font-weight: 550;
      line-height: 120%; /* 2.1rem */
      letter-spacing: 0.0625rem;
      color: ${({ theme }) => theme.text100};

      ${({ theme }) => theme.mediaWidth.upToTablet`
        font-size: 1.5rem;
      `};

      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      [type='number'] {
        -moz-appearance: textfield;
      }

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      ::placeholder {
        color: ${({ theme }) => theme.text30};
      }

      &.Mui-disabled {
        color: ${({ theme }) => theme.text30};
        -webkit-text-fill-color: ${({ theme }) => theme.text30};
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border-width: 0;
    }
  }
`

export const MaxButton = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 1rem;
  font-style: normal;
  font-weight: 550;
  cursor: pointer;
`

export const InputContainer = styled(Box)<{ isInvalid?: boolean }>`
  flex-direction: column;
  width: 100%;

  background-color: ${({ theme, isInvalid }) => isInvalid && theme.red15};
`

export const BalanceValue = styled.span<{ color?: Color }>`
  font-style: normal;
  color: ${({ theme }) => theme.text40};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
  `};

  ${({ color }) => color && `color: ${color};`}
`

export const AmountBalanceRow = styled(Row)`
  gap: 0.5rem;
  align-items: flex-end;
`

export const WalletIcon = styled.img`
  width: 1.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.125rem;
  `};
`

export const ModalTitle = styled.h2`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.text100};
`

export const TokensListItemBox = styled(GreyCard)`
  padding: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.dark10};
  }
`

export const TokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`

export const TokenIcon = styled.img`
  width: 2rem;
  height: 2rem;
`

export const TokenSymbol = styled.h3`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.text100};
  margin: 0;
  margin-top: 0.15rem;
`

export const TokenName = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.text60};
  margin: 0;
`

export const NoFoundBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
`

export const NoFoundText = styled.p`
  color: ${({ theme }) => theme.text40};
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin: 0;
`

export const AdditionalInfo = styled.div`
  color: ${({ theme }) => theme.text40};
  font-size: 1rem;
  line-height: 120%; /* 1.2rem */
  position: relative;
  top: 0.25rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
  `}
`
export const TokenBadgeBox = styled.button<{
  withoutOptions?: boolean
}>`
  background-color: ${({ theme, withoutOptions }) => (withoutOptions ? 'transparent' : theme.white)};
  font-size: 1.5rem;
  line-height: 120%; /* 1.8rem */
  display: flex;
  padding: ${({ withoutOptions }) => (withoutOptions ? '0' : '0.5rem 1rem 0.5rem 0.75rem')};
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  border: ${({ theme, withoutOptions }) => (withoutOptions ? 'none' : `1px solid ${theme.inputGrayStroke}`)};
  text-transform: uppercase;
  cursor: ${({ withoutOptions }) => (withoutOptions ? 'default' : 'pointer')};
`

export const TokenBadgeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.62rem;
`

export const AngleDown = styled.img`
  width: 1rem;
  height: 1rem;
`

export const PairedTokensIcon = styled.div<{ additionalStyles?: CSSObject }>`
  display: flex;
  align-items: center;

  img {
    width: 1.5rem;
    aspect-ratio: 1;
  }

  img:nth-child(2) {
    margin-left: -0.5rem;
  }

  ${({ additionalStyles }) => additionalStyles}
`
