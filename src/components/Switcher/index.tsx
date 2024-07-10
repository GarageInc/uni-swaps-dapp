import React, { useState } from 'react'
import styled, { css } from 'styled-components'

interface SwitcherProps {
  options: string[]
  initialActive?: string
  onSwitch?: (activeOption: string) => void
}

interface OptionProps {
  isActive: boolean
}

const Option = styled.div<OptionProps>`
  display: flex;
  width: 7.5rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  color: ${({ theme }) => theme.text40};
  border: 1px solid ${({ theme }) => theme.inputGrayStroke};
  border-color: transparent;

  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.35rem */
  text-transform: uppercase;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.text100};
      background: ${({ theme }) => theme.white};
      border-color: ${({ theme }) => theme.inputGrayStroke};
    `}
`

const SwitcherContainer = styled.div`
  border-radius: 2rem;
  background: ${({ theme }) => theme.inputDefault};
  padding: 0.25rem 0.375rem;
  align-items: flex-start;
  display: flex;
`

export const Switcher: React.FC<SwitcherProps> = ({ options, initialActive, onSwitch }) => {
  const [activeOption, setActiveOption] = useState(initialActive || options[0])

  const handleSwitch = (option: string) => {
    setActiveOption(option)
    onSwitch?.(option)
  }

  return (
    <SwitcherContainer>
      {options.map((option) => (
        <Option key={option} isActive={activeOption === option} onClick={() => handleSwitch(option)}>
          {option}
        </Option>
      ))}
    </SwitcherContainer>
  )
}
