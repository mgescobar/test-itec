import Link from 'next/link';
import React from 'react';

interface Repo {
  id: number;
  owner: {
    avatar_url: string;
    login: string;
  };
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  language: string | null;
}

interface RepoDetailsProps {
  repo: Repo;
  handleFavorite: () => void;
  isFavorited: boolean;
  isLoggedIn: boolean;
  searchQuery: string;
  isCompact?: boolean;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({
  repo,
  handleFavorite,
  isFavorited,
  isLoggedIn,
  searchQuery,
  isCompact = false,
}) => {
  return (
    <main className={`${isCompact ? 'p-2' : 'p-6'} max-w-3xl mx-auto`}>
      <div className={`flex items-center gap-4 ${isCompact ? 'mb-2' : 'mb-6'}`}>
        <img 
          src={repo.owner.avatar_url} 
          alt={repo.owner.login} 
          className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-full`}
        />
        <div>
          <h1 className={`${isCompact ? 'text-lg' : 'text-3xl'} font-bold`}>
            {repo.full_name}
          </h1>
          <p className={`text-gray-600 ${isCompact ? 'text-xs line-clamp-2' : 'text-lg'}`}>
            {repo.description || 'Sem descrição.'}
          </p>
          <p className={`text-gray-600 ${isCompact ? 'text-xs' : 'text-lg'}`}>
            Linguagem utilizada: <strong>{repo.language || 'Não especificada'}</strong>
          </p>

        </div>
      </div>

      <div className={`grid grid-cols-3 gap-4 ${isCompact ? 'mb-2 text-sm' : 'mb-6 text-center'}`}>
        <div className="bg-white p-4 rounded-xl shadow">
          ⭐ <strong>{repo.stargazers_count}</strong>
          <p className="text-sm text-gray-600">Stars</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          🍴 <strong>{repo.forks_count}</strong>
          <p className="text-sm text-gray-600">Forks</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          🐞 <strong>{repo.open_issues_count}</strong>
          <p className="text-sm text-gray-600">Issues</p>
        </div>
      </div>

      <div className={`flex gap-4 ${isCompact ? 'flex-col' : ''}`}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block bg-[#2600FF] hover:bg-blue-700 text-white px-4 py-2 rounded-xl ${
            isCompact ? 'text-sm px-3 py-1' : ''
          }`}
        >
          Ver no GitHub ↗
        </a>

        <button
          onClick={handleFavorite}
          className={`inline-block text-white px-4 py-2 rounded-xl ${
            isFavorited 
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-[#2600FF] hover:bg-blue-700'
          } ${isLoggedIn ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-300 hover:bg-gray-300'} ${
            isCompact ? 'text-sm px-3 py-1' : ''
          }`}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? 'É necessário fazer login para favoritar repositórios!' : ''}
        >
          {isFavorited && isLoggedIn ? '⭐ Desfavoritar' : '🌟 Favoritar'}
        </button>
      </div>

      {!isCompact && (
        <div className="mt-6">
          <Link 
            href={`/repos?q=${searchQuery}`} 
            className="text-blue-600 hover:underline text-sm"
          >
            ← Voltar para busca
          </Link>
        </div>
      )}
    </main>
  );
};

export default RepoDetails;