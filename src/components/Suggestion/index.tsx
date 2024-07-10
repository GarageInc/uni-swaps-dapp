import { MouseoverTooltipContent } from 'components/Tooltip'
import React, { useState } from 'react'
import styled from 'styled-components'

// Import your info.svg file here
import infoIcon from './info.svg'
import SmallInfoIcon from './small-info.svg'

const SuggestionContainer = styled.div`
  font-size: 0.875rem;
  line-height: 120%; /* 1.05rem */
`

const InfoIcon = styled.img<{
  width?: string
}>`
  width: ${({ width }) => width || '2rem'};
  aspect-ratio: 1;
  cursor: pointer;
`

export const Suggestion: React.FC<{
  children: React.ReactNode
  size?: 'small' | 'medium'
  replaceIcon?: React.ReactNode
}> = ({ children, size = 'medium', replaceIcon }) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleInfoIconClick = () => {
    setShowPopover(!showPopover)
  }

  const icon = () => {
    switch (size) {
      case 'small':
        return <InfoIcon src={SmallInfoIcon} alt="Info" onClick={handleInfoIconClick} width="1.25rem" />
      case 'medium':
        return <InfoIcon src={infoIcon} alt="Info" onClick={handleInfoIconClick} />
    }
  }

  return (
    <MouseoverTooltipContent
      placement="right-start"
      open={() => setShowPopover(true)}
      close={() => setShowPopover(false)}
      show={showPopover}
      content={
        <SuggestionContainer
          onClick={(e) => {
            e.stopPropagation()
            setShowPopover(!showPopover)
          }}
        >
          {children}
        </SuggestionContainer>
      }
    >
      {replaceIcon ?? icon()}
    </MouseoverTooltipContent>
  )
}
