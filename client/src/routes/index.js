import { useContext } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { UserContext } from '../hooks/UserContext'
import useFindUser from '../hooks/useFindUser'
import Dashboard from '../pages/Dashboard'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import { StockContext } from '../hooks/StockContext'
import useStocks from '../hooks/useStocks'

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(UserContext)
  if (!isLoading) {
    return user ? <Outlet /> : <Navigate to='/login' />
  }
}

const AppRoutes = () => {
  const { user, setUser, isLoading } = useFindUser()
  const { stocks, ownedStocks } = useStocks()
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <StockContext.Provider value={{ stocks, ownedStocks }}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/' element={<Dashboard />} />
            </Route>
          </Routes>
        </StockContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default AppRoutes
