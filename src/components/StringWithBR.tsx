import { Fragment } from 'react'

export const StringWithBR = ({ children }: { children: string }) => {
  return (
    <>
      {children.split('\n').map((str, index) => {
        return (
          <Fragment key={index}>
            {str}
            <br />
          </Fragment>
        )
      })}
    </>
  )
}
