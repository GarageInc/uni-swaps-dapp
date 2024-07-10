import { InputAdornment, InputProps, Stack } from '@mui/material'
import walletSvg from 'assets/icons/wallet.svg'
import { RightTokenSelector } from 'components/blocks/AmountInput/RightTokenSelector'
import {
  AdditionalInfo,
  AmountBalanceRow,
  AmountValueInput,
  BalanceValue,
  InputContainer,
  MaxButton,
  WalletIcon,
} from 'components/blocks/AmountInput/styles'
import { IAmountInput, IAmountWithMax, useAmountInput } from 'components/blocks/AmountInput/useAmountInput'
import { GreyCard } from 'components/Card'
import { Box } from 'components/MUI'
import { RowBetween } from 'components/Row'
import { BigNumber } from 'ethers'
import { useTokenBalance, useTokenDecimals, useTRCTokenBalance } from 'hooks/base/token'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme/theme'
import { fromWei } from 'utils/fromWei'
import { getBigNumberValue } from 'utils/getBigNumberValue'
import { ZERO } from 'utils/isZero'
import { formatDecimal, getPrecision } from 'utils/numberWithCommas'

import { TokenSymbol } from './useAppCoins'

/**
 * Amount Input
 * @constructor
 */
const AmountInput = (props: IAmountInput) => {
  const { t } = useTranslation()

  const {
    loading,
    onMaxClicked,
    max,
    placeholder,
    rightTokenOptions,
    tokenBadgeVariant,
    onChangeRightToken,
    balance,
    decimals,
    label,
    ...rest
  } = props
  const { value, onChange, rightToken } = useAmountInput(props)

  const isMobile = useIsMobileDevice()

  const { walletIcon, showBalanceRow = true, validateBalanceExceedsZero = true } = props

  const maxDisabled = !max || max.isZero()

  const isInvalid = validateBalanceExceedsZero && max && props.inputValue && props.inputValue.gt(max)

  const inputProps = useMemo(() => {
    const result: InputProps = {}

    if (rightToken) {
      result.endAdornment = (
        <InputAdornment position="end">
          {rightToken ? (
            <RightTokenSelector
              value={rightToken}
              options={rightTokenOptions}
              tokenBadgeVariant={tokenBadgeVariant}
              onChangeRightToken={onChangeRightToken}
            />
          ) : (
            <Box width={4} />
          )}
        </InputAdornment>
      )
    }
    return result
  }, [rightToken, rightTokenOptions, tokenBadgeVariant, onChangeRightToken])

  const [focused, setFocused] = useState(false)

  const handleOnFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const hasBalanceValue = max || balance

  return (
    <GreyCard
      gap="16px"
      isInvalid={showBalanceRow ? isInvalid : false}
      style={{
        padding: '1.5rem 1rem',
      }}
    >
      {label && (
        <TYPE.body fontWeight={400} color="dark40">
          {label}
        </TYPE.body>
      )}
      <InputContainer>
        <AmountValueInput
          error={isInvalid}
          InputProps={inputProps}
          inputProps={{
            // universal input options
            inputMode: 'decimal',
            autoComplete: 'off',
            autoCorrect: 'off',
            // text-specific options
            type: 'number',
            pattern: '^[0-9]*[.,]?[0-9]*$',
            placeholder: placeholder || '0.0',
            minLength: 1,
            maxLength: 79,
            spellCheck: 'false',
            max: showBalanceRow ? max : Number.MAX_SAFE_INTEGER,
            value,
            min: 0,
          }}
          placeholder={loading ? 'Loading...' : placeholder || '0.0'}
          value={value}
          onChange={(event) => {
            focused ? onChange(event) : undefined
          }}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        />
        <RowBetween marginTop={isMobile ? '1rem' : '0.75rem'}>
          {showBalanceRow && hasBalanceValue ? (
            <RowBetween>
              <Stack>
                {isInvalid && (
                  <BalanceValue color="red">
                    <b>{t('Swap.exceedsBalance')}</b>
                  </BalanceValue>
                )}
                {props.additionalInfo && <AdditionalInfo>{props.additionalInfo}</AdditionalInfo>}
              </Stack>

              <AmountBalanceRow alignItems="flex-end" flex="1" justify="flex-end">
                <WalletIcon src={walletIcon || walletSvg} />

                <BalanceValue>{formatDecimal(max || balance || ZERO, getPrecision(decimals), decimals)}</BalanceValue>
                {onMaxClicked && !maxDisabled && <MaxButton onClick={onMaxClicked}>{t('Swap.max')}</MaxButton>}
              </AmountBalanceRow>
            </RowBetween>
          ) : null}
        </RowBetween>
      </InputContainer>
    </GreyCard>
  )
}

const AmountInputWithMax = ({ inputValue, setInputValue, decimals = 18, ...rest }: IAmountWithMax) => {
  const inputAsNumber = useMemo(() => {
    return inputValue === undefined ? undefined : +fromWei(inputValue || ZERO, decimals)
  }, [inputValue, decimals])

  const onInputHandler = useCallback(
    (val: any) => {
      setInputValue &&
        setInputValue(val ? getBigNumberValue(val ? +val : 0, BigNumber.from(10).pow(decimals)) : undefined)
    },
    [decimals, setInputValue]
  )

  const maxValue = rest.max || rest.balance

  const onMaxHandler = useCallback(() => {
    setInputValue && setInputValue(maxValue)
  }, [maxValue, setInputValue])

  return (
    <AmountInput
      value={inputAsNumber}
      onUserInput={onInputHandler}
      max={maxValue}
      onMaxClicked={onMaxHandler}
      decimals={decimals}
      inputValue={inputValue}
      {...rest}
    />
  )
}

type WithoutMaxAndBalance = Omit<IAmountWithMax, 'max'>

export const AmountInputWithBalance = (props: WithoutMaxAndBalance) => {
  if (props.rightToken?.address === TokenSymbol.xfi) return <AmountInputNativeToken {...props} />
  else return <AmountInputPlainToken {...props} />
}

const AmountInputNativeToken = (props: WithoutMaxAndBalance) => {
  const nativeBalance = useNativeCurrencyBalance()
  return <AmountInputWithMax {...props} max={nativeBalance} decimals={18} />
}

const AmountInputPlainToken = (props: WithoutMaxAndBalance) => {
  const balance = useTokenBalance(props.rightToken?.address)
  const decimals = useTokenDecimals(props.rightToken?.address)

  return <AmountInputWithMax {...props} max={balance} decimals={decimals} />
}

export const AmountInputTRCToken = (props: WithoutMaxAndBalance) => {
  const balance = useTRCTokenBalance(props.rightToken?.address)

  return <AmountInputWithMax {...props} max={balance} loading={!balance} disabled={props.disabled} />
}
