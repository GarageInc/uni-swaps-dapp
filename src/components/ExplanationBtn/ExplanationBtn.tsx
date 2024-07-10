import questionIcon from 'assets/icons/question.svg'
import questionHoveredIcon from 'assets/icons/question-hover.svg'
import { MouseoverTooltipContent } from 'components/Tooltip'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { ReactNode, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

const SettingsBtn = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.dark04};
  display: flex;
  cursor: pointer;
`
const SettingsIcon = styled.img`
  margin: auto;
`

export const ExplanationBtn = ({ title, children }: { title: string; children?: ReactNode }) => {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  const node = useRef<HTMLDivElement>()

  const onHide = useCallback(() => {
    setShow(false)
  }, [])

  const toggle = useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  useOnClickOutside(node, onHide)

  return (
    <MouseoverTooltipContent content={title} placement="bottom-start" open={open} close={close} show={show}>
      {children || (
        <SettingsBtn onClick={toggle}>
          <SettingsIcon src={show ? questionHoveredIcon : questionIcon}></SettingsIcon>
        </SettingsBtn>
      )}
    </MouseoverTooltipContent>
  )
}
