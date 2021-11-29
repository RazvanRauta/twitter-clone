/* eslint-disable @next/next/no-img-element */
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import clsx from 'clsx';
import type { EmojiData } from 'emoji-mart';
import { Picker } from 'emoji-mart';
import toString from 'lodash/toString';
import { signOut } from 'next-auth/react';
import { ReactElement, SyntheticEvent, useCallback } from 'react';
import React, { useRef, useState } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiOutlineX,
} from 'react-icons/hi';

import 'emoji-mart/css/emoji-mart.css';
import styles from './styles.module.css';

import { db, storage } from '@/lib/firebase';
import useOnClickOutside from '@/lib/useOnClickOutside';

import NextImage from '../NextImage';

export default function AddTweet(): ReactElement {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const picker = useRef<HTMLDivElement>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  const addImageToPost = (e: SyntheticEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      reader.readAsDataURL(e.currentTarget.files[0]);
    }

    reader.onload = () => {
      setSelectedFile(toString(reader.result));
    };
  };

  const addEmoji = (emoji: EmojiData) => {
    if ('native' in emoji) {
      setInput(input + emoji.native);
    }
  };

  const dismissPicker = useCallback(() => {
    setShowEmojis(false);
  }, [setShowEmojis]);

  useOnClickOutside(picker, dismissPicker);

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      // id: session.user?.uid,
      // username: session.user?.name,
      // userImg: session.user?.image,
      // tag: session.user?.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      try {
        await uploadString(imageRef, selectedFile, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
              image: downloadURL,
            });
          }
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    setLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <div
      className={clsx(styles['add-tweet-container'], loading && styles.loading)}
    >
      <NextImage
        src={'https://avatars0.githubusercontent.com/u/40596596?v=4'}
        alt='User Image'
        useSkeleton
        imgClassName='rounded-full cursor-pointer'
        width={44}
        height={44}
        onClick={() => signOut()}
      />
      <div className='w-full divide-y divide-gray-700'>
        <div className={clsx(selectedFile && 'pb-7', input && 'space-y-2.5')}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className={styles['textarea-input']}
          />

          {selectedFile && (
            <div className='relative'>
              <div
                className={styles['remove-selected-files']}
                onClick={() => setSelectedFile(null)}
              >
                <HiOutlineX className='h-5 text-white' />
              </div>
              <img
                src={selectedFile}
                alt='Selected file'
                className='object-contain rounded-2xl max-h-80'
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
                  onChange={addImageToPost}
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
              <div ref={picker} className='absolute'>
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
              className={styles['tweet-button']}
              disabled={!input && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
