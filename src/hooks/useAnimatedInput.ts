import { BigNumber } from 'ethers'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getBigNumberValue } from 'utils/getBigNumberValue'
import { ZERO } from 'utils/isZero'

export const useAnimatedInputValue = (initialValue: BigNumber, decimals: number, firstRenderVal: BigNumber) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [value, setBnValue] = useState<BigNumber>(initialValue)
  const [convertedValue, setConvertedValue] = useState<BigNumber>(ZERO)
  const inputRef = useRef<HTMLInputElement>(null)

  const POW = useMemo(() => BigNumber.from(10).pow(decimals), [decimals])

  const incrementValue = useCallback(
    (currentValue: BigNumber) => {
      const newValue = currentValue.add(getBigNumberValue(5, POW)) // Increase the increment step to increase the speed

      if (newValue.lte(firstRenderVal)) {
        setTimeout(() => {
          setBnValue(newValue)
          incrementValue(newValue)
        }, 0.5) // Decrease the timeout delay to increase the speed
      }
    },
    [firstRenderVal, POW]
  )

  const { ref } = useInView({
    threshold: 0,
    onChange: (isVisible) => {
      if (isVisible) {
        inputRef.current && inputRef.current?.focus()
        if (isFirstRender) {
          setIsFirstRender(false)

          setTimeout(() => incrementValue(ZERO), 200) // Add a small delay on the first render
        }
      }
    },
  })

  useEffect(() => {
    if (value.eq(ZERO)) {
      setConvertedValue(ZERO)
      return
    }

    let intervalId: NodeJS.Timeout

    const maxVal = value.gt(convertedValue) ? value : convertedValue

    const less1000 = value.lte(getBigNumberValue(1000, POW))
    const less10000 = convertedValue.lte(getBigNumberValue(10000, POW))

    const divider = getBigNumberValue(less1000 && less10000 ? 200 : 100, POW)
    const step = Math.max(1, maxVal.div(divider).toNumber()) // Adjust this to change the speed

    const intervalTime = less1000 ? 2 : 1 // Adjust this to change the update frequency

    if (convertedValue.lt(value)) {
      intervalId = setInterval(() => {
        setConvertedValue((prevValue) => {
          const newPrevValue = prevValue.add(getBigNumberValue(step, POW))

          return newPrevValue.gt(value) ? value : newPrevValue
        })
      }, intervalTime)
    } else {
      intervalId = setInterval(() => {
        setConvertedValue((prevValue) => {
          const newPrevValue = prevValue.sub(getBigNumberValue(step * 6, POW))

          return newPrevValue.lt(value) ? value : newPrevValue
        }) // Increase the step value to increase the speed of decreasing value
      }, intervalTime)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [convertedValue, value, decimals, POW])

  const setNumberValue = useCallback(
    (v: number) => {
      setBnValue(getBigNumberValue(v, POW))
    },
    [setBnValue, POW]
  )

  return { value, setBnValue, setNumberValue, convertedValue, isFirstRender, ref, inputRef }
}
