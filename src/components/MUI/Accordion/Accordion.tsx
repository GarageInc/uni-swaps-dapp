import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  headerSlot: ReactNode
  detailsSlot?: ReactNode
  className?: string
}

const Accordion: FC<Props> = ({ headerSlot, detailsSlot, className }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <StyledAccordion expanded={expanded} className={className}>
      <AccordionSummary onClick={() => setExpanded((prev) => !prev)}>{headerSlot}</AccordionSummary>
      <AccordionDetails sx={{ padding: '0.5rem 0 0' }}>{detailsSlot}</AccordionDetails>
    </StyledAccordion>
  )
}

export const AccordionManual: FC<Props & { setExpanded: (v: boolean) => void; expanded: boolean }> = ({
  headerSlot,
  detailsSlot,
  className,
  expanded,
  setExpanded,
}) => {
  return (
    <StyledAccordion expanded={expanded} className={className}>
      <AccordionSummary onClick={() => setExpanded(!expanded)}>{headerSlot}</AccordionSummary>
      <AccordionDetails sx={{ padding: '0.5rem 0 0' }}>{detailsSlot}</AccordionDetails>
    </StyledAccordion>
  )
}

export default Accordion

const StyledAccordion = styled(MuiAccordion)`
  width: 100%;
  border: none;
  box-shadow: none;
  background: transparent;

  .MuiAccordionSummary-root {
    min-height: auto;
    padding: 0;
  }

  .MuiAccordionSummary-content {
    margin: 0;
    min-height: auto;
  }

  .Mui-expanded {
    margin: 0;
  }

  .MuiAccordionDetails-root {
    padding: 1rem 0 0;
  }
`
