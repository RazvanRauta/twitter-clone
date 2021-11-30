/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:33
 */

import React, { ReactElement } from 'react';
import { HiOutlineDotsHorizontal as DotsHorizontalIcon } from 'react-icons/hi';

import NextImage from '../NextImage';

import { ITrendingResult } from '@/types';

interface TrendingProps {
  result: ITrendingResult;
}

export default function Trending({ result }: TrendingProps): ReactElement {
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between'>
      <div className='space-y-0.5'>
        <p className='text-[#6e767d] text-xs font-medium'>{result.heading}</p>
        <h6 className='font-bold max-w-[250px] text-sm'>
          {result.description}
        </h6>
        <p className='text-[#6e767d] text-xs font-medium max-w-[250px]'>
          Trending with{' '}
          {result.tags.map((tag, index) => (
            <span className='tag' key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <NextImage
          src={result.img}
          width={70}
          height={70}
          objectFit='cover'
          alt='Profile Pic'
          imgClassName='rounded-2xl'
        />
      ) : (
        <div className='icon group'>
          <DotsHorizontalIcon
            size='20px'
            className=' text-[#6e767d] group-hover:text-[#1d9bf0]'
          />
        </div>
      )}
    </div>
  );
}
