'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LatestContent from '@/components/LatestContent';

interface MovieOrShow {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string;
}

interface ClientPageProps {
  content: MovieOrShow[];
}

const ClientPage: FC<ClientPageProps> = ({ content }) => {
  const router = useRouter();
  const movies = content.filter((item) => item.Type === 'movie').slice(0, 20);
  const shows = content.filter((item) => item.Type === 'series').slice(0, 20);

  const handleShowMoreMovies = () => {
    sessionStorage.setItem('movies', JSON.stringify(content.filter((item) => item.Type === 'movie')));
    router.push('/all-movies');
  };

  const handleShowMoreShows = () => {
    sessionStorage.setItem('shows', JSON.stringify(content.filter((item) => item.Type === 'series')));
    router.push('/all-shows');
  };

  return (
    <div className="p-4">
      <LatestContent content={content} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Movies</h2>
          <a
            onClick={handleShowMoreMovies}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Show More
          </a>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="flex-none w-32">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                  alt={movie.Title}
                  width={128}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-semibold">{movie.Title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">TV Shows</h2>
          <a
            onClick={handleShowMoreShows}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Show More
          </a>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {shows.map((show) => (
            <div key={show.imdbID} className="flex-none w-32">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={show.Poster !== 'N/A' ? show.Poster : '/placeholder.png'}
                  alt={show.Title}
                  width={128}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-semibold">{show.Title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>      
    </div>
  );
};

export default ClientPage;
