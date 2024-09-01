'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface MovieOrShow {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string; 
}

const AllShowsPage: FC = () => {
  const [shows, setShows] = useState<MovieOrShow[]>([]);

  useEffect(() => {
    const storedShows = sessionStorage.getItem('shows');
    if (storedShows) {
      setShows(JSON.parse(storedShows));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">All TV Shows</h1>
      <div className="flex flex-wrap gap-4">
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
  );
};

export default AllShowsPage;
