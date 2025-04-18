import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import RepoResults from '@/components/RepoResults'

type Repo = {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  owner: {
    login: string
  }
}

const fetcher = async (url: string) => {
  const cached = localStorage.getItem(url)
  if (cached) {
    const { responseData, timestamp } = JSON.parse(cached)
    const cacheAge = new Date().getTime() - timestamp
    
    if (cacheAge <= 300000) return responseData
    
    localStorage.removeItem(url)
  }

  const res = await fetch(url)
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'API rate limit exceeded')
  }

  const responseData = await res.json()
  
  localStorage.setItem(url, JSON.stringify({
    responseData,
    timestamp: new Date().getTime()
  }))
  
  return responseData
}

export default function RepoSearchPage() {
  const router = useRouter()
  const { q, page = '1' } = router.query
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false)

  const currentPage = parseInt(page as string, 10) || 1
  const perPage = 15

  const { data, error, isValidating } = useSWR(
    q ? `https://api.github.com/search/repositories?q=${encodeURIComponent(q as string)}&page=${currentPage}&per_page=${perPage}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 3600000
    }
  )

  useEffect(() => {
    if (data) {
      setRepos(data.items || [])
      setTotalCount(data.total_count || 0)
      setLoading(false)
    }
    if (error) {
      setRateLimitExceeded(
        error.message.includes('API rate limit exceeded') || 
        error.message.includes('You have exceeded a secondary rate limit.'
      ))
      setLoading(false)
    }
  }, [data, error])

  const handlePagination = (newPage: number) => {
    router.push({
      pathname: '/repos',
      query: { q, page: newPage }
    })
  }

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">
          🔎 Existem <span className="text-blue-600">{totalCount}</span> repositórios para:{' '}
          <span className="text-blue-600">{q}</span>
        </h1>
      </div>
      
      <RepoResults
        totalCount={totalCount}
        q={q as string}
        loading={loading || isValidating}
        rateLimitExceeded={rateLimitExceeded}
        repos={repos}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </main>
  )
}