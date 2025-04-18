import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RepoSearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() === '') return
    router.push(`/repos?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nome do repositório..."
        className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#2600FF] text-white rounded-lg hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  )
}
