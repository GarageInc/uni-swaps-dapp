import React, { FC, useMemo } from 'react'
import styled from 'styled-components'

interface IProps {
  tokenOptions: ITokenOptions
}

interface ITokenOptions {
  address: string
  symbol: string
  decimals: number
  image: string
}

const useAddToken = (options: ITokenOptions) => {
  const addToken = async () => {
    if (window.ethereum) {
      try {
        // @ts-ignore
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options,
          },
        })
        if (wasAdded) {
          console.log('Thanks for your interest!')
        } else {
          console.log('Your loss!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return addToken
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 52px;
  height: 52px;

  box-shadow: 0px 3.333px 16.667px 0px rgba(40, 46, 63, 0.08);
  border-radius: 50%;
`

const Img = styled.img`
  width: 40px;
  height: 40px;
`

const Plus = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.white};
  color: #f8faff;
  border-radius: 50%;
  z-index: 10;
  padding-bottom: 2px;
  padding-left: 2px;

  font-family: 'Font Awesome 6 Pro';
  font-weight: 900;
  font-size: 15px;
`

const AddToken: FC<IProps> = ({ tokenOptions }: IProps) => {
  const addToken = useAddToken(tokenOptions)

  // @ts-ignore
  const isMetamask = window.ethereum && window.ethereum.isMetaMask

  if (!isMetamask) {
    return <></>
  }

  return (
    <Container onClick={addToken}>
      <Img src={tokenOptions.image} alt={tokenOptions.symbol} />

      <Plus></Plus>
    </Container>
  )
}

export const AddAppToken = () => {
  const zoo = useAppToken()

  return <AddToken tokenOptions={zoo} />
}

const useAppToken = (): ITokenOptions => {
  const address = '0xblablabla'
  return useMemo(
    () => ({
      address: address || '',
      symbol: 'XFI',
      decimals: 18,
      image: `${window.location.origin}/images/token.svg`,
    }),
    [address]
  )
}
