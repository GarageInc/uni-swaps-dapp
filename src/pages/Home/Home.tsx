import { BodyWrapper, Footer } from 'components'
import { useYandexMetrikaHit } from 'hooks/useYandexMetrika'

import { HomeHero, HomeInfo, HomeProfitEstimator } from './blocks'
import { HomeBanner } from './blocks/HomeBanner'

export default function Home() {
  useYandexMetrikaHit()
  return (
    <BodyWrapper>
      <HomeHero />
      <HomeProfitEstimator />
      <HomeInfo />
      <HomeBanner />
      <Footer />
    </BodyWrapper>
  )
}
