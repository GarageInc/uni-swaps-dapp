import { createReducer, nanoid } from '@reduxjs/toolkit'

import {
  addPopup,
  ApplicationModal,
  ApplicationSubModal,
  PopupContent,
  removePopup,
  setctxStakingPositionId,
  setctxVotingPositionId,
  setOpenModal,
  setOpenSubModal,
  setOpenTimerView,
  updateBlockNumber,
  updateChainId,
} from './actions'

export enum PopupType {
  Transaction = 'transaction',
  Order = 'order',
  FailedSwitchNetwork = 'failedSwitchNetwork',
}

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

interface ApplicationState {
  // used by RTK-Query to build dynamic subgraph urls
  readonly chainId: number | null
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
  readonly openSubModal: ApplicationSubModal | null
  readonly openTimerView: boolean
  readonly ctxStakingPositionId?: string
  readonly ctxVotingPositionId?: string
}

const initialState: ApplicationState = {
  chainId: null,
  blockNumber: {},
  popupList: [],
  openModal: null,
  openSubModal: null,
  openTimerView: false,
  ctxStakingPositionId: undefined,
  ctxVotingPositionId: undefined,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateChainId, (state, action) => {
      const { chainId } = action.payload
      state.chainId = chainId
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
    .addCase(setOpenSubModal, (state, action) => {
      state.openSubModal = action.payload
    })
    .addCase(setOpenTimerView, (state, action) => {
      state.openTimerView = action.payload
    })
    .addCase(setctxStakingPositionId, (state, action) => {
      state.ctxStakingPositionId = action.payload || undefined
    })
    .addCase(setctxVotingPositionId, (state, action) => {
      state.ctxVotingPositionId = action.payload || undefined
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 25000 } }) => {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
)
