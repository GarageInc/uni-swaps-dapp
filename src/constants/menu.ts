import { Paths } from 'constants/paths'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

// import ArrowRight from '../assets/svg/arrow-right.svg'
import { ReactComponent as ArrowRight } from '../assets/svg/arrow-right.svg'
interface IMenuItem {
  href: string
  label: string
}

interface IMenu {
  main: IMenuItem
  swap: IMenuItem
  pools: IMenuItem
  points: IMenuItem
  tokenSale: IMenuItem
  docs: IMenuItem
}

const scrollToTop = () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const useMenu = (): IMenu => {
  const location = useLocation()
  const { t, i18n } = useTranslation()

  return useMemo(() => {
    return {
      main: {
        href: Paths.DEFAULT,
        label: t('Menu.main'),
        callback: scrollToTop,
      },
      swap: {
        href: Paths.SWAP,
        label: t('Menu.swap'),
      },
      pools: {
        href: Paths.POOLS,
        label: t('Menu.pools'),
      },
      points: {
        href: Paths.POINTS,
        label: t('Menu.points'),
      },
      tokenSale: {
        href: Paths.TOKEN_SALE,
        label: t('Menu.tokenSale'),
      },
      docs: {
        href: i18n.language === 'vi' ? Paths.DOCS_VI : Paths.DOCS,
        label: t('Menu.docs'),
        src: ArrowRight,
      },
    }
  }, [i18n.language, t])
}

export const useMenuArray = () => {
  const menu = useMenu()

  return useMemo(() => {
    return Object.values(menu)
  }, [menu])
}
