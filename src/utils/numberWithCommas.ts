import { BigNumber } from '@ethersproject/bignumber'

import { fromWei } from './fromWei'

function numberWithCommas(value: number, precision: number) {
  const fixedNumber = value.toFixed(precision)
  const parts = fixedNumber.split('.')

  const withCommas = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts[1] ? withCommas + '.' + parts[1] : withCommas
}

export const getPrecision = (decimals = 18) => (decimals < 10 ? 6 : 2)

export const formatDecimal = (value: BigNumber | number, precision = 2, decimals = 18, useTreshold = true) => {
  const data = +fromWei(BigNumber.from(value), decimals)
  if (data > 1) {
    return formatNumber(data, precision, useTreshold)
  }

  return data.toFixed(precision)
}

export const formatNumber = (num: number, precision: number, useTreshold = true) => {
  const map = [
    { suffix: 't', threshold: 1e12 },
    { suffix: 'b', threshold: 1e9 },
    { suffix: 'm', threshold: 1e6 },
    { suffix: 'k', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  const found = useTreshold ? map.find((x) => Math.abs(num) >= x.threshold) : false
  if (found) {
    return numberWithCommas(num / found.threshold, precision) + found.suffix
  }

  return numberWithCommas(num, precision)
}
