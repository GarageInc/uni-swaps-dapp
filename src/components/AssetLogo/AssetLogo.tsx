import clsx from 'clsx'
import { useAssetLogoSource } from 'hooks/useAssetLogoSource'
import React, { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import styled from 'styled-components'

const MissingImageLogo = styled.div<{ size?: number }>`
  --size: 2rem;
  border-radius: 100px;
  font-size: calc(var(--size) / 3);
  font-weight: 535;
  height: 2rem;
  line-height: 24px;
  text-align: center;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoImage = styled.img<{ size: number; imgloaded?: boolean }>`
  opacity: ${({ imgloaded }) => (imgloaded ? 1 : 0)};
  width: 2rem;
  height: 2rem;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`

const LogoImageWrapper = styled.div<{ size: number; imgloaded?: boolean }>`
  box-shadow: 0 0 1px white;
  border-radius: 50%;
  display: block;
  position: relative;
  text-transform: uppercase;
  z-index: 10;
  inset: 0;
  pointer-events: none;
`

type AssetLogoBaseProps = {
  symbol?: string | null
  backupImg?: string | null
  size?: number
  style?: React.CSSProperties
}
type AssetLogoProps = AssetLogoBaseProps & { className?: string }

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  margin-right: 0.62rem;
  z-index: 0;
`
const Symbol = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  select: none;
  border: 1px solid #e9ebf3;
  background-color: white;
`

const BoldSymbol = styled.span`
  font-weight: 600;
`
/**
 * Renders an image by prioritizing a list of sources, and then eventually a fallback triangle alert
 */
export function AssetLogo({ symbol, size = 26, style, className }: AssetLogoProps) {
  const [src, nextSrc] = useAssetLogoSource(symbol)
  const [imgloaded, setimgloaded] = useState(() => {
    const img = document.createElement('img')
    img.src = src ?? ''
    return src ? img.complete : false
  })

  return (
    <LogoContainer style={{ ...style }} className={clsx(className)}>
      {src ? (
        <>
          <LogoImageWrapper size={size} imgloaded={imgloaded}>
            <LogoImage
              src={src}
              alt={`${symbol ?? 'token'} logo`}
              size={size}
              onLoad={() => setimgloaded(true)}
              onError={nextSrc}
              imgloaded={imgloaded}
            />
          </LogoImageWrapper>
        </>
      ) : (
        <MissingImageLogo size={size}>
          {/* use only first 3 characters of Symbol for design reasons */}
          {symbol?.toUpperCase().replace('$', '').replace(/\s+/g, '').slice(0, 3)}
        </MissingImageLogo>
      )}
    </LogoContainer>
  )
}
