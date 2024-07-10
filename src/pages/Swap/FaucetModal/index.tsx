import { Stack } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { Button, TransactionLoader } from 'components'
import Modal from 'components/Modal'
import { fetchCall, useApiCall } from 'hooks/useApiCall'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSwapToolsStore } from 'stores/useSwapStore'
import styled from 'styled-components'

const TokenLogo = styled.img`
  width: 2rem;
  height: 2rem;
`

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.5rem;
    letter-spacing: -0.015rem;
  `}
`

const Description = styled.p`
  color: ${({ theme }) => theme.text90};
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 140%; /* 1.925rem */
  margin: 0;
`
const ErrorText = styled.p`
  color: ${({ theme }) => theme.red};
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 140%; /* 1.925rem */
  margin: 0;
  text-align: center;
`

import { LimitInfo, MetamaskMobileWarning } from './LimitInfo'

const FAUCET_API = 'https://faucet.xswap.ms/'

function secondsToTimer(ms: string, hoursName = 'h', minutesName = 'min') {
  const time = parseInt(ms, 10)

  if (!time || isNaN(time)) return 0

  const minutes = Math.floor(time / 60000)
  const hours = Math.floor(minutes / 60)

  return `${hours > 0 ? `${hours}${hoursName} ` : ''}${minutes % 60 ? `${minutes % 60}${minutesName}` : ''}`
}

interface IUser {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

interface IProfile {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export const FaucetModal = () => {
  const { account } = useWeb3React()

  const [user, setUser] = useState<IUser>()
  const [profile, setProfile] = useState<IProfile>()

  const { isFaucetModalOpen, setIsFaucetModalOpen } = useSwapToolsStore()

  const headers = useMemo(() => {
    return {
      Authorization: `${user?.access_token}`,
    }
  }, [user?.access_token])

  const { data } = useApiCall<{ isError: false; isAvailable: boolean; timeLeft: string }>(
    user?.access_token ? `${FAUCET_API}timer` : undefined,
    fetchCall,
    headers
  )

  const xfiData = useTokenAsset('xfi')

  const [pending, setPending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDone, setIsDone] = useState(false)

  const title = useMemo(() => {
    if (errorMsg) {
      return 'Error!'
    }

    if (pending) {
      return t('faucet.title')
    }

    if (isDone) {
      return t('faucet.done')
    }

    if (data?.isAvailable) {
      return t('faucet.claimTokens')
    }

    return t('faucet.title')
  }, [data?.isAvailable, errorMsg, isDone, pending])

  function closeModal() {
    setIsFaucetModalOpen(false)
  }

  useEffect(() => {
    setIsDone(false)
    setErrorMsg('')
  }, [isFaucetModalOpen])

  const claimXfi = useCallback(async () => {
    setPending(true)
    await fetch(`${FAUCET_API}give-xfi/${account}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

        ...headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        setIsDone(true)
        return response.json()
      })
      .then((data) => {
        if (data.isError) {
          throw new Error('Error from server')
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
        setErrorMsg(error.message)
      })
      .finally(() => {
        setPending(false)
      })
  }, [account, headers])

  const timeLeft = useMemo(() => {
    return data?.timeLeft ? secondsToTimer(data.timeLeft, t('faucet.hours'), t('faucet.minutes')) : null
  }, [data?.timeLeft])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as any),
    onError: (error) => console.log('Login Failed:', error),
  })

  // check is connected with using in-app metamask browser

  const isMetamaskInAppBrowser = useMemo(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    return userAgent.includes('metamask')
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res: any) => {
          setProfile(res.data)
        })
        .catch((err: any) => console.log(err))
    }
  }, [user])

  return (
    <Modal
      isOpenFlag={isFaucetModalOpen}
      onDismissHandler={closeModal}
      header={
        <Stack gap="1rem" direction="row" alignItems="center">
          <TokenLogo src={xfiData?.icon} alt="xfi" />
          <Title>{title}</Title>
        </Stack>
      }
    >
      <Stack gap="1.5rem" marginTop="1.5rem">
        {pending || isDone ? (
          <>
            <TransactionLoader done={title === t('faucet.done')} error={title === 'Error!'} />
            {title === 'Error!' && <ErrorText>{errorMsg}</ErrorText>}
          </>
        ) : (
          <>
            <Description>{t('faucet.description')}</Description>
            <LimitInfo />
          </>
        )}

        {isMetamaskInAppBrowser ? (
          <MetamaskMobileWarning />
        ) : (
          <>
            {profile ? (
              <>
                {isDone ? (
                  <Button variant="outlined" onClick={closeModal}>
                    {t('faucet.close')}
                  </Button>
                ) : (
                  <Button onClick={claimXfi} disabled={pending || !data?.isAvailable || !user?.access_token}>
                    {timeLeft ? <b>{timeLeft}</b> : t('faucet.claimTokens')}
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => {
                  login()
                }}
              >
                {t('faucet.login_google')}
              </Button>
            )}
          </>
        )}
      </Stack>
    </Modal>
  )
}
