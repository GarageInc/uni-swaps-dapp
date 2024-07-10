import { Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  border-radius: 1rem;
  background: ${({ theme }) => theme.white};

  display: flex;
  padding: 0.625rem 1rem;

  color: rgba(67, 70, 71, 0.9);
  font-size: 1.375rem;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.125rem;
  `};
`

const Delimiter = styled.div`
  color: ${({ theme }) => theme.text50};
  font-size: 2.0625rem;
  font-weight: 300;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.5rem;
    line-height: 120%; 
  `};
`

export const Timer = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(endDate) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      }
    }

    return timeLeft
  }, [endDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return (
    <Stack gap=".5rem" direction="row">
      <Box>{timeLeft.days}d</Box>
      <Delimiter>:</Delimiter>
      <Box>{timeLeft.hours}h</Box>
      <Delimiter>:</Delimiter>
      <Box>{timeLeft.minutes}m</Box>
    </Stack>
  )
}
