import { Menu as MuiMenu, menuClasses } from '@mui/material'
import { Box } from 'components/MUI'
import { FC, PropsWithChildren, ReactElement, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

export const Menu: FC<
  PropsWithChildren<{
    trigger: ({ isOpened }: { isOpened: boolean }) => ReactElement
    isChildrenCloseMenu?: boolean
    showArrows?: boolean
  }>
> = ({ trigger: Trigger, isChildrenCloseMenu = false, children, showArrows }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const node = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={node}>
      <Box onClick={toggle} sx={{ cursor: 'pointer' }} className="pipka" display="flex">
        <Trigger isOpened={isOpen} />
      </Box>
      <StyledMenu
        open={isOpen}
        anchorEl={node.current}
        onClose={() => setIsOpen(false)}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Box
          onClick={() => {
            isChildrenCloseMenu && setIsOpen(false)
          }}
        >
          {children}
        </Box>
      </StyledMenu>
    </div>
  )
}

const StyledMenu = styled(MuiMenu)`
  .${menuClasses.paper} {
    margin-top: 8px;
    border-radius: 24px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.light};

    ul {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`
export const StyledMenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
`
