/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 28 2021
 * @ Time: 16:35
 */
import type { DocumentData, Timestamp } from '@firebase/firestore';
import type Prisma from '@prisma/client';
import type { Comment, Tweet, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
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

export type FireBaseUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  tag?: string | null;
  uid?: string | null;
};

export interface ITweet extends DocumentData {
  text: string;
  image?: string;
  timestamp: Timestamp;
  id: string;
  tag: string;
  userImg?: string;
  username: string;
}

export interface IComment extends DocumentData {
  comment: string;
  tag: string;
  timestamp: Timestamp;
  userImg?: string;
  username: string;
}

export interface ITweetLike extends DocumentData {
  username: string;
}

export interface NextApiRequestWithUser<T> extends NextApiRequest {
  user?: Prisma.User;
  body: T;
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export interface ApiSuccessResponse<T = []> {
  success: true;
  count: number;
  data: T | never[];
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = []> = ApiSuccessResponse<T> | ApiErrorResponse;

export type TweetWithUser = Tweet & {
  user?: User;
};

export type TweetWithUserAndCount = TweetWithUser & {
  _count: {
    comments: number;
    likes: number;
  };
};

export type CommentWithUser = Comment & {
  user?: User;
};

export type TweetWithComments = TweetWithUser & {
  comments?: CommentWithUser[];
};

export type TweetsWithUser = TweetWithUser[];

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
