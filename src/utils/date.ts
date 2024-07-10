import { CONVERTED_DURATION_UNITS } from 'constants/common'
import { Duration, format } from 'date-fns'
import { DurationUnit } from 'date-fns/types'

function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date as unknown as number)
}

export const fullDate = (date: number, formatString = `dd.LL.yyyy HH:mm:ss`) => {
  let jsDate = new Date(date)

  if (!isValidDate(jsDate)) jsDate = new Date()

  return format(jsDate, formatString)
}

/**
 * @description convert Duration object in simple string
 * @example
 * formattedDuration({months: 1,days: 1}); // '1m 1d'
 * formattedDuration({months: 1,days: 1, seconds: 1}); // '1m 1d'
 * formattedDuration({hours: 1}); // '1h 1m'
 * formattedDuration({}); // '0s'
 */
export const formattedDuration = (duration: Duration) => {
  const keys = Object.keys(duration) as DurationUnit[]

  // check is duration empty or duration has  only seconds
  if (keys.length === 0) return '0s'

  if (keys.length === 1 && 'seconds' in duration) return `${duration.seconds}s`

  const measurementUnitKeys = Object.keys(CONVERTED_DURATION_UNITS) as DurationUnit[]

  const firstKey = keys[0]
  const secondKey = keys[1]

  const firstPart = `${duration[firstKey]}${CONVERTED_DURATION_UNITS[firstKey]}`

  if (secondKey) {
    return `${firstPart} ${duration[secondKey]}${CONVERTED_DURATION_UNITS[secondKey]}`
  } else {
    const firstKeyIndex = measurementUnitKeys.findIndex((value) => value === firstKey)
    const secondKey = measurementUnitKeys[firstKeyIndex + 1] ?? measurementUnitKeys[measurementUnitKeys.length - 1]

    return `${firstPart} 0${CONVERTED_DURATION_UNITS[secondKey]}`
  }
}
