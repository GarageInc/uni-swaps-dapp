import Modal from 'components/Modal'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ChainLink } from './ChainLink'

const Title = styled.h2`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.text100};
  margin: 0;
`

const Text = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.text70};
  margin: 0;
  margin-top: 2rem;
`

const Chain = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  row-gap: 1.25rem;
`

export const RouteModal = ({
  isOpenFlag,
  onClose,
  cost,
  path,
  hideCost,
}: {
  path: string[]
  cost: string
  isOpenFlag: boolean
  onClose: () => void
  hideCost?: boolean
}) => {
  const { t } = useTranslation()

  const pools = useMemo(() => {
    const pairs: [string, string | undefined][] = []

    pairs.push([path[0], undefined])

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] && path[i + 1]) pairs.push([path[i], path[i + 1]])
    }

    pairs.push([path[path.length - 1], undefined])

    return pairs
  }, [path])

  return (
    <Modal isOpenFlag={isOpenFlag} onDismissHandler={onClose} header={<Title>{t('swapRoute.title')}</Title>}>
      <Chain>
        {pools.map((pair, i) => (
          <ChainLink
            mode={!pair[1] ? 'single' : 'double'}
            pair={pair}
            key={`${pair[0]}-${pair[1]}`}
            isFirst={i === 0}
            isLast={i === pools.length - 1}
          />
        ))}
      </Chain>
      <Text>
        {hideCost ? null : `${t('swapRoute.bestPriceCost1')} ~${cost} ${t('swapRoute.bestPriceCost2')}`}
        {t('swapRoute.bestPriceCost3')}
      </Text>
    </Modal>
  )
}
