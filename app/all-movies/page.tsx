'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface MovieOrShow {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string; 
}

const AllMoviesPage: FC = () => {
  const [movies, setMovies] = useState<MovieOrShow[]>([]);

  useEffect(() => {
    const storedMovies = sessionStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">All Movies</h1>
      <div className="flex flex-wrap gap-4">
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
  );
};

export default AllMoviesPage;
