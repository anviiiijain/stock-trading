import { useContext, useState } from 'react'
import CustomInput from '../components/elements/custom-input'
import CustomButton from '../components/elements/custom-button'
import { loginUser } from '../api/auth'
import storage from '../utils/storage'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../hooks/UserContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { user, setUser } = useContext(UserContext)

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await loginUser(formData)
    if (res.user) {
      storage.setToken(res.user)
      setUser(res.user)
      navigate('/')
    }
  }

  if (user) {
    return <Navigate to='/' />
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-2/5 mx-auto bg-white flex flex-col gap-8 shadow p-8'
      >
        <h1 className='font-bold text-2xl'>Login</h1>
        <CustomInput
          labelText='Email'
          id='email'
          name='email'
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type='text'
        />
        <CustomInput
          labelText='Password'
          id='password'
          name='password'
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type='password'
        />
        <div className='w-1/2 mx-auto flex justify-center mt-4'>
          <CustomButton type='submit' color='primary' variant='contained'>
            Log in
          </CustomButton>
        </div>
        <p className='text-left text-lg'>
          Don't have an account?{' '}
          <a href='login' className='text-blue-400'>
            Register
          </a>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
