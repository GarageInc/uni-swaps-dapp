import React, { HTMLProps } from 'react'
import { ArrowLeft, ExternalLink as LinkIconFeather, Trash, X } from 'react-feather'
import { Link } from 'react-router-dom'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, { css, keyframes } from 'styled-components'
import { ThemeColors } from 'theme/styled'

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: keyof string }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

// todo: export each component individually
export const ThemedText = {
  // todo: there should be just one `Body` with default color, no need to make all variations
  BodyPrimary(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={16} color="neutral1" {...props} />
  },
  BodySecondary(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={16} color="neutral2" {...props} />
  },
  BodySmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={14} color="neutral1" {...props} />
  },
  HeadlineSmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={20} lineHeight="28px" color="neutral1" {...props} />
  },
  HeadlineMedium(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={28} color="neutral1" {...props} />
  },
  HeadlineLarge(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={36} lineHeight="44px" color="neutral1" {...props} />
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={36} color="neutral1" {...props} />
  },
  Hero(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={48} color="neutral1" {...props} />
  },
  LabelSmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={14} color="neutral2" {...props} />
  },
  LabelMicro(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={12} color="neutral2" {...props} />
  },
  Caption(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={12} lineHeight="16px" color="neutral1" {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={14} color="white" {...props} />
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={20} color="neutral1" {...props} />
  },
  SubHeaderLarge(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={20} color="neutral1" {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={16} color="neutral1" lineHeight="24px" {...props} />
  },
  SubHeaderSmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={14} color="neutral2" {...props} />
  },
  UtilityBadge(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize="8px" lineHeight="12px" {...props} />
  },
  DeprecatedMain(props: TextProps) {
    return <TextWrapper fontWeight={485} color="neutral2" {...props} />
  },
  DeprecatedLink(props: TextProps) {
    return <TextWrapper fontWeight={485} color="accent1" {...props} />
  },
  DeprecatedLabel(props: TextProps) {
    return <TextWrapper fontWeight={485} color="neutral1" {...props} />
  },
  DeprecatedBlack(props: TextProps) {
    return <TextWrapper fontWeight={485} color="neutral1" {...props} />
  },
  DeprecatedWhite(props: TextProps) {
    return <TextWrapper fontWeight={485} color="white" {...props} />
  },
  DeprecatedBody(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={16} color="neutral1" {...props} />
  },
  DeprecatedLargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={535} fontSize={24} {...props} />
  },
  DeprecatedMediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={535} fontSize={20} {...props} />
  },
  DeprecatedSubHeader(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={14} {...props} />
  },
  DeprecatedSmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={11} {...props} />
  },
  DeprecatedBlue(props: TextProps) {
    return <TextWrapper fontWeight={485} color="accent1" {...props} />
  },
  DeprecatedYellow(props: TextProps) {
    return <TextWrapper fontWeight={485} color="deprecated_yellow3" {...props} />
  },
  DeprecatedDarkGray(props: TextProps) {
    return <TextWrapper fontWeight={485} color="neutral2" {...props} />
  },
  DeprecatedGray(props: TextProps) {
    return <TextWrapper fontWeight={485} color="surface2" {...props} />
  },
  DeprecatedItalic(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={12} fontStyle="italic" color="neutral2" {...props} />
  },
  DeprecatedError({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={485} color={error ? 'critical' : 'neutral2'} {...props} />
  },
}

export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? '20px'};
  height: ${({ size }) => size ?? '20px'};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.main};
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary2)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.darkOrange};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;

  :hover {
    color: #f64562;
  }

  :focus {
    outline: none;
  }

  :active {
    text-decoration: none;
  }
`

const StyledLink = styled.a<{ color?: ThemeColors }>`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme, color = 'darkOrange' }) => theme[color]};
  font-weight: 500;
  align-items: center;
  display: flex;

  :focus {
    outline: none;
  }

  :active {
    text-decoration: none;
  }
`

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`

const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.main};
`

export const TrashIcon = styled(Trash)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`

const rotateImg = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

export const UniTokenAnimated = styled.img`
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target } = event.currentTarget

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    console.log('yo!')
  } else {
    event.preventDefault()
  }
}

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  color,
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string; color?: ThemeColors }) {
  return (
    <StyledLink
      target={target}
      rel={rel}
      href={href}
      onClick={(e) => {
        e.stopPropagation()
        handleClickExternalLink(e)
      }}
      color={color}
      {...rest}
    />
  )
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  )
}

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

const BackArrowLink = styled(StyledInternalLink)`
  color: ${({ theme }) => theme.text1};
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

export const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

export const ClickableStyle = css`
  text-decoration: none;
  cursor: pointer;
`
