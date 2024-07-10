import { DialogContent, DialogOverlay } from '@reach/dialog'
import { FlexContainer } from 'components/Flex'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { animated, useSpring, useTransition } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled, { css } from 'styled-components'

const AnimatedDialogOverlay = animated(DialogOverlay)
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 1rem;
  `}

  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(40, 46, 63, 0.3);
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, maxWidth, height, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: auto;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0px 3.333px 16.667px 0px rgba(40, 46, 63, 0.08);
    padding: 2rem 1.5rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    ${({ theme }) => theme.mediaWidth.upToTablet`
      padding: 1.5rem 1rem;
      border-radius: 1.5rem;
    `}

    ${({ maxWidth }) =>
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `}

    ${({ maxHeight }) =>
      maxHeight
        ? typeof maxHeight === 'string'
          ? css`
              max-height: ${maxHeight};
            `
          : css`
              max-height: ${maxHeight}vh;
            `
        : css`
            max-height: 90vh;
          `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}

    ${({ height }) =>
      height &&
      css`
        height: ${height};
      `}
    border-radius: 2rem;
  }
`

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  &:focus {
    outline: none;
  }
  width: 1.75rem;
  aspect-ratio: 1;

  svg {
    width: 100%;
    height: 100%;
  }
`

export interface ModalProps {
  isOpenFlag: boolean
  header?: React.ReactNode
  onDismissHandler?: (e?: any) => void
  minHeight?: number | false
  maxHeight?: number | string
  maxWidth?: string
  height?: string
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  withCloseBtn?: boolean
  headerStyle?: React.CSSProperties
  overlayStyle?: React.CSSProperties
}

export default function Modal({
  isOpenFlag,
  header,
  onDismissHandler,
  minHeight = false,
  maxHeight = 90,
  maxWidth = '34.75rem',
  height,
  initialFocusRef,
  children,
  className,
  style,
  headerStyle,
  overlayStyle,
  withCloseBtn = true,
}: ModalProps) {
  const fadeTransition = useTransition(isOpenFlag, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismissHandler && onDismissHandler()
      }
    },
  })

  return (
    <>
      {fadeTransition(
        ({ opacity }, item) =>
          item && (
            <StyledDialogOverlay
              style={{
                opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                ...overlayStyle,
              }}
              onDismiss={onDismissHandler}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                height={height}
                mobile={isMobile}
                className={className}
                style={style}
              >
                <FlexContainer
                  additionalStyles={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    ...headerStyle,
                  }}
                >
                  {header ? header : <div style={{ width: '2rem' }} />}
                  {withCloseBtn && (
                    <CloseBtn onClick={onDismissHandler}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.5 6.50018C22.9556 6.04457 23.4473 5.46393 22.9917 5.00832C22.5361 4.55271 21.9556 5.04452 21.5 5.50013L14 13.0002L6.50003 5.50019C6.04442 5.04457 5.46404 4.55276 5.00843 5.00837C4.55281 5.46398 5.04446 6.04462 5.50007 6.50023L13 14.0002L5.50001 21.5002C5.0444 21.9558 4.55281 22.536 5.00843 22.9916C5.46404 23.4472 6.04442 22.9558 6.50003 22.5002L14 15.0002L21.5001 22.5002C21.9557 22.9558 22.5361 23.4472 22.9917 22.9916C23.4473 22.536 22.9557 21.9558 22.5001 21.5002L15 14.0002L22.5 6.50018Z"
                          fill="#434647"
                          fillOpacity="0.4"
                        />
                      </svg>
                    </CloseBtn>
                  )}
                </FlexContainer>
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
