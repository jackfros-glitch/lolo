"use client"
import { useAppStore } from '@/store/appStore';
import { notFound } from 'next/navigation';
import React, { use } from 'react'

const MovieDetailPage = ({
     params,
}: {
  params: Promise<{ id: number }>;
}) => {
    const movies = useAppStore((state)=> state.movies);
    const { id } = use(params);
      const ids = movies.results.map((movie: any)=> movie.id )
    
    const movie = movies?.results.find((movie: any) => movie.id === Number(id));
    if (!movie) {
        return notFound();
    }
  return (
    <div className='p-8'>
        <div
          style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.original_language === 'en' ? movie.poster_path : movie.backdrop_path})`, 
            // backgroundSize: 'cover cover',
          }} 
          className="w-full h-125 bg-contain bg-no-repeat" >
        </div>
        <h1 className='text-3xl font-bold my-4'>{movie.title}</h1>
        <div className='font-medium text-xl'>
          Overview
        </div>
        <div className='mt-6 w-96'>
          {movie.overview}
        </div>
    </div>
  )
}

export default MovieDetailPage