import { TextField } from '@mui/material'
import styled from 'styled-components'

export const Input = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.grey};
    border-radius: 25px;
    padding-left: 20px;
    height: 50px;

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-width: 1px;
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .MuiInputBase-input {
    padding: 0;
    height: 100%;
    font-size: 17px;
  }

  .MuiInputAdornment-root {
    margin-right: 10px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 0;
  }
`
