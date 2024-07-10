import { GreyCard } from 'components/Card'
import { useCallback, useContext, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import styled, { ThemeContext } from 'styled-components'

import { ReactComponent as X } from '../../assets/svg/close.svg'
import { PopupContent } from '../../state/application/actions'
import { useRemovePopup } from '../../state/application/hooks'
import TransactionPopup from './TransactionPopup'
import WarningPopup from './WarningPopup'

const StyledClose = styled(X)`
  position: absolute;
  right: 15px;
  top: 15px;

  :hover {
    cursor: pointer;
  }
`
const Popup = styled(GreyCard)`
  display: inline-block;
  width: 100%;
  padding: 1.25rem 1rem;
  border-radius: 1.25rem;
  height: fit-content;
  box-shadow: 0px 2px 15px 0px rgba(52, 57, 62, 0.19);
  position: relative;
  overflow: hidden;
  z-index: 1000000;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 290px;

    &:not(:last-of-type) {
      margin-right: 20px;
    }
  `}
`
const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.bg3};
`

const AnimatedFader = animated(Fader)

export default function PopupItem({
  removeAfterMs,
  content,
  popKey,
}: {
  removeAfterMs: number | null
  content: PopupContent
  popKey: string
}) {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    if (removeAfterMs === null) return undefined

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup])

  const theme = useContext(ThemeContext)

  let popupContent

  if ('summary' in content) {
    const { hash, summary } = content
    popupContent = <TransactionPopup hash={hash} success={true} summary={summary} />
  }

  if ('msg' in content) {
    const {
      msg: { title, success, description },
    } = content
    popupContent = <WarningPopup title={title} success={success} description={description} />
  }

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined },
  })

  return (
    <Popup>
      <StyledClose color={theme.text2} onClick={removeThisPopup} />
      {popupContent}
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </Popup>
  )
}
