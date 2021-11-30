/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 28 2021
 * @ Time: 16:35
 */
import { DocumentData, Timestamp } from '@firebase/firestore';
import { DefaultSession, Session } from 'next-auth';
import type { IconType } from 'react-icons/lib';

export interface ISideBarLink {
  Icon: IconType;
  text: string;
}

export type SideBarLinks = ISideBarLink[];

export interface ITrendingResult {
  heading: string;
  description: string;
  img: string;
  tags: string[];
}

export type TrendingResults = ITrendingResult[];

export interface IFollowerResult {
  userImg: string;
  username: string;
  tag: string;
}

export type FollowerResults = IFollowerResult[];

export type CustomUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  tag?: string | null;
  uid?: string | null;
};

export interface ICustomSession extends Session, DefaultSession {
  user?: CustomUser;
}

export interface ITweet extends DocumentData {
  text: string;
  image?: string;
  timestamp: Timestamp;
  id: string;
  tag: string;
  userImg?: string;
  username: string;
}

export type Tweets = ITweet[];
