import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'

import RoundedLoader from '../../assets/images/transaction-loader.png'
import DonePic from '../../assets/svg/done.svg'
import ErrorPic from '../../assets/svg/error.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoaderPic = styled.img`
  animation: 2s ${rotate} linear infinite;
  height: 13.75rem;
  width: 13.75rem;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
`

const Text = styled.p`
  color: ${({ theme }) => theme.text70};
  padding: 2.06rem;
  text-align: center;
  font-size: 1.0625rem;
  line-height: 120%;
  position: absolute;
  margin: 0;
`

const DoneSvg = styled.img`
  width: 9.375rem;
  height: 9.375rem;
`

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export function TransactionLoader({
  style,
  done,
  error,
  text,
  className,
}: {
  text?: string
  done?: boolean
  error?: boolean
  style?: React.CSSProperties
  className?: string
}) {
  const { t } = useTranslation()

  text = text || t('transactionStatus.pending')

  if (error) {
    return (
      <Container style={style} className={className}>
        <DoneSvg src={ErrorPic} alt="Error" />
      </Container>
    )
  }

  return (
    <Container style={style} className={className}>
      {done ? (
        <DoneSvg src={DonePic} alt="Done" />
      ) : (
        <>
          <LoaderPic style={style} src={RoundedLoader} alt="Loading..." />
          <Text>{text}</Text>
        </>
      )}
    </Container>
  )
}
