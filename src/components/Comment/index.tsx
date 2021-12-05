/**
 *  @author: Razvan Rauta
 *  Date: Nov 30 2021
 *  Time: 12:20
 */

import type { Comment } from '@prisma/client';
import formatDistance from 'date-fns/formatDistance';
import { useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  HiHeart as HeartIconFilled,
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineChat as ChatIcon,
  HiOutlineDotsHorizontal as DotsHorizontalIcon,
  HiOutlineHeart as HeartIcon,
  HiOutlineShare as ShareIcon,
  HiOutlineTrash as TrashIcon,
} from 'react-icons/hi';

import {
  useCreateCommentLikeMutation,
  useDeleteCommentLikeMutation,
  useDeleteCommentMutation,
} from '@/service/tweet-api';

import NextImage from '../NextImage';

import type { CommentWithUser } from '@/types';

interface Props {
  comment: CommentWithUser;
}

export default function Comment({ comment }: Props): ReactElement {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [createLike] = useCreateCommentLikeMutation();
  const [deleteLike] = useDeleteCommentLikeMutation();
  const [deleteComment] = useDeleteCommentMutation();

  useEffect(
    () =>
      setLiked(
        comment
          ? comment.commentLikes.findIndex(
              (like) => like.user.email === session?.user?.email
            ) !== -1
          : false
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comment?.commentLikes, session?.user?.email]
  );

  const likeComment = useCallback(() => {
    if (session?.user?.email) {
      setLiked(!liked);
      if (liked) {
        const like =
          comment &&
          comment.commentLikes.find(
            (like) => like.user.email === session?.user?.email
          );
        if (like) {
          deleteLike({ id: like.id });
        }
      } else {
        createLike({ commentId: comment.id });
      }
    }
  }, [comment, createLike, deleteLike, liked, session?.user?.email]);

  const handleDeleteComment = useCallback(() => {
    deleteComment({ id: comment.id });
  }, [comment, deleteComment]);

  return (
    <div className='flex p-3 border-b border-gray-700 cursor-pointer'>
      {comment?.user?.image && (
        <NextImage
          src={comment.user.image}
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
                {comment?.user?.name}
              </h4>
              <span className='ml-1.5 text-sm sm:text-[15px]'>
                @{comment?.user?.tag}{' '}
              </span>
            </div>{' '}
            ·{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <time>
                {formatDistance(
                  new Date(comment?.timestamp || Date.now()),
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

          {session?.user?.email === comment?.user?.email && (
            <div
              className='flex items-center space-x-1 group'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteComment();
              }}
            >
              <div className='icon group-hover:bg-red-600/10'>
                <TrashIcon size='20px' className=' group-hover:text-red-600' />
              </div>
            </div>
          )}

          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              likeComment();
            }}
          >
            <div className='icon group-hover:bg-pink-600/10'>
              {liked ? (
                <HeartIconFilled size='20px' className='text-pink-600 ' />
              ) : (
                <HeartIcon size='20px' className=' group-hover:text-pink-600' />
              )}
            </div>
            <span
              className={`group-hover:text-pink-600 text-sm ${
                liked && 'text-pink-600'
              }`}
            >
              {comment?._count.commentLikes}
            </span>
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
