import { createReducer } from '@reduxjs/toolkit'
import { deletePersistedConnectionMeta, getPersistedConnectionMeta } from 'connection/meta'
import { SupportedLocale } from 'constants/locales'

import { ConnectionType } from '../../connection/types'
import { updateMatchesDarkMode, updateSelectedWallet, updateUserDarkMode, updateUserLocale } from './actions'

const selectedWallet = getPersistedConnectionMeta()?.type

const currentTimestamp = () => new Date().getTime()

interface UserState {
  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  userLocale: SupportedLocale | null

  timestamp: number
  selectedWallet?: ConnectionType
}

const initialState: UserState = {
  userDarkMode: false,
  matchesDarkMode: false,
  userLocale: null,
  timestamp: currentTimestamp(),
  selectedWallet,
}

export default createReducer(initialState, (builder) =>
  builder

    .addCase(updateSelectedWallet, (state, action) => {
      const wallet = action.payload.wallet

      if (!wallet) {
        deletePersistedConnectionMeta()
      }
      state.selectedWallet = wallet
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })

    .addCase(updateUserLocale, (state, action) => {
      state.userLocale = action.payload.userLocale
      state.timestamp = currentTimestamp()
    })
)
