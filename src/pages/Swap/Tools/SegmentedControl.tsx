/* eslint-disable react-hooks/rules-of-hooks */
import { useLocalStorage } from '@tronweb3/tronwallet-adapter-react-hooks'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
const StyledSegmentedControl = styled.div`
  margin-top: 1.5rem;
  border-radius: 2rem;
  background: var(--INPUT-Default, #f6f9fc);
  padding: 0.25rem 0.3rem;
  position: relative;
  height: 3.1875rem;
  width: 100%;
`
const StyledSegmentedControlContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  top: 0;
  left: 0;
  z-index: 3;
`
const StyledSegmentedControlValue = styled.div<{ active: boolean; width: number }>`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 0.25rem;
  color: ${({ active, theme }) => (active ? theme.text100 : theme.text40)};
  width: ${({ width }) => width}%;
`
const StyledCustomInput = styled.input<{ active: boolean }>`
  font-size: 1rem;
  color: ${({ active, theme }) => (active ? theme.text100 : theme.text40)};
  border: none;
  &:focus {
    outline: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  text-align: center;
  width: 100%;
  position: relative;
`
const StyledCustomDiv = styled.div<{ active: boolean }>`
  font-size: 1rem;
  color: ${({ active, theme }) => (active ? theme.text100 : theme.text40)};
  border: none;
  &:focus {
    outline: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  text-align: center;
  width: 100%;
  position: relative;
`

const StyledCaret = styled(animated.div)<{ width: number }>`
  position: absolute;
  z-index: 1;
  top: 0;
  width: ${({ width }) => width}%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 2rem;
  border: 1px solid #eff2f4;
  background: #fff;
`
const SLIPPAGE_VALUES = [0.3, 0.5, 1, 'Custom'] as const

type SlippageType = (typeof SLIPPAGE_VALUES)[number]

enum SLIPPAGE_TYPES {
  Custom,
  Number,
}

interface SegmentedControlProps {
  onSlippageChange: (value?: number | string) => void
  currentValue?: string | number
}
export const SegmentedControl = ({ onSlippageChange, currentValue }: SegmentedControlProps) => {
  const [type, setType] = useLocalStorage('SLIPPAGE_TYPE', SLIPPAGE_TYPES.Number)
  const inputRef = useRef(null)
  const [selectedValueIndex, setSelectedValueIndex] = useState(SLIPPAGE_VALUES.indexOf(currentValue as SlippageType))

  const segmentedControlRef = useRef<HTMLDivElement | null>(null)
  const refs = SLIPPAGE_VALUES.map(() => useRef<HTMLInputElement | null>(null))
  const [offsets, setOffsets] = useState([])
  const [offsetWidths, setOffsetWidths] = useState([])
  const { x } = useSpring({ x: offsets[selectedValueIndex] || 0 })

  // handle custom slippage
  const [customInputValue, setCustomInputValue] = useState('')
  const onCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(' %', '')
    console.log(value, 'value')

    if (value === '' || value === ' %' || value.split('.').length - 1 > 1) {
      onSlippageChange(0)
      setCustomInputValue('')
      return
    }
    if (value.endsWith('.')) {
      onSlippageChange(Number(value.replaceAll('.', '')))
      setCustomInputValue(value)
      return
    }
    const parsedValue = parseFloat(parseFloat(value).toFixed(2))
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
      onSlippageChange(parsedValue)
      setCustomInputValue(parsedValue.toString())
    }
  }

  const onSlippageClick = (value: string | number, index: number) => {
    setSelectedValueIndex(index)
    if (typeof value === 'number') {
      setType(SLIPPAGE_TYPES.Number)
      onSlippageChange(value)
      return
    }
    setType(SLIPPAGE_TYPES.Custom)
    onSlippageChange(Number(customInputValue) || 0)
  }

  useEffect(() => {
    if (type === SLIPPAGE_TYPES.Custom) {
      setSelectedValueIndex(SLIPPAGE_VALUES.length - 1)
      setCustomInputValue(currentValue as string)
      return
    }
    setSelectedValueIndex(SLIPPAGE_VALUES.indexOf(currentValue as SlippageType))
  }, [])

  useEffect(() => {
    const calculateValues = () => {
      if (!(refs as any)[0]?.current) return
      const parentWidth = (refs as any)[0].current.parentNode.offsetWidth
      setOffsets((refs as any).map((ref: any) => (ref.current.offsetLeft / parentWidth) * 100))
      setOffsetWidths((refs as any).map((ref: any) => (ref.current.offsetWidth / parentWidth) * 100))
    }
    calculateValues()
    // Create a new ResizeObserver instance
    const resizeObserver = new ResizeObserver(calculateValues)

    // Start observing the parent element
    resizeObserver.observe((refs as any)[0].current.parentNode)

    // Cleanup function to stop observing and disconnect the observer
    return () => {
      resizeObserver.disconnect()
    }
  }, [])
  console.log(customInputValue, 'customInputValue')

  return (
    <StyledSegmentedControl ref={segmentedControlRef}>
      <div style={{ position: 'relative' }}>
        <StyledSegmentedControlContainer>
          {SLIPPAGE_VALUES.map((value, index) => (
            <StyledSegmentedControlValue
              width={(offsetWidths[index] / offsetWidths.reduce((acc, curr) => acc + curr, 0)) * 100}
              active={
                (type === SLIPPAGE_TYPES.Number && currentValue === value) ||
                (type === SLIPPAGE_TYPES.Custom && value === 'Custom')
              }
              key={value}
              ref={refs[index]}
              onClick={() => onSlippageClick(value, index)}
            >
              {value !== 'Custom' ? (
                <span>{value} %</span>
              ) : (
                <StyledCustomInput
                  style={{
                    minWidth: '4rem',
                  }}
                  active={type === SLIPPAGE_TYPES.Custom}
                  placeholder={t('Swap.custom')}
                  value={customInputValue ? `${customInputValue} %` : ''}
                  onChange={onCustomInputChange}
                  ref={inputRef}
                />
              )}
            </StyledSegmentedControlValue>
          ))}
        </StyledSegmentedControlContainer>
        <StyledCaret
          // width={100 / SLIPPAGE_VALUES.length}
          width={(offsetWidths[selectedValueIndex] / offsetWidths.reduce((acc, curr) => acc + curr, 0)) * 100}
          style={{
            left: x.to((x) => `${x}%`),
          }}
        >
          <span style={{ opacity: 0 }}>{SLIPPAGE_VALUES[selectedValueIndex]}</span>
        </StyledCaret>
      </div>
    </StyledSegmentedControl>
  )
}
