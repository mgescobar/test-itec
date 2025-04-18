import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import RepoSearchBar from './RepoSearchBar'

const Header = () => {
  const router = useRouter()
  const { username, logout, isLoading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (isLoading) {
    return (
      <header className="fixed w-full bg-white shadow-sm z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <nav className="flex justify-between items-center h-full">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed w-full bg-white shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <nav className="flex justify-between items-center h-full">

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            {username && (
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Favoritos
              </Link>
            )}
            <Link
              href="/about-me"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Sobre Mim
            </Link>
          </div>

          <div>
            <RepoSearchBar />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {username ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Olá, {username}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-[#2600FF] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#2600FF] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                Entrar
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="pt-4 space-y-1 border-t border-gray-200">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/repos"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar Repositórios
              </Link>
              {username && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favoritos
                </Link>
              )}
              <div className="pt-4 border-t border-gray-200">
                {username ? (
                  <div className="px-4 space-y-2">
                    <p className="px-4 py-2 text-gray-600">Usuário: {username}</p>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header