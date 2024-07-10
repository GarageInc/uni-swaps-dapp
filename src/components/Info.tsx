import styled from 'styled-components'

import InfoCircle from '../assets/images/info-circle.svg'

const InfoCircleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

const Description = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.75px;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 21px;
    line-height: 24px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 16px;
    line-height: 24px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 13px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 13px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 13px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 14px;
    line-height: 18px;
  `}
`

const Info = ({ children }: { children: any }) => {
  return (
    <Description>
      <InfoCircleIcon src={InfoCircle} />
      {children}
    </Description>
  )
}

export default Info
