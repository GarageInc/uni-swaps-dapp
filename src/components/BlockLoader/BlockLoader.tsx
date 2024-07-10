import './Loader.scss'

import React from 'react'
import styled from 'styled-components'

import logoImg from './loader/images/logo-mini.svg'

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 200px;
`

interface IProps {
  loading: boolean
  children?: React.ReactNode
  className?: string
}

const BlockLoader = ({ loading, className, children }: IProps) => {
  if (loading) {
    return (
      <Container className={className}>
        <div id="preloader" className={className}>
          <div id="loader"></div>
          <img src={logoImg} alt="Zoo Loader" className="preloader-image" />
        </div>
      </Container>
    )
  }
  return <>{children}</>
}

export default BlockLoader
