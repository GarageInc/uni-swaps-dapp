import React from 'react'
import { Settings } from 'react-slick'
import Slider from 'react-slick'

import ArrowNext from './icons/arrow-next.svg'
import { ArrowButton } from './styles'

const Arrow = ({ className, style, onClick }: any) => {
  return (
    <ArrowButton className={className} style={style} onClick={onClick}>
      <img src={ArrowNext} />
    </ArrowButton>
  )
}

const SliderList = (props: Settings) => {
  return <Slider prevArrow={<Arrow />} nextArrow={<Arrow />} {...props} />
}

export default SliderList
