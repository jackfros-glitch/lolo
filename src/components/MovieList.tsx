import React from 'react'
import MovieCard from './MovieCard'
import { fetchData } from '@/utils/fetchData'

const MovieList = async () => {
    let headers = {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
    }
    const movies = await fetchData(`${process.env.MOVIE_URL}`, { headers:headers } )
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full justify-items-center'>
        {
            movies.results.map((movie: any) => (
                <MovieCard key={movie.id} name={movie.title} thumbnail={movie.original_language === "en" ? movie.poster_path : movie.backdrop_path} />
            ))
        }
    </div>
  )
}

export default MovieList