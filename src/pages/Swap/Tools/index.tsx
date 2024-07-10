import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSpring } from 'react-spring'
import { useSwapToolsStore } from 'stores/useSwapStore'

import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg'
import FaucetIcon from '../../../assets/svg/faucet.svg'
import GearIcon from '../../../assets/svg/gear.svg'
import QuestionIcon from '../../../assets/svg/question.svg'
import { SegmentedControl } from './SegmentedControl'
import { BackBtn, BackBtnArrow, HeaderRow, Icon, RoundedButton, Text, TextWrapper, Title, ToolsCard } from './styles'
import { WarningBlock } from './WarningBlock'

export const Tools = ({
  slippage,
  onSlippageChange,
  mainRef,
}: {
  slippage?: number | string
  onSlippageChange: (value?: number | string) => void
  mainRef: React.RefObject<HTMLDivElement>
}) => {
  const isMobile = useIsMobileDevice()
  const { currentTool, setCurrentTool, setIsFaucetModalOpen } = useSwapToolsStore()

  const [activeTab, setActiveTab] = useState<'slippage' | 'help' | undefined>()

  useEffect(() => {
    if (isMobile && currentTool) {
      if (currentTool === 'slippage') {
        setActiveTab('slippage')
      } else {
        setActiveTab('help')
      }
    }
  }, [currentTool, isMobile])
  const expandAnimationProps = useMemo(() => {
    if (isMobile) {
      return {
        maxWidth: '100%',
        maxHeight: '100%',
      }
    }

    return {
      maxWidth: activeTab ? '20.75rem' : '5.65rem',
      maxHeight: activeTab ? '25rem' : '15.8rem',
    }
  }, [activeTab, isMobile])
  const expandAnimation = useSpring(expandAnimationProps)

  const Content = useMemo(() => {
    switch (activeTab) {
      case 'slippage':
        return (
          <Slippage
            slippage={slippage}
            onSlippageChange={onSlippageChange}
            onBack={() => {
              if (isMobile && mainRef.current) {
                mainRef.current.style.transform = 'translateX(0)'
                return
              }
              setActiveTab(undefined)
            }}
          />
        )
      case 'help':
        return (
          <Help
            onBack={() => {
              if (isMobile && mainRef.current) {
                mainRef.current.style.transform = 'translateX(0)'
                setCurrentTool(undefined)
                return
              }
              setActiveTab(undefined)
            }}
          />
        )
      default:
        return (
          <>
            <RoundedButton
              onClick={() => {
                setActiveTab('slippage')
              }}
            >
              <Icon src={GearIcon} />
            </RoundedButton>
            <RoundedButton
              onClick={() => {
                setActiveTab('help')
              }}
            >
              <Icon src={QuestionIcon} />
            </RoundedButton>
            <RoundedButton
              onClick={() => {
                setIsFaucetModalOpen(true)
              }}
            >
              <Icon src={FaucetIcon} />
            </RoundedButton>
          </>
        )
    }
  }, [activeTab, slippage, onSlippageChange, isMobile, mainRef, setCurrentTool, setIsFaucetModalOpen])

  return <ToolsCard style={expandAnimation}>{Content}</ToolsCard>
}

const Slippage = ({
  onBack,
  slippage: inputValue,
  onSlippageChange,
}: {
  slippage?: number | string
  onSlippageChange: (value?: number | string) => void
  onBack: () => void
}) => {
  const { t } = useTranslation()
  return (
    <div>
      <HeaderRow>
        <BackBtn onClick={onBack}>
          <BackBtnArrow src={ArrowLeftIcon} />
        </BackBtn>
        <Title>{t('Swap.slippage')}</Title>
      </HeaderRow>
      <Text>{t('Swap.slippageDesc')}</Text>
      <SegmentedControl onSlippageChange={onSlippageChange} currentValue={inputValue} />

      {inputValue && +inputValue >= 20 ? (
        <WarningBlock
          style={{ marginTop: '0.5rem' }}
          text={t('Swap.slippageWarn', { slippagePercentage: inputValue })}
        />
      ) : null}
    </div>
  )
}

const Help = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation()

  return (
    <div>
      <HeaderRow>
        <BackBtn onClick={onBack}>
          <BackBtnArrow src={ArrowLeftIcon} />
        </BackBtn>
        <Title>{t('Swap.howTo')}</Title>
      </HeaderRow>
      <TextWrapper>
        <Text>{t('Swap.howToText')}</Text>
      </TextWrapper>
    </div>
  )
}
