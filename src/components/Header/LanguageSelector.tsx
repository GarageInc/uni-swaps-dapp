import { FlexContainer } from 'components/Flex'
import { Switcher } from 'components/Switcher'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { animated, useSpring } from 'react-spring'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import styled, { keyframes } from 'styled-components'

import ArrowDownIcon from '../../assets/icons/arrow-down.svg'
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ArrowDown = styled(animated.img)`
  width: 1rem;
  height: 1rem;
  position: relative;
  top: -0.15rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 0.75rem;
    height: 0.75rem;
  `};
`

const Modal = styled.div`
  animation: ${fadeIn} 0.2s ease-in-out;
  border-radius: 1rem;
  background: white;
  box-shadow: 0px 2px 15px 0px rgba(52, 57, 62, 0.19);
  display: inline-flex;
  flex-direction: column;
  height: 6.75rem;
  width: 7.375rem;
  align-items: flex-start;
  position: absolute;
  right: 0;
  top: calc(100% + 0.88rem);
  z-index: 100;
  overflow: hidden;
  & div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.text12};
  }
`
const MenuItem = styled.div`
  display: flex;
  padding: 1rem 2.5rem;
  align-items: flex-start;
  color: ${({ theme }) => theme.text100};
  font-size: 1.125rem;
  line-height: 120%;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #f7fbff;
  }
`

const CurrentLanguage = styled.span`
  font-size: 1.125rem;
  line-height: 120%; /* 1.35rem */
  letter-spacing: -0.01125rem;
  text-transform: uppercase;
`

export function LanguageSelector({ variant }: { variant?: 'desktop' | 'mobile' }) {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language)
  // }

  const node = useRef<HTMLDivElement | null>(null)
  const open = useModalOpen(ApplicationModal.LANGUAGE)
  const toggle = useToggleModal(ApplicationModal.LANGUAGE)
  useOnClickOutside(node, open ? toggle : undefined)

  const rotateAnimation = useSpring({
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    config: {
      duration: 200,
    },
  })

  if (variant === 'mobile') {
    return (
      <Switcher
        options={['EN', 'VI']}
        initialActive={currentLanguage === 'en' ? 'EN' : 'VI'}
        onSwitch={(activeOption) => {
          i18n.changeLanguage(activeOption === 'EN' ? 'en' : 'vi')
        }}
      />
    )
  }

  return (
    <FlexContainer
      ref={node}
      onClick={toggle}
      additionalStyles={{
        gap: '0.5rem',
        width: 'fit-content',
        height: '100%',
        'font-size': '1.125rem',
        'line-height': '120%',
        marginLeft: 'auto',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <CurrentLanguage>{currentLanguage}</CurrentLanguage>
      <ArrowDown style={rotateAnimation} src={ArrowDownIcon} />
      {open && (
        <Modal>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage('en')
            }}
          >
            Eng
          </MenuItem>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage('vi')
            }}
          >
            Việt
          </MenuItem>
        </Modal>
      )}
    </FlexContainer>
  )
}
