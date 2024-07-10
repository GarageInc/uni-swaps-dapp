import { Placement } from '@popperjs/core'
import Portal from '@reach/portal'
import React, { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import useInterval from '../../hooks/useInterval'

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  border-radius: 0.75rem;
  background: var(--White, #fff);

  /* тень тултипов */
  box-shadow: 0px 2px 15px 0px rgba(52, 57, 62, 0.19);
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.light};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.light};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }

  &.arrow-top-start {
    left: -5px !important;
    bottom: -5px;

    ::before {
      border-right: none;
      border-top: none;
    }
  }

  &.arrow-top-end {
    left: 5px !important;
    bottom: -5px;

    ::before {
      border-right: none;
      border-top: none;
    }
  }

  &.arrow-bottom-end {
    left: -5px !important;
    top: -5px;

    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement
  className?: string
  onCLose?: () => void
}

export default function Popover({ content, show, children, placement = 'auto', className, onCLose }: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popperElement &&
        !popperElement.contains(event.target as Node) &&
        !referenceElement?.contains(event.target as Node) &&
        show
      ) {
        if (onCLose) {
          event.stopPropagation()
          onCLose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onCLose, popperElement, referenceElement, show])

  return (
    <>
      <ReferenceElement ref={setReferenceElement as any} className={className}>
        {children}
      </ReferenceElement>
      <Portal>
        <PopoverContainer show={show} ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
          {content}
        </PopoverContainer>
      </Portal>
    </>
  )
}
