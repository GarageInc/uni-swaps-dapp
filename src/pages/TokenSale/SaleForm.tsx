import { Stack } from '@mui/material'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { API_URL } from 'api/api'
import { Button, Dots, TextInput } from 'components'
import { ApproveCheckerSale } from 'components/Approval/ApproveTx'
import { AmountInputTRCToken } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { useTronSaleAddress, useTronUSDTAddress } from 'constants/app-contracts'
import { ZERO_HASH } from 'constants/misc'
import { BigNumber } from 'ethers'
import { useTronWebContract } from 'hooks/tronweb'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EmailInfo } from './EmailInfo'
import { InfoBlock } from './InfoBlock'

async function getApiHashFor(email: string) {
  // @ts-ignore
  return fetch(API_URL + '/encode_message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  }).then((r) => r.json())
}

const stringToHex = (str: string) => {
  return '0x' + str
}

export enum TX_STATE {
  SUCCESS = 'success',
  ERROR = 'error',
  UNKNOWN = 'unknown',
}

export default function SaleForm({
  amount,
  setAmount,
  pending,
  setPending,
  setSuccess,
  refContract,
  refCode,
  isCodeAvailable,
  loading,
}: {
  amount?: BigNumber
  setAmount: (v: BigNumber) => void
  setPending: (v: boolean) => void
  pending: boolean
  setSuccess: (v: TX_STATE) => void
  refContract?: any
  refCode?: string
  isCodeAvailable: boolean
  loading: boolean
}) {
  const [email, setEmail] = useState<string>('')

  const { t } = useTranslation()

  const handleChange = useCallback(
    (v: any) => {
      setAmount(v)
    },
    [setAmount]
  )

  const noValue = !amount || amount.isZero()

  const { address } = useWallet()

  const saleAddress = useTronSaleAddress()

  const contract = useTronWebContract(saleAddress)

  const action = useCallback(async () => {
    if (amount && email && contract) {
      setPending(true)

      let refCodeHash = ZERO_HASH
      if (refContract && refCode && isCodeAvailable) {
        refCodeHash = (await refContract?.getReferralCodeHash(refCode).call()) as string
      }

      const hash = (await getApiHashFor(email)).message

      contract
        .buy(amount, stringToHex(hash), refCodeHash)
        .send()
        .then((res: any) => {
          setSuccess(TX_STATE.SUCCESS)
        })
        .catch((error: Error) => {
          console.debug('Failed to send token', error)
          setSuccess(TX_STATE.ERROR)
          throw error
        })
        .finally(() => {
          setPending(false)
        })
    }
  }, [amount, email, contract, setPending, setSuccess, refCode, refContract, isCodeAvailable])

  const ConfirmBlock = useMemo(() => {
    return (
      <>
        {noValue ? (
          <Button disabled={noValue}>{t('TokenSale.EnterAmount')}</Button>
        ) : (
          <Button onClick={action} disabled={!!pending || loading}>
            {loading ? <Dots>{t('referrals.loading')}</Dots> : t('TokenSale.Invest')}
          </Button>
        )}
      </>
    )
  }, [noValue, t, action, pending, loading])

  const tronUsdtAddress = useTronUSDTAddress()

  const rightToken = useMemo(() => {
    return {
      symbol: 'USDT' as TokenSymbol,
      address: tronUsdtAddress,
    }
  }, [tronUsdtAddress])

  return (
    <>
      <Stack
        gap=".75rem"
        style={{
          marginBottom: '1.5rem',
        }}
      >
        <AmountInputTRCToken
          inputValue={amount}
          setInputValue={handleChange}
          disabled={!!pending}
          rightToken={rightToken}
          showBalanceRow={!!address}
          decimals={6}
        />
        <TextInput
          placeholder="email@example.com"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value)
          }}
        />
        <EmailInfo />
        <InfoBlock />
      </Stack>

      {!address ? (
        <Button disabled={true}>{t('TokenSale.PleaseConnect')}</Button>
      ) : !email ? (
        <Button disabled={true}>{t('TokenSale.PleaseEnterEmail')}</Button>
      ) : (
        <ApproveCheckerSale border={amount} token={tronUsdtAddress}>
          {ConfirmBlock}
        </ApproveCheckerSale>
      )}
    </>
  )
}
