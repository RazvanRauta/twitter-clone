/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:20
 */

import { DocumentData } from '@firebase/firestore';
import { formatDistance } from 'date-fns';
import React, { ReactElement } from 'react';
import {
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineChat as ChatIcon,
  HiOutlineDotsHorizontal as DotsHorizontalIcon,
  HiOutlineHeart as HeartIcon,
  HiOutlineShare as ShareIcon,
} from 'react-icons/hi';

import NextImage from '../NextImage';

interface Props {
  comment: DocumentData;
}

export default function Comment({ comment }: Props): ReactElement {
  return (
    <div className='flex p-3 border-b border-gray-700 cursor-pointer'>
      {comment?.userImg && (
        <NextImage
          src={comment.userImg}
          alt='Profile Pic'
          className='mr-4'
          imgClassName='rounded-full h-11 w-11'
          width={44}
          height={44}
        />
      )}
      <div className='flex flex-col w-full space-y-2'>
        <div className='flex justify-between'>
          <div className='text-[#6e767d]'>
            <div className='inline-block group'>
              <h4 className='font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline'>
                {comment?.username}
              </h4>
              <span className='ml-1.5 text-sm sm:text-[15px]'>
                @{comment?.tag}{' '}
              </span>
            </div>{' '}
            ·{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <time>
                {formatDistance(
                  new Date(comment?.timestamp?.toDate() || Date.now()),
                  new Date(),
                  { addSuffix: true }
                )}
              </time>
            </span>
            <p className='text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base'>
              {comment?.comment}
            </p>
          </div>
          <div className='flex-shrink-0 icon group'>
            <DotsHorizontalIcon
              size='20px'
              className='text-[#6e767d] group-hover:text-[#1d9bf0]'
            />
          </div>
        </div>

        <div className='text-[#6e767d] flex justify-between w-10/12'>
          <div className='icon group'>
            <ChatIcon size='20px' className=' group-hover:text-[#1d9bf0]' />
          </div>

          <div className='flex items-center space-x-1 group'>
            <div className='icon group-hover:bg-pink-600/10'>
              <HeartIcon size='20px' className=' group-hover:text-pink-600' />
            </div>
            <span className='text-sm group-hover:text-pink-600'></span>
          </div>

          <div className='icon group'>
            <ShareIcon size='20px' className=' group-hover:text-[#1d9bf0]' />
          </div>
          <div className='icon group'>
            <ChartBarIcon size='20px' className=' group-hover:text-[#1d9bf0]' />
          </div>
        </div>
      </div>
    </div>
  );
}
