import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'

const Container = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${({ theme }) => theme.dark15};
  border-radius: 50px;
`

const Filler = styled.div<{ completed: number; color?: ThemeColors }>`
  height: 100%;
  width: ${({ completed }) => completed}%;
  background-color: ${({ theme, color = 'darkOrange' }) => theme[color]}};
  border-radius: inherit;
  transition: width 1s ease-in-out;
`

export const ProgressBar = ({ position, color }: { position?: number; color?: ThemeColors }) => {
  const [status, setStatus] = useState(position ?? 0)

  useEffect(() => {
    let id = 0
    if (typeof position === 'number') {
      setStatus(position <= 100 ? position : 100)
    } else {
      id = window.setInterval(
        () =>
          setStatus((prev) => {
            if (prev >= 100) {
              return prev
            }
            const value = Math.floor(Math.random() * 100) + 1

            return value > prev ? value : prev
          }),
        2000
      )
    }

    return () => {
      clearInterval(id)
    }
  }, [position])

  return (
    <Container>
      <Filler completed={status} color={color} />
    </Container>
  )
}
