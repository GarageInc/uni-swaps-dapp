import { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

export const DropDown = ({
  title,
  children,
  styles,
}: {
  title: string
  children?: React.ReactNode
  styles?: React.CSSProperties
}) => {
  const [open, setOpen] = useState(false)

  const expandAnimation = useSpring({
    maxHeight: open ? '1000vh' : '0',
    opacity: open ? 1 : 0,
    config: {
      duration: 200,
    },
  })

  const rotateAnimation = useSpring({
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    config: {
      duration: 200,
    },
  })

  return (
    <Container style={styles}>
      <Header
        onClick={() => {
          setOpen(!open)
        }}
      >
        {title}
        <Arrow
          style={{
            ...rotateAnimation,
          }}
        >
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.28 6.46655L8.9333 10.8132C8.41997 11.3266 7.57997 11.3266 7.06664 10.8132L2.71997 6.46655"
              stroke="#434647"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Arrow>
      </Header>
      <Body style={expandAnimation}>{children}</Body>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  gap: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.divStroke};
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  padding: 1.25rem 1rem 0;

  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`
const Arrow = styled(animated.div)`
  width: 1rem;
  height: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`

const Body = styled(animated.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 1rem 1.25rem;

  max-height: 0;
  will-change: max-height;
`
