import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from 'ethers/lib/utils'

export const fromWei = (b: BigNumber | undefined, decimals: number | undefined = 18) => {
  if (!b) {
    return 0
  }
  return formatUnits(b, decimals)
}
