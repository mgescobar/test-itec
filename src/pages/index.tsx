import Link from 'next/link'
import RepoSearchBar from '@/components/RepoSearchBar'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { username } = useAuth()
  return (
    <>
      <main className="flex flex-col items-center justify-center p-25 text-center">
        <div className="flex flex-list items-center mb-10">
          <img src="/git.png" alt="Logo" className='w-40 h-40'/>
          <h1 className="text-6xl font-bold"> iTec - GitFav</h1>
        </div>
        <p className="text-lg max-w-xl mb-10">
          Uma pagina web feita com NextJS para buscar, visualizar e favoritar repositórios públicos
          do GitHub.
        </p>

        <div className="gap-4 mb-10">
          <RepoSearchBar />
        </div>

        { !username && (
            <Link
              href="/login"
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-xl shadow transition"
            >
              Acessar Área de Login
            </Link>
        )}
      </main>
    </>
  )
}
