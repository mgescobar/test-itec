'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const credentials = {
        username: formData.get('username') as string,
        password: formData.get('password') as string
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas')
      }

      const token = data.token
      
      login(token)
      
      router.push('/dashboard')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center p-25">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center p-2 bg-red-50 rounded">
            ⚠️ {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            required
            className="w-full px-4 py-2 border rounded-lg"
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            className="w-full px-4 py-2 border rounded-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2600FF] text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </main>
  )
}