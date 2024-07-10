import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import SWAToken from 'assets/svg/swa-token.svg'
import { Button, Dots, FlexContainer } from 'components'
import Modal from 'components/Modal'
import { t } from 'i18next'
import { InvalidRefCodeWarning } from 'pages/Swap/FaucetModal/LimitInfo'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const InvalidRefCodeWarningStyled = styled(InvalidRefCodeWarning)`
  margin-top: 1rem;
`

interface IReferralModalProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
  refCode: string
  setRefCode: (code: string) => void
  loading: boolean
  isClosedManually: boolean
  onClosedManually: () => void
  checkCode: (code: string) => Promise<boolean>
}

const MAX_ATTEMTS = 10

export const ReferralModal = ({
  open,
  onOpen,
  onClose,
  refCode,
  setRefCode,
  loading,
  isClosedManually,
  onClosedManually,
  checkCode,
}: IReferralModalProps) => {
  const [inputRefCode, setInputRefCode] = useState('')

  const [loadingCheck, setLoadingCheck] = useState(false)
  const [isCodeAvailableLocal, setIsCodeAvailableLocal] = useState(true)

  useEffect(() => {
    setInputRefCode(refCode)
  }, [refCode])

  const handleApply = useCallback(async () => {
    let attempts = 0

    setLoadingCheck(true)
    while (attempts < MAX_ATTEMTS) {
      try {
        const result = await checkCode(inputRefCode)
        setIsCodeAvailableLocal(result)

        if (result) {
          onClose()
          setRefCode(inputRefCode)
        }

        break
      } catch {
        // sleep 300ms
        await new Promise((resolve) => setTimeout(resolve, 300))
        attempts++
      }
    }
    setLoadingCheck(false)
  }, [checkCode, setRefCode, inputRefCode, onClose])

  const { address } = useWallet()

  useEffect(() => {
    if (!refCode && !isClosedManually && address) {
      onOpen()
    }
  }, [refCode, onOpen, isClosedManually, address])

  return (
    <Modal
      isOpenFlag={open}
      onDismissHandler={onClose}
      style={{
        boxShadow: 'none',
      }}
      header={
        <FlexContainer
          style={{
            justifyContent: 'flex-start',
            gap: '1rem',
          }}
        >
          <img src={SWAToken} alt="SWA Token" />
          <ModalTitle>{loading ? <Dots>{t('referrals.title')}</Dots> : <>{t('referrals.title')}</>}</ModalTitle>
        </FlexContainer>
      }
      headerStyle={{
        alignItems: 'center',
      }}
      overlayStyle={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(15px)',
      }}
    >
      <FlexContainer
        style={{
          margin: '2rem 0',
          gap: '1rem',
          flexDirection: 'column',
        }}
      >
        <Description>{t('referrals.description')}</Description>
        <Input
          type="text"
          placeholder={t('referrals.enter')}
          value={inputRefCode}
          onChange={(e) => {
            setInputRefCode(e.target.value)
          }}
        />
      </FlexContainer>
      <FlexContainer
        style={{
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            onClose()
            onClosedManually()
          }}
        >
          {t('referrals.skip')}
        </Button>
        <Button disabled={loading || loadingCheck} onClick={handleApply}>
          {loading || loadingCheck ? <Dots>{t('referrals.loading')}</Dots> : <>{t('referrals.apply')}</>}
        </Button>
      </FlexContainer>

      {inputRefCode && !isCodeAvailableLocal && !loading && !loadingCheck && <InvalidRefCodeWarningStyled />}
    </Modal>
  )
}

const ModalTitle = styled.h2`
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.01875rem;
  margin: 0;
`
const Description = styled.p`
  margin: 0;
  font-size: 1.375rem;
  line-height: 140%; /* 1.925rem */
  color: ${({ theme }) => theme.text90};
`
const Input = styled.input`
  display: flex;
  padding: 1rem 1.25rem;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid rgba(67, 70, 71, 0.2);
  color: ${({ theme }) => theme.text100};
  font-size: 1.125rem;
  line-height: 120%; /* 1.35rem */

  :focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.text100};
  }

  ::placeholder {
    color: ${({ theme }) => theme.text40};
  }
`
