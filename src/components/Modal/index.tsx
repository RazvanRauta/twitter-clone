/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 18:31
 */

import { Dialog, Transition } from '@headlessui/react';
import formatDistance from 'date-fns/formatDistance';
import type { EmojiData } from 'emoji-mart';
import { Picker } from 'emoji-mart';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { Fragment, useCallback, useRef, useState } from 'react';
import {
  HiOutlineCalendar as CalendarIcon,
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineEmojiHappy as EmojiHappyIcon,
  HiOutlinePhotograph as PhotographIcon,
  HiOutlineX as XIcon,
} from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '@/lib/store-hooks';
import useOnClickOutside from '@/lib/useOnClickOutside';

import {
  useCreateCommentMutation,
  useGetTweetQuery,
} from '@/service/tweet-api';
import {
  getModalPostId,
  isModalOpen,
  setModalIsOpen,
  setModalPostId,
} from '@/store/modal/modalSlice';

import NextImage from '../NextImage';
import Spinner from '../Spinner';

import type { TweetWithCommentsAndCount } from '@/types';

export default function Modal(): ReactElement {
  const postId = useAppSelector(getModalPostId);
  const isOpen = useAppSelector(isModalOpen);

  const [comment, setComment] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const picker = useRef<HTMLDivElement>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  let post: TweetWithCommentsAndCount | null = null;

  const [createComment] = useCreateCommentMutation();
  const { data, isLoading } = useGetTweetQuery(postId || '');

  if (data && data.success) {
    if (data.data && 'id' in data.data) post = data.data;
  }

  const setPostId = (id: string) => {
    dispatch(setModalPostId(id));
  };

  const setIsOpen = (val: boolean) => {
    dispatch(setModalIsOpen(val));
  };

  const sendComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    createComment({
      comment,
      tweetId: post?.id || '',
      timestamp: new Date(),
    })
      .unwrap()
      .then(() => {
        setIsOpen(false);
        setComment('');
        setPostId('');

        router.push(`/t/${postId}`);
      });
  };

  const addEmoji = (emoji: EmojiData) => {
    if ('native' in emoji) {
      setComment(comment + emoji.native);
    }
  };

  const dismissPicker = useCallback(() => {
    setShowEmojis(false);
  }, [setShowEmojis]);

  useOnClickOutside(picker, dismissPicker);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50 pt-8' onClose={setIsOpen}>
        <div className='flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-black shadow-xl rounded-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full'>
              <div className='flex items-center px-1.5 py-2 border-b border-gray-700'>
                <div
                  className='flex items-center justify-center hoverAnimation w-9 h-9 xl:px-0'
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className='h-[22px] text-white' />
                </div>
              </div>
              <div className='flex px-4 pt-5 pb-2.5 sm:px-6'>
                <div className='w-full'>
                  <div className='text-[#6e767d] flex gap-x-3 relative'>
                    <span className='w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600' />
                    {post?.user?.image && (
                      <NextImage
                        src={post?.user?.image}
                        alt='Profile Pic'
                        className='mr-4'
                        imgClassName='rounded-full h-11 w-11'
                        width={44}
                        height={44}
                      />
                    )}
                    <div>
                      <div className='inline-block group'>
                        <h4 className='font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base'>
                          {post?.user?.name}
                        </h4>
                        <span className='ml-1.5 text-sm sm:text-[15px]'>
                          @{post?.user?.tag}{' '}
                        </span>
                      </div>{' '}
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
                      <p className='text-[#d9d9d9] text-[15px] sm:text-base'>
                        {post?.text}
                      </p>
                    </div>
                    {isLoading && <Spinner />}
                  </div>

                  <div className='flex w-full space-x-3 mt-7'>
                    {post?.user?.image && (
                      <NextImage
                        src={post?.user.image}
                        alt='Profile Pic'
                        className='mr-4'
                        imgClassName='rounded-full h-11 w-11'
                        width={44}
                        height={44}
                      />
                    )}
                    <div className='flex-grow mt-2'>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Tweet your reply'
                        rows={2}
                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]'
                      />

                      <div className='flex items-center justify-between pt-2.5'>
                        <div className='relative flex items-center'>
                          <div className='icon'>
                            <PhotographIcon
                              size='22px'
                              className='text-[#1d9bf0]'
                            />
                          </div>

                          <div className='rotate-90 icon'>
                            <ChartBarIcon
                              size='22px'
                              className='text-[#1d9bf0]'
                            />
                          </div>

                          <div className='icon'>
                            <EmojiHappyIcon
                              size='22px'
                              className='text-[#1d9bf0]'
                              onClick={() => setShowEmojis(!showEmojis)}
                            />
                          </div>

                          <div className='icon'>
                            <CalendarIcon
                              size='22px'
                              className='text-[#1d9bf0]'
                            />
                          </div>
                          <div ref={picker} className='absolute z-10'>
                            {showEmojis && (
                              <Picker
                                onSelect={addEmoji}
                                style={{
                                  position: 'absolute',
                                  marginTop: '50px',
                                  marginLeft: -40,
                                  maxWidth: '320px',
                                  borderRadius: '20px',
                                }}
                                theme='dark'
                              />
                            )}
                          </div>
                        </div>
                        <button
                          className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-default'
                          type='submit'
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
