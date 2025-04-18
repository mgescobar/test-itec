import RepoDetails from '@/components/RepoDetails'
import { useEffect, useState } from 'react'

interface Repo {
  id: number
  owner: {
    avatar_url: string
    login: string
  }
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  html_url: string
  language: string | null
}

export default function AdminPage() {
  const [username, setUsername] = useState<string | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])

  useEffect(() => {
    const getUsernameFromToken = () => {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
      
      if (cookie) {
        try {
          const payload = JSON.parse(atob(cookie.split('.')[1]))
          setUsername(payload.username)
        } catch (error) {
          console.error('Error parsing token:', error)
        }
      }
    }

    getUsernameFromToken()
  }, [])

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favoriteRepos') || '[]')
        setRepos(favorites)
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }

    loadFavorites()
  }, [])

  const handleRemoveFavorite = (repoId: number) => {
    const updatedFavorites = repos.filter(repo => repo.id !== repoId)
    localStorage.setItem('favoriteRepos', JSON.stringify(updatedFavorites))
    setRepos(updatedFavorites)
  }

  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🔒 Painel do Usuário</h1>
          {username && (
            <p className="text-lg mb-8">
              Bem-vindo, <strong>{username}</strong>!
            </p>
          )}
        </div>

        <div className="border-2 border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">⭐ <span className="text-blue-600">{repos.length}</span> Repositórios Favoritados</h2>
          
          {repos.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum repositório favoritado ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <div 
                  key={repo.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <RepoDetails
                    repo={repo}
                    handleFavorite={() => handleRemoveFavorite(repo.id)}
                    isFavorited={true}
                    isLoggedIn={!!username}
                    searchQuery=""
                    isCompact
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}