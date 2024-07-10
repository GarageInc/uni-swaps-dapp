import { CSSProperties } from 'react'

// "0x5dfaecf31d771bdc941040308721c6f710a19a4e070a80f5714c9a39ea0c6974"
export type Hash = string

// 1703230230707
export type Date = number

// 'assets/icons/...'
export type Icon = string

// '1'
export type Amount = string

export type StyleProps = {
  padding?: CSSProperties['padding']
  flexDirection?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
}
