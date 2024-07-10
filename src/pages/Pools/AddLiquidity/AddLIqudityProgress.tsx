import React from 'react'
import styled from 'styled-components'

// Определение статусов шага с помощью объекта-перечисления
export enum StepStatus {
  CURRENT,
  PENDING,
  COMPLETE,
}

// Стилизованные компоненты
const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  width: 100%;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

const Step = styled.div<{
  status: StepStatus
}>`
  width: fit-content;
  color: ${({ status, theme }) =>
    status === StepStatus.COMPLETE ? theme.green : status === StepStatus.CURRENT ? theme.blue : theme.text60};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.05rem */
  position: relative;
  top: 0.125rem;

  & + div {
    background: ${({ status, theme }) =>
      status === StepStatus.COMPLETE ? theme.green : status === StepStatus.CURRENT ? theme.blue : theme.text60};
  }
`

const StepBar = styled.div<{
  status: StepStatus
}>`
  height: 1px;
  flex-grow: 1;
  background: rgba(67, 70, 71, 0.3);
`

export const AddLiquidityProgress = ({ steps }: { steps: { name: string; status: StepStatus }[] }) => {
  return (
    <ProgressBarContainer>
      {steps.map((step, index) => (
        <React.Fragment key={`${step.name}_${index}`}>
          <Step status={step.status}>
            {step.status === StepStatus.COMPLETE ? (
              <svg
                style={{
                  width: '.7rem',
                  marginRight: '.3rem',
                }}
                viewBox="0 0 11 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.49992L3.83 7.32992L9.5 1.66992"
                  stroke="#67DA8E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              index + 1 + '. '
            )}
            {step.name}
          </Step>
          {index < steps.length - 1 && <StepBar status={steps[index + 1].status} />}
        </React.Fragment>
      ))}
    </ProgressBarContainer>
  )
}
