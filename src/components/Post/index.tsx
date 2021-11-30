/* eslint-disable @next/next/no-img-element */
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from '@firebase/firestore';
import formatDistance from 'date-fns/formatDistance';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import {
  HiHeart as HeartIconFilled,
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineChat as ChatIcon,
  HiOutlineDotsHorizontal as DotsHorizontalIcon,
  HiOutlineHeart as HeartIcon,
  HiOutlineShare as ShareIcon,
  HiOutlineSwitchHorizontal as SwitchHorizontalIcon,
  HiOutlineTrash as TrashIcon,
} from 'react-icons/hi';

import { db } from '@/lib/firebase';

import NextImage from '../NextImage';

import { ICustomSession, ITweet } from '@/types';

interface PostProps {
  id: string;
  post?: ITweet;
  postPage?: boolean;
}

export default function Post({ id, post, postPage }: PostProps): ReactElement {
  const { data: sess } = useSession();

  const session = sess as ICustomSession;

  const [comments, setComments] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes, session?.user?.uid]
  );

  const likePost = async () => {
    if (session?.user?.uid) {
      if (liked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session?.user?.name,
        });
      }
    }
  };

  return (
    <div
      className='flex p-3 border-b border-gray-700 cursor-pointer'
      onClick={() => router.push(`/t/${id}`)}
    >
      {!postPage && post?.userImg && (
        <NextImage
          src={post.userImg}
          alt='Profile Pic'
          className='mr-4'
          imgClassName='rounded-full h-11 w-11'
          width={44}
          height={44}
        />
      )}
      <div className='flex flex-col w-full space-y-2'>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && post?.userImg && (
            <NextImage
              src={post?.userImg}
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
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>
            ·{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <time>
                {formatDistance(
                  new Date(post?.timestamp?.toDate() || Date.now()),
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
        <img
          src={post?.image}
          alt=''
          className='rounded-2xl max-h-[700px] object-cover mr-2'
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && 'mx-auto'
          }`}
        >
          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              // setPostId(id);
              // setIsOpen(true);
            }}
          >
            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
              <ChatIcon size='20px' className=' group-hover:text-[#1d9bf0]' />
            </div>
            {comments.length > 0 && (
              <span className='group-hover:text-[#1d9bf0] text-sm'>
                {comments.length}
              </span>
            )}
          </div>

          {session?.user?.uid === post?.id ? (
            <div
              className='flex items-center space-x-1 group'
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, 'posts', id));
                router.push('/');
              }}
            >
              <div className='icon group-hover:bg-red-600/10'>
                <TrashIcon size='20px' className=' group-hover:text-red-600' />
              </div>
            </div>
          ) : (
            <div className='flex items-center space-x-1 group'>
              <div className='icon group-hover:bg-green-500/10'>
                <SwitchHorizontalIcon
                  size='20px'
                  className=' group-hover:text-green-500'
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
                <HeartIconFilled size='20px' className='text-pink-600 ' />
              ) : (
                <HeartIcon size='20px' className=' group-hover:text-pink-600' />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && 'text-pink-600'
                }`}
              >
                {likes.length}
              </span>
            )}
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
