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
