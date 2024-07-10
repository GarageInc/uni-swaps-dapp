import { create } from 'zustand'

type ToolType = 'slippage' | 'help'

interface IUseSwapToolsState {
  isFaucetModalOpen: boolean
  currentTool?: ToolType
  setCurrentTool: (by: ToolType | undefined) => void
  setIsFaucetModalOpen: (by: boolean) => void
}

export const useSwapToolsStore = create<IUseSwapToolsState>()((set) => ({
  isFaucetModalOpen: false,
  currentTool: undefined,
  setCurrentTool: (by) => set({ currentTool: by }),
  setIsFaucetModalOpen: (by) => set({ isFaucetModalOpen: by }),
}))
