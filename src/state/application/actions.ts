import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@uniswap/sdk-core'
import { ReactElement } from 'react'

import { PopupType } from './reducer'

export type PopupContent =
  | {
      type: PopupType.Transaction
      hash: string
      summary?: string
    }
  | {
      type: PopupType.FailedSwitchNetwork
      failedSwitchNetwork: ChainId
    }
  | {
      msg: {
        title: string | ReactElement
        description?: string | ReactElement
        success: boolean
      }
    }

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
  POOL_OVERVIEW_OPTIONS,
  NETWORK_SELECTOR,
  DISCONNECT,
  LANGUAGE,
  ADD_LIQUIDITY,
  REMOVE_LIQUIDITY,
}

export enum ApplicationSubModal {}

export const updateChainId = createAction<{ chainId: number | null }>('application/updateChainId')
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const setOpenSubModal = createAction<ApplicationSubModal | null>('application/setOpenSubModal')
export const setOpenTimerView = createAction<boolean>('application/setOpenTimerView')
export const setctxStakingPositionId = createAction<string | null>('application/setctxStakingPositionId')
export const setctxVotingPositionId = createAction<string | null>('application/setctxVotingPositionId')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
)
export const removePopup = createAction<{ key: string }>('application/removePopup')
