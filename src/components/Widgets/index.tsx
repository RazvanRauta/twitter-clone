/**
 *  @author: Razvan Rauta
 *  Date: Nov 29 2021
 *  Time: 18:31
 */

import type { ReactElement } from 'react';
import React from 'react';

import type { FollowerResults, TrendingResults } from '@/types';

interface WidgetsProps {
  trendingResults: TrendingResults;
  followResults: FollowerResults;
}

export const Widgets = ({
  followResults,
  trendingResults,
}: WidgetsProps): ReactElement => {
  return (
    <div className='hidden'>
      <ul>
        {followResults.map((rs) => (
          <li key={rs.username}>{rs.username}</li>
        ))}
      </ul>
      <ul>
        {trendingResults.map((rs) => (
          <li key={rs.description}>{rs.description}</li>
        ))}
      </ul>
    </div>
  );
};
