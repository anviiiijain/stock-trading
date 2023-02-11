import classNames from 'classnames'
import { Button } from '@mui/material'

const CustomButton = (props) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props

  return <Button {...rest}>{children}</Button>
}

export default CustomButton
