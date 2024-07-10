import { BigNumber } from 'ethers'

import { BN_1E18 } from './isZero'

const ROUNDER = 1e6

export const getBigNumberValue = (amount: string | number, decimals = BN_1E18) =>
  BigNumber.from(Math.floor(+amount * ROUNDER))
    .mul(decimals)
    .div(ROUNDER)
