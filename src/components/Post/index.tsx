/* eslint-disable @next/next/no-img-element */
import formatDistance from 'date-fns/formatDistance';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import React, { useEffect, useState } from 'react';
import {
  HiHeart as HeartIconFilled,
  HiOutlineChat as ChatIcon,
  HiOutlineDotsHorizontal as DotsHorizontalIcon,
  HiOutlineHeart as HeartIcon,
  HiOutlineShare as ShareIcon,
  HiOutlineSwitchHorizontal as SwitchHorizontalIcon,
  HiOutlineTrash as TrashIcon,
} from 'react-icons/hi';

import { useAppDispatch } from '@/lib/store-hooks';

import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useDeleteTweetMutation,
} from '@/service/tweet-api';
import { setModalIsOpen, setModalPostId } from '@/store/modal/modalSlice';

import NextImage from '../NextImage';

import type { TweetWithUserAndCount } from '@/types';

interface PostProps {
  id: string;
  post?: TweetWithUserAndCount;
  postPage?: boolean;
}

export default function Post({ id, post, postPage }: PostProps): ReactElement {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [deleteTweet] = useDeleteTweetMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const setIsOpen = (val: boolean) => {
    dispatch(setModalIsOpen(val));
  };

  const setPostId = (id: string) => {
    dispatch(setModalPostId(id));
  };

  useEffect(
    () => {
      setLiked(
        post
          ? post.likes.findIndex(
              (like) => like.user.email === session?.user?.email
            ) !== -1
          : false
      );

      setLikesCount(post ? post._count.likes : 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [post?.likes, session?.user?.email]
  );

  const likePost = useCallback(() => {
    if (session?.user?.email) {
      setLiked(!liked);
      if (liked) {
        const like =
          post &&
          post.likes.find((like) => like.user.email === session?.user?.email);
        if (like) {
          deleteLike({ id: like.id });
        }
      } else {
        createLike({ tweetId: id });
      }
    }
  }, [createLike, deleteLike, id, liked, post, session?.user?.email]);

  const handleDeleteTweet = useCallback(() => {
    deleteTweet({ id });
  }, [deleteTweet, id]);

  return (
    <div
      className='flex p-3 border-b border-gray-700 cursor-pointer'
      onClick={() => router.push(`/t/${id}`)}
    >
      {!postPage && post?.user && (
        <NextImage
          src={post.user.image || ''}
          alt='Profile Pic'
          className='mr-4'
          imgClassName='rounded-full h-11 w-11'
          width={44}
          height={44}
          title={post.user.name || ''}
        />
      )}
      <div className='flex flex-col w-full space-y-2'>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && post?.user && (
            <NextImage
              src={post.user.image || ''}
              alt='Profile Pic'
              className='mr-4'
              imgClassName='rounded-full h-11 w-11'
              width={44}
              height={44}
            />
          )}
          <div className='text-[#6e767d]'>
            <div className='inline-block group'>
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.user?.name}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.user?.tag}
              </span>
            </div>
            ·{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <time>
                {formatDistance(
                  new Date(post?.timestamp || Date.now()),
                  new Date(),
                  { addSuffix: true }
                )}
              </time>
            </span>
            {!postPage && (
              <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                {post?.text}
              </p>
            )}
          </div>
          <div className='flex-shrink-0 ml-auto icon group'>
            <DotsHorizontalIcon
              size='20px'
              className=' text-[#6e767d] group-hover:text-[#1d9bf0]'
            />
          </div>
        </div>
        {postPage && (
          <p className='text-[#d9d9d9] mt-0.5 text-xl'>{post?.text}</p>
        )}
        {post?.image && (
          <img
            src={post?.image}
            alt=''
            className='rounded-2xl max-h-[700px] object-cover mr-2'
          />
        )}
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && 'mx-auto'
          }`}
        >
          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
              <ChatIcon
                size='20px'
                className=' group-hover:text-[#1d9bf0]'
                title='Reply'
              />
            </div>

            <span className='group-hover:text-[#1d9bf0] text-sm'>
              {post?._count?.comments}
            </span>
          </div>

          {session?.user?.email === post?.user?.email ? (
            <div
              className='flex items-center space-x-1 group'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTweet();
              }}
            >
              <div className='icon group-hover:bg-red-600/10'>
                <TrashIcon
                  size='20px'
                  className=' group-hover:text-red-600'
                  title='Delete'
                />
              </div>
            </div>
          ) : (
            <div className='flex items-center space-x-1 group'>
              <div className='icon group-hover:bg-green-500/10'>
                <SwitchHorizontalIcon
                  size='20px'
                  className=' group-hover:text-green-500'
                  title='Retweet'
                />
              </div>
            </div>
          )}

          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className='icon group-hover:bg-pink-600/10'>
              {liked ? (
                <HeartIconFilled
                  size='20px'
                  className='text-pink-600 '
                  title='Unlike'
                />
              ) : (
                <HeartIcon
                  size='20px'
                  className=' group-hover:text-pink-600'
                  title='Like'
                />
              )}
            </div>
            <span
              className={`group-hover:text-pink-600 text-sm ${
                liked && 'text-pink-600'
              }`}
            >
              {likesCount}
            </span>
          </div>

          <div className='icon group'>
            <ShareIcon
              size='20px'
              className=' group-hover:text-[#1d9bf0]'
              title='Share'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
