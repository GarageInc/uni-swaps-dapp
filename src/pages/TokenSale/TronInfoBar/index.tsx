import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { FC } from 'react'

import { WarningBanner } from './WarningBanner'

type Props = {
  style?: React.CSSProperties
}

export const TronInfoBar: FC<Props> = ({ style }) => {
  const { address } = useWallet()

  if (!address) {
    return (
      <WarningBanner
        style={{
          alignSelf: 'stretch',
          marginBottom: '1.25rem',
        }}
      />
    )
  }

  return null
}
