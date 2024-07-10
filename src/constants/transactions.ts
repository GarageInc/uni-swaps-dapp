import bridgeIcon from 'assets/images/menu/bridge.svg'
import rewardsIcon from 'assets/images/menu/rewards.svg'
import stakingIcon from 'assets/images/menu/staking.svg'
import swapIcon from 'assets/images/menu/swap.svg'

export enum TxTemplateTypes {
  Swap = 'Swap',
  Bridge = 'Bridge',
  Claimed = 'Claimed',
  Staking = 'Staking',
  Unstaked = 'Unstaked',
  Approved = 'Approved',
  Swapped = 'Swapped',
}

export const TRANSACTION_TYPES = {
  [TxTemplateTypes.Swap]: {
    icon: swapIcon,
    label: 'Swap',
  },
  [TxTemplateTypes.Bridge]: {
    icon: bridgeIcon,
    label: 'Bridge',
  },
  [TxTemplateTypes.Claimed]: {
    icon: rewardsIcon,
    label: 'Claimed',
  },
  [TxTemplateTypes.Staking]: {
    icon: stakingIcon,
    label: 'Staked',
  },
  [TxTemplateTypes.Unstaked]: {
    icon: stakingIcon,
    label: 'Unstaked',
  },
  [TxTemplateTypes.Approved]: {
    icon: stakingIcon,
    label: 'Approved',
  },
  [TxTemplateTypes.Swapped]: {
    icon: stakingIcon,
    label: 'Swapped',
  },
}
