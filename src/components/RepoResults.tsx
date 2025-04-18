import Link from 'next/link';
import React from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
  html_url: string;
}

interface RepoResultsProps {
  totalCount: number;
  q: string;
  loading: boolean;
  rateLimitExceeded: boolean;
  repos: Repo[];
  totalPages: number;
  currentPage: number;
  handlePagination: (page: number) => void;
}

const RepoResults: React.FC<RepoResultsProps> = ({
  totalCount,
  q,
  loading,
  rateLimitExceeded,
  repos,
  totalPages,
  currentPage,
  handlePagination,
}) => {
  return (
    <>
      {loading && <p>Carregando repositórios...</p>}

      {rateLimitExceeded && (
        <p className="text-red-600 text-2xl">
          Limite de requisições da API do GitHub excedido. Tente novamente mais tarde.
        </p>
      )}

      {!loading && !rateLimitExceeded && repos.length === 0 && (
        <p>Nenhum repositório encontrado.</p>
      )}

      {!rateLimitExceeded && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div key={repo.id} className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{repo.name}</h2>
              <p className="text-sm text-gray-600 mb-3">
                {repo.description || 'Sem descrição.'}
              </p>
              <div className="flex gap-3">
                <Link
                  href={{
                    pathname: `/repos/${repo.owner.login}/${repo.name}`,
                    query: { q },
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Detalhes
                </Link>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm"
                >
                  Ver no GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !rateLimitExceeded && totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
};

export default RepoResults;