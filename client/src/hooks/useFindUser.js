import { useEffect, useState } from 'react'
import { verifyToken } from '../api/auth'
export default function useFindUser() {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(false)
  async function findUser() {
    let res = await verifyToken()
    if (res.user) {
      setUser(res.user)
      setLoading(true)
    }
    setLoading(false)
  }
  useEffect(() => {
    findUser()
  }, [])
  return {
    user,
    setUser,
    isLoading,
  }
}
