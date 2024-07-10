import Loading from 'components/Loading'
import { useTronSaleAddress } from 'constants/app-contracts'
import { useTronWebContract } from 'hooks/tronweb'
import { useIntervalEffect } from 'hooks/useIntervalEffect'
import { useCallback, useState } from 'react'

import { Timer } from './Timer'

const TIMEOUT = 3000

export const useSaleDates = () => {
  const [startTime, setStartTime] = useState<Date | undefined>()
  const [endTime, setEndTime] = useState<Date | undefined>()

  const saleAddress = useTronSaleAddress()
  const contract = useTronWebContract(saleAddress)

  const fetchSaleStartTime = useCallback(async () => {
    if (!saleAddress || !contract) return

    const data = await contract.saleStartTime().call()

    setStartTime(new Date(data * 1000))
  }, [saleAddress, contract])

  useIntervalEffect(fetchSaleStartTime, TIMEOUT)

  const fetchSaleEndTime = useCallback(async () => {
    if (!saleAddress || !contract) return

    const data = await contract.saleEndTime().call()

    setEndTime(new Date(data * 1000))
  }, [saleAddress, contract])

  useIntervalEffect(fetchSaleEndTime, TIMEOUT)

  return { startTime, endTime }
}

export const TimeLeftChecker = () => {
  const { startTime, endTime } = useSaleDates()

  return (
    <Loading loading={!startTime || !endTime}>
      {startTime && endTime ? <Timer startDate={startTime} endDate={endTime} /> : null}
    </Loading>
  )
}
