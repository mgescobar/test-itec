'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  username: string | null
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  username: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))

      if (cookie) {
        const token = cookie.split('=')[1]
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          setUsername(payload.username)
        } catch (error) {
          console.error('Erro na autenticação:', error)
          logout()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      localStorage.setItem('isLoggedIn', 'true')
      setUsername(payload.username)
    } catch (error) {
      console.error('Erro no login:', error)
      logout()
    }
  }

  const logout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    localStorage.removeItem('isLoggedIn')
    setUsername(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ username, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)