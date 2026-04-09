"use client"
import React, { useEffect, useMemo, useState } from 'react'
import MovieCard from './MovieCard'
import { fetchData } from '@/utils/fetchData'

const MovieList = () => {
    const movieUrl = process.env.NEXT_PUBLIC_MOVIE_URL ?? process.env.MOVIE_URL ?? '';
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY ?? '';

    const headers = useMemo(
        () => ({
            Authorization: apiKey ? `Bearer ${apiKey}` : '',
        }),
        [apiKey]
    )

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [movies, setMovies] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);

            if (!movieUrl) {
                setError('Missing MOVIE_URL. Set NEXT_PUBLIC_MOVIE_URL in your env.');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchData(movieUrl, { page: currentPage, headers });
                setMovies(data);
            } catch (fetchError) {
                setError('Unable to load movies. Please check your API URL and key.');
                setMovies(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage, movieUrl]);

    const nextPage = () => {
        if (movies?.total_pages && currentPage < movies.total_pages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }

    if (loading) {
        return <div className="py-10 text-center text-gray-600">Loading movies...</div>
    }

    if (error) {
        return <div className="py-10 text-center text-red-600">{error}</div>
    }

    return (
        <>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full justify-items-center'>
            {movies?.results?.length ? (
                movies.results.map((movie: any) => (
                    <MovieCard
                        key={movie.id}
                        name={movie.title}
                        thumbnail={
                            movie.original_language === 'en'
                                ? movie.poster_path
                                : movie.backdrop_path
                        }
                    />
                ))
            ) : (
                <div className="col-span-full py-10 text-center text-gray-500">
                    No movies found for this page.
                </div>
            )}
        </div>
        <div className="mt-20 w-full text-center">
          <button
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="bg-blue-500 disabled:bg-slate-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {'<'}
          </button>
          <span className="mx-10">
            Page {movies?.page ?? currentPage} of {movies?.total_pages ?? '-'}
          </span>
          <button
            onClick={nextPage}
            disabled={!movies?.total_pages || currentPage >= movies.total_pages}
            className="bg-blue-500 disabled:bg-slate-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            {'>'}
          </button>
        </div>
    </>      
  )
}

export default MovieList