import { TextFieldProps } from '@mui/material'
import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import { escapeRegExp } from 'utils'

import { IAppToken, TokenSymbol, useAppSelectedCoin } from './useAppCoins'

export type IPickerToken = {
  symbol: TokenSymbol
  address?: string
  name?: string
  decimals?: number
}

export type IAmountInput = TextFieldProps & {
  onMaxClicked?: () => void
  onUserInput?: (input?: string) => void
  max?: BigNumber
  rightToken?: IPickerToken
  rightTokenOptions?: IPickerToken[]
  onChangeRightToken?: (addressOrSymbol: string) => void
  bgColor?: string
  loading?: boolean
  walletIcon?: string
  showBalanceRow?: boolean
  balance?: BigNumber
  decimals?: number
  inputValue?: BigNumber
  label?: string
  validateBalanceExceedsZero?: boolean
  additionalInfo?: string
  tokenBadgeVariant?: 'single' | 'pair'
}

export type IAmountWithMax = IAmountInput & {
  inputValue?: BigNumber
  setInputValue?: (v?: BigNumber) => void
  decimals?: number
  bgColor?: string
  balance?: BigNumber
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
const toNumber = (v: string | number) => (v ? `${+v}` : undefined)

export const useAmountInput = ({ onUserInput, value: propValue, rightToken: rightTokenCoin }: IAmountInput) => {
  const enforcer = useCallback(
    (nextUserInput: string) => {
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        if (onUserInput) {
          const value = toNumber(nextUserInput) || ''
          onUserInput(value)
        }
      }
    },
    [onUserInput]
  )

  const onChange = useCallback(
    (event: any) => {
      const value = event.target.value

      enforcer(value.replace(/,/g, '.'))
    },
    [enforcer]
  )

  const rightToken: IAppToken = useAppSelectedCoin(rightTokenCoin)

  return {
    value: propValue !== undefined && propValue !== null ? +propValue : undefined,
    onChange,
    rightToken,
  }
}
