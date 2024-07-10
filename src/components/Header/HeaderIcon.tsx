import { FC, memo } from 'react'
import styled, { CSSObject } from 'styled-components'

type StyledIconWrapperProps = {
  width?: string
  height?: string
  additionalStyles?: CSSObject
}

const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
  height: ${({ height }) => height || '1.5rem'};
  & svg {
    width: ${({ height }) => height || '1.125rem'};
    height: ${({ height }) => height || '1.5rem'};
  }
  & img {
    width: ${({ height }) => height || '1.5rem'};
    height: ${({ height }) => height || '1.5rem'};
  }
  ${({ additionalStyles }) => additionalStyles}
`

export const HeaderIconSvg = memo((props: StyledIconWrapperProps & { src: FC | string }) => {
  const { src, ...rest } = props

  const Icon = src

  return (
    <StyledIconWrapper {...rest}>
      <Icon />
    </StyledIconWrapper>
  )
})

export const HeaderIconImg = memo((props: StyledIconWrapperProps & { src: string }) => {
  const { src, ...rest } = props

  return (
    <StyledIconWrapper {...rest}>
      <img src={src} alt="" />
    </StyledIconWrapper>
  )
})
