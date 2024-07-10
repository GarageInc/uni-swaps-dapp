import React, { useCallback } from 'react'
import styled from 'styled-components'

import { escapeRegExp } from '../../utils'

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red : theme.text2)};
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  text-align: right;

  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  width: 100%;
  padding: 10px 25px;
  border-radius: 50px;

  border: 2px solid transparent;
  :focus {
    border: 2px solid #f64562;
    outline: none;
  }

  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  width: 100%;
  padding: 10px 25px;
  border-radius: 50px;
  border: 2px solid transparent;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 30px;
    line-height: 38px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 22px;
    line-height: 30px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 18px;
    line-height: 24px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 18px;
    line-height: 24px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
    line-height: 22px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px;
    line-height: 18px;
  `}

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
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const toNumber = (v: string | number) => `${+v}`

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  max,
  ...rest
}: {
  value?: string | number
  onUserInput?: (input: string) => void
  error?: boolean
  fontSize?: string
  align?: 'right' | 'left'
  max?: any
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = useCallback(
    (nextUserInput: string) => {
      if (nextUserInput === '' || (typeof nextUserInput === 'string' && inputRegex.test(escapeRegExp(nextUserInput)))) {
        onUserInput && onUserInput(toNumber(nextUserInput))
      }
    },
    [onUserInput]
  )

  return (
    <StyledInput
      {...rest}
      max={max}
      value={value}
      onChange={(event: any) => {
        const value = event.target.value

        if (max) {
          if (+value > +max) {
            const newMax = typeof max === 'string' ? max.replace(/,/g, '.') : max
            enforcer(newMax)
            return
          }
        }

        enforcer(value.replace(/,/g, '.'))
      }}
      // universal input options
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="number"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})

export const NumericalInputStyled = styled(Input)`
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  width: 100%;
  padding: 10px 25px;
  border-radius: 50px;
  color: ${({ theme }) => theme.text2};

  border: 2px solid transparent;
  :focus {
    border: 2px solid #f64562;
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 30px;
    line-height: 38px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 22px;
    line-height: 24px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 18px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 18px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
    line-height: 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px;
    line-height: 16px;
  `}
`

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
