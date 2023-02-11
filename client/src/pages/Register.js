import { useContext, useState } from 'react'
import CustomInput from '../components/elements/custom-input'
import CustomButton from '../components/elements/custom-button'
import { registerUser } from '../api/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../hooks/UserContext'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('passwords should match')
    } else {
      let res = await registerUser(formData)

      if (res.status === 'ok') {
        navigate('/login')
      }
    }
  }

  const { user } = useContext(UserContext)

  if (user) {
    return <Navigate to='/' />
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-2/5 mx-auto bg-white flex flex-col gap-8 shadow p-8'
      >
        <h1 className='font-bold text-2xl'>Register</h1>
        <CustomInput
          labelText='Name'
          id='name'
          name='name'
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type='text'
        />
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
        <CustomInput
          labelText='Confirm Password'
          id='confirmPassword'
          name='confirmPassword'
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type='password'
        />
        <div className='w-1/2 mx-auto flex justify-center mt-4'>
          <CustomButton type='submit' color='primary' variant='contained'>
            Sign up
          </CustomButton>
        </div>
        <p className='text-left text-lg'>
          Already have an account?{' '}
          <a href='login' className='text-blue-400'>
            Login
          </a>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
