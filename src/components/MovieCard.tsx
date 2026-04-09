"use client"
import React from 'react'
import  Image  from 'next/image'
import Link from 'next/link';

interface MovieCardProps {
  id: number;
  thumbnail: string;
  name: string;
}

const MovieCard : React.FC<MovieCardProps> = ({ id, thumbnail, name }) => {
  
  const imageStyle: React.CSSProperties = {
    objectFit: 'fill',
  };
  
  return (
    <Link href={`/movie/${id}`} className='rounded-xl w-60 max-w-xs overflow-clip'>
      <div className='relative w-full h-75'>
        <Image fill={true} src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`} alt={name} style={imageStyle} />
      </div>
      <h3 className='text-lg font-bold my-2 text-center max-w-full wrap-break-word px-4'>{name}</h3>
    </Link>
  )
}

export default MovieCard