import { CheckboxProps } from '@mui/material'
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg'
import { ReactComponent as UnCheckedIcon } from 'assets/icons/unchecked.svg'
import { StyledCheckBox } from 'components/CheckBox/styles'

const CheckBox = (props: CheckboxProps) => {
  return <StyledCheckBox checkedIcon={<CheckedIcon />} icon={<UnCheckedIcon />} {...props} />
}

export default CheckBox
