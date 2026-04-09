"use client"
import React from 'react'
import  Image  from 'next/image'

interface MovieCardProps {
  thumbnail: string;
  name: string;
}

const MovieCard : React.FC<MovieCardProps> = ({ thumbnail, name }) => {
  return (
    <div className='rounded-xl w-60 max-w-xs overflow-clip'>
      <div className='relative w-full h-75'>
        <Image fill={true} src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`} alt={name} />
      </div>
      <h3 className='text-lg font-bold my-2 text-center max-w-full wrap-break-word px-4'>{name}</h3>
    </div>
  )
}

export default MovieCard