import { Typography, TypographyProps } from '@mui/material'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { SupportedChainId } from 'constants/chainsinfo'
import { useTokenBalance, useTokenDecimals } from 'hooks/base/token'
import { useActiveWeb3React } from 'hooks/web3'
import { FC, useMemo } from 'react'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

interface ICoin {
  symbol: string
  address?: string
  token_addrs?: {
    [chainId: number]: string
  }
}

type Props = { coin: ICoin; typographyProps?: TypographyProps }

const TokenBalance: FC<Props> = ({ coin, typographyProps }) => {
  const isNative = coin.symbol === TokenSymbol.xfi
  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React()

  const tokenAddress = useMemo(() => coin.address || coin.token_addrs?.[chainId] || '', [coin, chainId])

  if (isNative) {
    return <NativeBalance typographyProps={typographyProps} />
  } else return <CoinBalance tokenAddress={tokenAddress} typographyProps={typographyProps} />
}

const CoinBalance: FC<{ tokenAddress: string; typographyProps?: TypographyProps }> = ({
  tokenAddress,
  typographyProps,
}) => {
  const decimals = useTokenDecimals(tokenAddress)

  const balance = useTokenBalance(tokenAddress) || ZERO

  return <Typography {...typographyProps}>{formatDecimal(balance, 2, decimals)}</Typography>
}

const NativeBalance = ({ typographyProps }: { typographyProps?: TypographyProps }) => {
  const ethBalance = useNativeCurrencyBalance() || ZERO

  return (
    <Typography {...typographyProps} fontSize={13}>
      {formatDecimal(ethBalance, 2, 18)}
    </Typography>
  )
}

export default TokenBalance
