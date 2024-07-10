import { InputAdornment, TextFieldProps } from '@mui/material'

import SearchIcon from './assets/search.svg'
import { Input } from './styles'

const SearchInput = (props: TextFieldProps) => {
  return (
    <Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={SearchIcon} width={17} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      {...props}
    />
  )
}

export default SearchInput
