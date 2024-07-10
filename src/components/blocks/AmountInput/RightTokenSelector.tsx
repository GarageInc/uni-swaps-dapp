import { Stack } from '@mui/material'
import Modal from 'components/Modal'
import { Search } from 'components/Search'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { usePairInfo } from 'pages/Swap/utils'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AngleDownIcon from '../../../assets/svg/angle-down.svg'
import {
  AngleDown,
  ModalTitle,
  NoFoundBlock,
  NoFoundText,
  PairedTokensIcon,
  TokenBadgeBox,
  TokenBadgeInfo,
  TokenIcon,
  TokenInfo,
  TokenName,
  TokensListItemBox,
  TokenSymbol,
} from './styles'
import { IPickerToken } from './useAmountInput'
import { IAppToken } from './useAppCoins'

interface IRightTokenSelector {
  value: IAppToken
  options?: IPickerToken[]
  tokenBadgeVariant?: 'single' | 'pair'
  onChangeRightToken?: (addressOrSymbol: string) => void
}

export const RightTokenSelector = ({
  value,
  options,
  tokenBadgeVariant = 'single',
  onChangeRightToken,
}: IRightTokenSelector) => {
  console.log('🚀 ~ RightTokenSelector ~ tokenBadgeVariant:', tokenBadgeVariant)
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const withoutOptions = !options || options.length === 0

  function toggle() {
    setIsOpen((prev) => !prev)
  }

  const filteredOptions = useMemo(() => {
    return options?.filter((item) => {
      return (
        item.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }, [options, searchValue])

  return (
    <>
      <Modal
        header={<ModalTitle>{t('tokenSelector.title')}</ModalTitle>}
        isOpenFlag={isOpen}
        onDismissHandler={toggle}
        height="70vh"
        maxHeight="49rem"
      >
        <Search
          inputProps={{
            placeholder: t('tokenSelector.search'),
            value: searchValue,
            onChange: (e) => setSearchValue(e.target.value),
          }}
          style={{ margin: '1.5rem 0' }}
        />
        <Stack gap=".5rem" maxHeight="100%" overflow="auto">
          {filteredOptions?.map((item, index) => (
            <TokensListItem
              key={index}
              item={item}
              selected={value.symbol.toLowerCase() === item.symbol.toLowerCase()}
              onClick={() => {
                onChangeRightToken?.(item.address ? item.address : item.symbol)
                toggle()
              }}
            />
          ))}
          {filteredOptions?.length === 0 && <NoFound />}
        </Stack>
      </Modal>
      {tokenBadgeVariant === 'single' ? (
        <TokensBadge item={value} onClick={toggle} withoutOptions={withoutOptions} />
      ) : (
        <PairedTokensBadge item={value} onClick={toggle} withoutOptions={withoutOptions} />
      )}
    </>
  )
}

const TokensListItem = ({
  item,
  selected,
  onClick,
}: {
  item: IPickerToken
  selected?: boolean
  onClick: () => void
}) => {
  const tokenData = useTokenAsset(item.address ? item.address : item.symbol)

  return (
    <TokensListItemBox onClick={onClick}>
      <TokenInfo>
        <TokenIcon
          src={tokenData?.icon}
          alt={item.symbol}
          onError={(e) => {
            e.currentTarget.src = '/images/tokens/unknown.png'
          }}
        />
        <div>
          <TokenSymbol>{item.symbol}</TokenSymbol>
          <TokenName>{tokenData?.name}</TokenName>
        </div>
      </TokenInfo>
      {selected && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12L9.32824 16L18 8"
            stroke="#67DA8E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </TokensListItemBox>
  )
}

const TokensBadge = ({
  item,
  withoutOptions,
  onClick,
}: {
  withoutOptions: boolean
  item: IPickerToken
  onClick: () => void
}) => {
  const tokenData = useTokenAsset(item.address ? item.address : item.symbol)

  return (
    <TokenBadgeBox withoutOptions={withoutOptions} onClick={!withoutOptions ? onClick : undefined}>
      <TokenBadgeInfo>
        <TokenIcon
          src={tokenData?.icon}
          alt={item.symbol}
          onError={(e) => {
            e.currentTarget.src = '/images/tokens/unknown.png'
          }}
        />
        <TokenSymbol>{item.symbol}</TokenSymbol>
      </TokenBadgeInfo>
      {withoutOptions ? null : <AngleDown src={AngleDownIcon} alt="arrow" />}
    </TokenBadgeBox>
  )
}

const PairedTokensBadge = ({
  item,
  withoutOptions,
  onClick,
}: {
  item: IPickerToken
  withoutOptions: boolean
  onClick: () => void
}) => {
  const { token0R, token1R } = usePairInfo(item.address ?? '')

  const inputToken0 = token0R.result?.toString().toLowerCase()
  const inputToken1 = token1R.result?.toString().toLowerCase()

  const token0Data = useTokenAsset(inputToken0)
  const token1Data = useTokenAsset(inputToken1)

  return (
    <TokenBadgeBox withoutOptions={withoutOptions} onClick={!withoutOptions ? onClick : undefined}>
      <TokenBadgeInfo>
        <PairedTokensIcon>
          <img
            src={token0Data?.icon}
            alt={token0Data?.symbol}
            onError={(e) => {
              e.currentTarget.src = '/images/tokens/unknown.png'
            }}
          />
          <img
            src={token1Data?.icon}
            alt={token1Data?.symbol}
            onError={(e) => {
              e.currentTarget.src = '/images/tokens/unknown.png'
            }}
          />
        </PairedTokensIcon>
        <TokenSymbol>LP</TokenSymbol>
      </TokenBadgeInfo>
      {withoutOptions ? null : <AngleDown src={AngleDownIcon} alt="arrow" />}
    </TokenBadgeBox>
  )
}

const noop = () => {
  return
}

const NoFound = () => {
  const { t } = useTranslation()

  return (
    <NoFoundBlock>
      <NoFoundText>{t('tokenSelector.noResults')}</NoFoundText>
      <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.5 57.1252C18.5277 57.1252 5.16663 55.5 5.16663 43.6877C5.16663 31.146 17.7083 28.4585 21.2916 28.4585C23.0833 22.1877 26.6666 12.3335 41 12.3335C53.5416 12.3335 58.9166 19.5002 60.7083 25.771C60.7083 25.771 76.8333 27.5627 76.8333 42.7918C76.8333 55.5 65.6666 57.1252 58.5 57.1252M49.9583 48.1668L32.0416 66.0835M32.0416 48.1668L49.9583 66.0835"
          stroke="#434647"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </NoFoundBlock>
  )
}
