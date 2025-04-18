import RepoDetails from '@/components/RepoDetails'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type RepoDetailsProps = {
  repo: {
    id: number  
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
    html_url: string
    owner: {
      login: string
      avatar_url: string
    }
    language: string
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner, repo } = context.params as { owner: string; repo: string }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!res.ok) return { props: { repo: null } }

    const data = await res.json()
    return {
      props: { repo: data }
    }
  } catch (error) {
    return { props: { repo: null } }
  }
}

export default function RepoDetailsPage({ repo }: RepoDetailsProps) {
  const router = useRouter()
  const searchQuery = router.query.q as string | undefined
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  useEffect(() => {
    if (repo && isLoggedIn) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRepos') || '[]')
      setIsFavorited(favorites.some((fav: { id: number }) => fav.id === repo.id))
    }
  }, [repo, isLoggedIn])

  const handleFavorite = () => {
    console.log('Favoritar repositório', repo?.full_name)
    if (!isLoggedIn) {
      alert('Por favor, faça login para favoritar repositórios!')
      return
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteRepos') || '[]')
    console.log(favorites, repo)
    if (isFavorited) {
      const newFavorites = favorites.filter((fav: { id: number }) => fav.id !== repo?.id)
      localStorage.setItem('favoriteRepos', JSON.stringify(newFavorites))
    } else {
      if (repo) {
        const newFavorites = [...favorites, repo]
        localStorage.setItem('favoriteRepos', JSON.stringify(newFavorites))
      }
    }
    setIsFavorited(!isFavorited)
  }

  if (!repo) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center p-6">
        <p className="text-xl text-red-600">Repositório não encontrado.</p>
      </main>
    )
  }

  return (
    <RepoDetails
      repo={repo}
      handleFavorite={handleFavorite}
      isFavorited={isFavorited}
      isLoggedIn={isLoggedIn}
      searchQuery={searchQuery || ''}
    />
  )
}