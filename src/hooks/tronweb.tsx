import { TRON_OWNER } from 'constants/app-contracts'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
// @ts-ignore
import TronWeb from 'tronweb'

const tronWeb: TronWeb = new TronWeb({
  // fullHost: 'https://api.trongrid.io',
  // fullHost: 'https://rpc.ankr.com/http/tron',
  fullHost: 'https://yolo-greatest-river.tron-mainnet.quiknode.pro/450cae651f17b527dc38bacbc73184a40feb8ae2/',
})
tronWeb.setAddress(TRON_OWNER)
;(window as any).tronWeb1 = tronWeb

export const getTronProvider = (internal = false) => {
  const { tronWeb, tronWeb1 } = window as any

  if (internal) {
    return tronWeb
  }

  const target = tronWeb || tronWeb1

  return target
}

const TronContractContext = createContext<{
  setContract: (address: string, contract: any) => void
  contracts: { [address: string]: any }
}>({} as any)

export const TronContractProvider = ({ children }: { children: any }) => {
  const [contracts, setContracts] = useState<{ [address: string]: any }>({})

  const setContract = useCallback((address: string, contract: any) => {
    setContracts((prev) => ({ ...prev, [address]: contract }))
  }, [])

  const data = useMemo(() => {
    return {
      contracts,
      setContract,
    }
  }, [contracts, setContract])

  return <TronContractContext.Provider value={data}>{children}</TronContractContext.Provider>
}

export const useTronWebContract = (address = '') => {
  const ctx = useContext(TronContractContext)

  const { setContract, contracts } = ctx
  const contract = useMemo(() => contracts[address], [address, contracts])

  useEffect(() => {
    if (contract) return

    const target = getTronProvider()

    const fetchContract = async () => {
      try {
        if (!address || contract) return

        const newContract = await target.contract().at(address)

        setContract(address, newContract)
      } catch (e) {
        console.error('useTronWebContract error', e)
      }
    }

    fetchContract()

    if (target) {
      const tId = setInterval(fetchContract, 1000)

      return () => clearInterval(tId)
    }

    return undefined
  }, [address, contract, setContract])

  return contract
}
