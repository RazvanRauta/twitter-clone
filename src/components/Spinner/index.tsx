/**
 *  @author: Razvan Rauta
 *  Date: Dec 02 2021
 *  Time: 22:53
 */

import type { ReactElement } from 'react';
import React from 'react';

export default function Spinner(): ReactElement {
  return (
    <div className='min-h-[250px] flex justify-center items-center'>
      <div className='border-[#1a8cd8] w-20 h-20 rounded-full border-t-4 border-b-4 animate-spin'></div>
    </div>
  );
}
