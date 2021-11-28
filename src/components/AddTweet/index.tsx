import { Picker } from 'emoji-mart';
import noop from 'lodash/noop';
import type { ReactElement } from 'react';
import React, { useRef, useState } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiOutlineX,
} from 'react-icons/hi';

import 'emoji-mart/css/emoji-mart.css';

import NextImage from '../NextImage';

export default function AddTweet(): ReactElement {
  const [input, setInput] = useState<string>('');
  const [loading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && 'opacity-60'
      }`}
    >
      <NextImage
        src={'https://avatars0.githubusercontent.com/u/40596596?v=4'}
        alt='User Image'
        useSkeleton
        imgClassName='rounded-full cursor-pointer'
        width={44}
        height={44}
        onClick={noop}
      />
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
          />

          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile('')}
              >
                <HiOutlineX className='h-5 text-white' />
              </div>
              <NextImage
                src={selectedFile}
                alt='Selected file'
                className='object-contain rounded-2xl max-h-80'
                height={320}
                width={600}
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef?.current?.click()}
              >
                <HiOutlinePhotograph className='text-[#1d9bf0]' size='22px' />
                <input
                  type='file'
                  accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm'
                  ref={filePickerRef}
                  hidden
                  onChange={noop}
                />
              </div>

              <div className='rotate-90 icon'>
                <HiOutlineChartBar className='text-[#1d9bf0]' size='22px' />
              </div>

              <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                <HiOutlineEmojiHappy className='text-[#1d9bf0]' size='22px' />
              </div>

              <div className='icon'>
                <HiOutlineCalendar className='text-[#1d9bf0]' size='22px' />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={noop}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme='dark'
                />
              )}
            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
              disabled={!input && !selectedFile}
              onClick={noop}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
