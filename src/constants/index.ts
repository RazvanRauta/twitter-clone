/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 28 2021
 * @ Time: 16:42
 */

import {
  HiHome,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineClipboard,
  HiOutlineDotsCircleHorizontal,
  HiOutlineHashtag,
  HiOutlineInbox,
  HiOutlineUser,
} from 'react-icons/hi';

export const sideBarLinks: SideBarLinks = [
  {
    text: 'Home',
    Icon: HiHome,
  },
  {
    text: 'Explore',
    Icon: HiOutlineHashtag,
  },
  {
    text: 'Notifications',
    Icon: HiOutlineBell,
  },
  {
    text: 'Messages',
    Icon: HiOutlineInbox,
  },
  {
    text: 'Bookmarks',
    Icon: HiOutlineBookmark,
  },
  {
    text: 'Lists',
    Icon: HiOutlineClipboard,
  },
  {
    text: 'Profile',
    Icon: HiOutlineUser,
  },
  {
    text: 'More',
    Icon: HiOutlineDotsCircleHorizontal,
  },
];
