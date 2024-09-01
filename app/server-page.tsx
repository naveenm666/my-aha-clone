import { FC } from 'react';
import ClientPage from './client-page'; // Adjust the path if needed

interface MovieOrShow {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string; // 'movie' or 'series'
}

// Helper function to fetch content from OMDB API
const fetchContent = async (type: string, page: number): Promise<MovieOrShow[]> => {
  const apiKey = '71fc16a5'; // Replace with your actual
  const res = await fetch(` API keyhttp://www.omdbapi.com/?s=${type}&type=${type}&apikey=${apiKey}&page=${page}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${type} on page ${page}`);
  }
  const data = await res.json();
  return data.Search || []; // Ensure the returned value is an array
};

// Function to fetch a set number of items
const fetchItems = async (type: string, limit: number): Promise<MovieOrShow[]> => {
  const allContent: MovieOrShow[] = [];
  let page = 1;
  
  while (allContent.length < limit) {
    const content = await fetchContent(type, page);
    if (content.length === 0) break; // Exit if no more results
    allContent.push(...content);
    page++;
  }
  
  return allContent.slice(0, limit); // Ensure to return exactly the limit number of items
};

// Function to fetch all movies and TV shows
const fetchAllContent = async (): Promise<MovieOrShow[]> => {
  const movies = await fetchItems('movie', 50); // Fetch 50 movies
  const tvShows = await fetchItems('series', 50); // Fetch 50 TV shows

  return [...movies, ...tvShows]; // Combine movies and TV shows
};

const ServerPage: FC = async () => {
  const content = await fetchAllContent();
  
  return (
    <ClientPage content={content} />
  );
};

export default ServerPage;
