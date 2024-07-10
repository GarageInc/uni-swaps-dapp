import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { StyledEngineProvider, THEME_ID, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import muiTheme from 'theme/muiTheme'

import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

// eslint-disable-next-line no-restricted-syntax
export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToPhone: 481,
  upToExtraSmall: 769,
  upToTablet: 1025,
  upToSmall: 1366,
  upToMedium: 1536,
  upToLarge: 1920,
  upToExtraLarge: 2560,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator: any, size) => {
    accumulator[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#F4F5FB'
const black = '#282E3F'

function colors(darkMode: boolean): Colors {
  return {
    /* COLORS */
    white: 'rgb(255, 255, 255)',
    dark: '#222528',
    blue: 'rgb(0, 133, 255)',
    green: 'rgb(103, 218, 142)',
    red: 'rgb(255, 64, 87)',
    lightBlue: 'rgb(239, 244, 249)',
    lightGreen: 'rgb(244, 253, 247)',
    lightRed: 'rgb(255, 243, 245)',
    lightOrange: 'rgb(255, 245, 235)',
    divStroke: 'rgb(216, 236, 255)',
    text100: 'rgb(67, 70, 71)',
    text90: 'rgba(67, 70, 71, 0.90)',
    text70: 'rgb(67, 70, 71, .7)',
    text60: 'rgb(67, 70, 71, .6)',
    text50: 'rgba(53, 58, 73, 0.50)',
    text40: 'rgb(67, 70, 71, .4)',
    text30: 'rgb(67, 70, 71, .3)',
    text12: 'rgba(67, 70, 71, 0.12)',
    inputDefault: 'rgb(246, 249, 252)',
    inputActive: 'rgb(235, 243, 251)',
    inputGrayStroke: 'rgb(239, 242, 244)',

    /* GRADIENTS */
    bgGradient: 'linear-gradient(90deg, #FFF7F1 0%, #E7F4FF 100%)',
    bgGradientDark: 'linear-gradient(90deg, #FFECD8 0%, #D2E9FF 94.7%)',
    mobileGradient: 'linear-gradient(90deg, #FFF3E8 0%, #DEF0FF 100%)',
    darkGradient: 'linear-gradient(to bottom, #000000 20%,  rgba(0, 0, 0, 0) 80%, #34393E 80%, rgba(0, 0, 0, 0) 20%,)',

    // base
    black: darkMode ? white : black,

    light: '#F8FAFF',

    dark80: 'rgba(40, 46, 63, 0.80)',
    dark70: 'rgba(40, 46, 63, 0.70)',
    dark40: 'rgba(40, 46, 63, 0.40)',
    dark30: 'rgba(40, 46, 63, 0.30)',
    dark25: 'rgba(40, 46, 63, 0.25)',
    dark15: 'rgba(40, 46, 63, 0.15)',
    dark10: 'rgba(40, 46, 63, 0.10)',
    dark08: 'rgba(40, 46, 63, 0.08)',
    dark06: 'rgba(40, 46, 63, 0.06)',
    dark04: 'rgba(40, 46, 63, 0.04)',
    dark02: 'rgba(40, 46, 63, 0.02)',

    // text
    text1: darkMode ? white : black, // changed
    text2: darkMode ? '#9998B8' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',

    grey: darkMode ? '#33334B' : '#33334B',

    // backgrounds / greys
    bg0: darkMode ? '#F8FAFF' : '#F8FAFF', // changed, block background
    bg1: darkMode ? '#f4f5fc' : '#f4f5fc', // changed, main background
    bg2: darkMode ? '#27273F' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',

    boxShadow: darkMode ? '0px 4px 20px 0px rgba(40, 46, 63, 0.08)' : '0px 4px 20px 0px rgba(40, 46, 63, 0.08)',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',

    //primary colors
    primary1: darkMode ? '#33334b' : '#E8006F',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',

    // other
    red60: 'rgba(252, 96, 124, 0.60)',
    red35: 'rgba(252, 96, 124, 0.35)',
    red25: 'rgba(252, 96, 124, 0.25)',
    red15: 'rgba(252, 96, 124, 0.15)',

    green50: 'rgba(99, 178, 0, 0.50)',
    green35: 'rgba(99, 178, 0, 0.35)',
    green25: 'rgba(99, 178, 0, 0.25)',
    green15: 'rgba(99, 178, 0, 0.15)',

    main: '#609EFC',
    main50: 'rgba(96, 158, 252, 0.50)',
    main35: 'rgba(96, 158, 252, 0.35)',
    main25: 'rgba(96, 158, 252, 0.25)',
    main15: 'rgba(96, 158, 252, 0.15)',

    cian: '#63B200',
    cian35: 'rgba(99, 178, 0, 0.35)',
    cian25: 'rgba(99, 178, 0, 0.25)',
    cian15: 'rgba(99, 178, 0, 0.15)',

    appViolet: '#9B60FC',
    appViolet50: 'rgba(155, 96, 252, 0.50)',
    appViolet35: 'rgba(155, 96, 252, 0.35)',
    appViolet25: 'rgba(155, 96, 252, 0.25)',
    appViolet15: 'rgba(155, 96, 252, 0.15)',

    fuchsia: '#DD60FC',
    fuchsia35: 'rgba(221, 96, 252, 0.35)',
    fuchsia25: 'rgba(221, 96, 252, 0.25)',
    fuchsia15: 'rgba(221, 96, 252, 0.15)',
    fuchsia50: 'rgba(221, 96, 252, 0.50)',

    darkOrange: '#FC7360',
    darkOrange60: 'rgba(252, 115, 96, 0.60)',
    darkOrange35: 'rgba(252, 115, 96, 0.35)',
    darkOrange25: 'rgba(252, 115, 96, 0.25)',
    darkOrange15: 'rgba(252, 115, 96, 0.15)',

    orange: '#FCAB60',
    orange60: 'rgba(252, 171, 96, 0.60)',
    orange35: 'rgba(252, 171, 96, 0.35)',
    orange25: 'rgba(252, 171, 96, 0.25)',
    orange15: 'rgba(252, 171, 96, 0.15)',

    error: '#FF0D47',
    error70: 'rgba(255, 13, 71, 0.7)',
    error10: 'rgba(255, 13, 71, 0.1)',
    error06: 'rgba(255, 13, 42, 0.06)',
  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}
// eslint-disable-next-line import/no-unused-modules -- used in styled.d.ts
export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...theme(darkMode),
  }
}

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()
  const themeObject = useMemo(
    () => ({
      ...getTheme(darkMode),
    }),
    [darkMode]
  )

  return (
    <CacheProvider value={cache}>
      <StyledComponentsThemeProvider theme={themeObject}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={{ [THEME_ID]: muiTheme }}>{children}</MuiThemeProvider>
        </StyledEngineProvider>
      </StyledComponentsThemeProvider>
    </CacheProvider>
  )
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    const { color = 'text2', ...rest } = props
    return <TextWrapper fontWeight={500} color={color} {...rest} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color="primary1" {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color="text1" {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text1" {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color="white" {...props} />
  },
  body(props: TextProps) {
    const { color = 'text1', ...rest } = props
    return <TextWrapper fontWeight={400} fontSize={16} color={color} {...rest} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text100" fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} color="text100" fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color="main" {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color="yellow3" {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text3" {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.text100};
    background: ${({ theme }) => theme.bgGradient};
    font-size: clamp(8px, 0.9vw, 16px);

    ${({ theme }) => theme.mediaWidth.upToTablet`
      background: ${({ theme }) => theme.mobileGradient};
      font-size: 16px;
    `}
  }

  a {
  color: ${({ theme }) => theme.main}; 
  }

  b {
    font-weight: 700;
  }


  .token-sale-fancybox{
    ${({ theme }) => theme.mediaWidth.upToTablet`
      .has-html5video .fancybox__content {
        min-height:calc(100vh - 200px);
      }
    `}
  }
`
