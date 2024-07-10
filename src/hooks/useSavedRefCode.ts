import { useTronReferralsAddress } from 'constants/app-contracts'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useTronWebContract } from './tronweb'
import { useIntervalEffect } from './useIntervalEffect'
import { useLocalStorage } from './useLocalStorage'

const urlParams = new URLSearchParams(window.location.search)

export const useSavedRefCode = () => {
  const [refCode, setRefCode] = useLocalStorage<string>('refCode', '')
  const [loading, setLoading] = useState(false)
  const [isCodeAvailable, setIsCodeAvailable] = useState(false)
  const [lastCheckedCode, setLastCheckedCode] = useState<string>()

  const refAddress = useTronReferralsAddress()
  const refContract = useTronWebContract(refAddress)

  const checkCode = useCallback(
    async (refCodeText: string): Promise<boolean> => {
      if (!refCodeText || lastCheckedCode === refCodeText) {
        return isCodeAvailable
      }

      setLoading(true)
      try {
        if (!refCodeText || !refContract) {
          setLoading(false)
          setIsCodeAvailable(false)
          return false
        }

        const codeHash = await refContract.getReferralCodeHash(refCodeText).call()

        const result = await refContract.isReferralCodeExist(codeHash).call()

        console.log('refCode setIsCodeAvailable 1', result, refCodeText, codeHash)
        setIsCodeAvailable(result)

        setLoading(false)

        setLastCheckedCode(refCodeText)

        return result
      } catch (e) {
        console.error('refCode Failed to check referral code', e)
        return false
      }
    },
    [refContract, isCodeAvailable, lastCheckedCode]
  )

  const checkHandler = useCallback(() => {
    checkCode(refCode)
  }, [checkCode, refCode])

  useIntervalEffect(checkHandler, 1000)

  const handleChangeRefCode = useCallback(
    (code: string) => {
      setRefCode(code)
    },
    [setRefCode]
  )

  return {
    refCode,
    isCodeAvailable,
    setRefCode: handleChangeRefCode,
    loading,
    refContract,
    checkCode,
  }
}

export const useReferralCodeFromParams = () => {
  const { setRefCode } = useSavedRefCode()

  const code = useMemo(() => {
    return urlParams.get('refCode')
  }, [])

  useEffect(() => {
    if (code) {
      setRefCode(code)
    }
  }, [code, setRefCode])

  return code
}
