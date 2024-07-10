import { BoxProps } from '@mui/material'
import InfoCircle from 'assets/icons/info-circle.svg'
import { ReactNode } from 'react'

import { FooterLabel, InfoPanel } from './styles'

interface IInfoSection {
  children: ReactNode
}
const InfoSection = ({ children, className }: IInfoSection & BoxProps) => {
  return (
    <InfoPanel className={className}>
      <img src={InfoCircle} />
      <FooterLabel ml={7}>{children}</FooterLabel>
    </InfoPanel>
  )
}

export default InfoSection
