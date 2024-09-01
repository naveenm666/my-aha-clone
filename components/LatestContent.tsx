'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface MovieOrShow {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string;
}

interface LatestContentProps {
  content: MovieOrShow[];
}

const LatestContent: FC<LatestContentProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const latestContent = content.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % latestContent.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, [latestContent.length]);

  const currentItem = latestContent[currentIndex];

  return (
    <div className="mt-8">

      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={currentItem.Poster !== 'N/A' ? currentItem.Poster : '/placeholder.png'}
            alt={currentItem.Title}
            layout="responsive"
            width={700}
            height={1000}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LatestContent;
