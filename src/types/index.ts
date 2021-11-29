/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 28 2021
 * @ Time: 16:35
 */

import { IconType } from 'react-icons/lib';

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
