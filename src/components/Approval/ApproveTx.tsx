import { Currency } from '@uniswap/sdk-core'
import { Dots } from 'components/Dots'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import ImgEllipse from 'components/icons/ellipse'
import { RowBetween } from 'components/Row'
import { useTronSaleAddress, useUniswapRouter, useWXfiContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { css } from 'styled-components'
import { rotate, TYPE } from 'theme/theme'
import { BN_1E18 } from 'utils/isZero'

import { BtnApprovTx } from '../../components/Button'
import { ApprovalState, useSimpleApproveCallback, useSimpleTronApproveCallback } from '../../hooks/useApproveCallback'

const ApproveBtn = styled(BtnApprovTx)`
  ${({ theme }) => theme.mediaWidth.upToPhone`
    width: 100%;
  `};
`

const EllipseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.darkOrange};

  ${css`
    animation: 2s ${rotate} linear infinite;
  `}
`

interface ICheckerCommon {
  currency: Currency
  children?: any
}

interface IChecker extends ICheckerCommon {
  address?: string
  disabled?: boolean
  border?: BigNumber
  showSymbol?: boolean
}

interface ICheckerTRC {
  currency: string
  children?: any
  address?: string
  disabled?: boolean
  border?: BigNumber
  showSymbol?: boolean
}

const LOW_BORDER = BN_1E18

export const ApproveProvider = ({ children }: { children: any }) => {
  const [approvedState, setApprovedState] = useState({
    approved: {},
    pending: {},
  })

  const setApproved = useCallback(
    (key: string, value: boolean) => {
      setApprovedState((prev) => {
        return {
          ...prev,
          approved: {
            ...prev.approved,
            [key]: value,
          },
        }
      })
    },
    [setApprovedState]
  )

  const setPending = useCallback(
    (key: string, value: boolean) => {
      setApprovedState((prev) => {
        return {
          ...prev,
          pending: {
            ...prev.pending,
            [key]: value,
          },
        }
      })
    },
    [setApprovedState]
  )

  const memoizedApprove = useMemo(() => {
    return {
      ...approvedState,
      setApproved,
      setPending,
    }
  }, [approvedState, setApproved, setPending])

  return <ApproveContext.Provider value={memoizedApprove}>{children}</ApproveContext.Provider>
}

export const ConfirmInWalletBlock = ({ children, calledWallet }: { children: any; calledWallet: boolean }) => {
  const { t } = useTranslation()

  if (calledWallet) {
    return (
      <ApproveBtn disabled>
        <RowBetween align="center" flex="1">
          <TYPE.mediumHeader color="darkOrange35">
            <Dots>{t('confirmInWallet')}</Dots>
          </TYPE.mediumHeader>
          <EllipseContainer>
            <ImgEllipse />
          </EllipseContainer>
        </RowBetween>
      </ApproveBtn>
    )
  }

  return children
}

interface IApprovesState {
  approved: { [key: string]: boolean }
  pending: { [key: string]: boolean }
  setApproved: (key: string, value: boolean) => void
  setPending: (key: string, value: boolean) => void
}

export const ApproveContext = createContext<IApprovesState>({
  approved: {},
  pending: {},
  setApproved: () => console.log('setApproved'),
  setPending: () => console.log('setPending'),
})

const ApproveCheckerERC20 = ({
  currency,
  children,
  address,
  disabled = false,
  border = LOW_BORDER,
  showSymbol,
}: IChecker) => {
  const { t } = useTranslation()
  // check whether the user has approved the router on the tokens
  const {
    approvalState: approvalA,
    approve: approveACallback,
    txInfo,
    calledWallet,
  } = useSimpleApproveCallback(currency, border, address)

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = approvalA !== ApprovalState.APPROVED && !!currency

  const needApprove = (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && showApprovalA

  const { setApproved, setPending } = useContext(ApproveContext)

  useEffect(() => {
    setApproved(currency.wrapped.address, !needApprove)
  }, [needApprove, currency.wrapped.address, setApproved])

  useEffect(() => {
    setPending(currency.wrapped.address, approvalA === ApprovalState.PENDING)
  }, [approvalA, currency.wrapped.address, setPending])

  return (
    <ConfirmInWalletBlock calledWallet={calledWallet}>
      {needApprove ? (
        <ApproveBtn onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING || disabled}>
          <FormActionBtn
            txInfo={txInfo}
            pending={approvalA === ApprovalState.PENDING}
            labelActive={showSymbol ? `${t('Swap.approve')} ${currency?.symbol}` : t('Swap.approve')}
            labelInProgress={showSymbol ? `${t('Swap.approving')} ${currency?.symbol}` : t('Swap.approving')}
          />
        </ApproveBtn>
      ) : (
        children
      )}
    </ConfirmInWalletBlock>
  )
}

const ApproveCheckerTRC20 = ({
  currency,
  children,
  address,
  disabled = false,
  border = LOW_BORDER,
  showSymbol,
}: ICheckerTRC) => {
  const { t } = useTranslation()

  // check whether the user has approved the router on the tokens
  const {
    approvalState: approvalA,
    approve: approveACallback,
    calledWallet,
  } = useSimpleTronApproveCallback(currency, border, address)

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = approvalA !== ApprovalState.APPROVED && !!currency

  const needApprove = (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && showApprovalA

  return (
    <ConfirmInWalletBlock calledWallet={calledWallet}>
      {needApprove ? (
        <ApproveBtn onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING || disabled}>
          <FormActionBtn
            pending={approvalA === ApprovalState.PENDING}
            labelActive={t('Swap.approve')}
            labelInProgress={t('Swap.approving')}
          />
        </ApproveBtn>
      ) : (
        children
      )}
    </ConfirmInWalletBlock>
  )
}

interface IApproveProps {
  currency?: Currency
  token?: string
  children?: any
  border?: BigNumber
}

export const ApproveCheckerSwap = ({ token, children, border }: IApproveProps) => {
  const contract = useUniswapRouter()
  const currency = useCurrency(token)

  if (!currency) {
    return null
  }

  if (token === 'XFI') {
    return children
  }

  return (
    <ApproveCheckerERC20 address={contract?.address} currency={currency} border={border} showSymbol>
      {children}
    </ApproveCheckerERC20>
  )
}

export const ApproveCheckerSale = ({ token, children, border }: IApproveProps) => {
  const contractAddress = useTronSaleAddress()

  if (!token) {
    return null
  }

  return (
    <ApproveCheckerTRC20 address={contractAddress} currency={token} border={border} showSymbol>
      {children}
    </ApproveCheckerTRC20>
  )
}

export const ApproveCheckerWXfi = ({ token, children, border }: IApproveProps) => {
  const contract = useWXfiContract()
  const currency = useCurrency(token)

  if (!currency) {
    return null
  }

  return (
    <ApproveCheckerERC20 address={contract?.address} currency={currency} border={border} showSymbol>
      {children}
    </ApproveCheckerERC20>
  )
}
