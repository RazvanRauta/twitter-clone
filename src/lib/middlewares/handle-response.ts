/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 02 2021
 * @ Time: 20:23
 */

import type { NextApiResponse } from 'next';

import type { ApiResponse } from '@/types';

type SendResponseProps<T> = {
  res: NextApiResponse<ApiResponse<T>>;
  status: number;
  error?: string;
  data?: T;
  count?: number;
};

export const sendResponse = <T = []>({
  res,
  status,
  data,
  count = 0,
  error,
}: SendResponseProps<T>): void => {
  res.status(status);

  const errorReg = new RegExp(/^5[0-9][0-9]|^4[0-9][0-9]$/, 'g');

  const isError = errorReg.test(status.toString());

  if (isError) {
    if (!error) {
      throw new Error('The error message is missing in sendResponse function');
    }
    res.json({ success: false, error });
    res.end();
  } else {
    if (status !== 204) {
      res.json({ success: true, count, data });
    }
    res.end();
  }
};
