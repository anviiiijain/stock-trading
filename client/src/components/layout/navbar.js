import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import storage from '../../utils/storage'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../hooks/UserContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    handleClose()
    storage.clearToken()
    setUser(null)
    navigate('/login')
  }

  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'end' }}>
        {user && (
          <div className='w-11/12 mx-auto flex justify-between items-center font-bold text-xl'>
            {/* <div>{user?.name}'s Dashboard</div> */}
            <div>Your Dashboard</div>
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
