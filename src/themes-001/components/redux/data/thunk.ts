import { createAsyncThunk } from '@reduxjs/toolkit';

import { IArticle } from 'interface/section';
import { GET } from 'services';
import { RootState } from '../store';

export type TPageType = 'category' | 'search' | 'tag';

interface IThunkReturn {
  nextLink: string;
  list: IArticle[];
}

const loadMore = createAsyncThunk<IThunkReturn, TPageType>('data/load-more', async (_arg, { rejectWithValue, getState }) => {
  try {
    const {
      data: { nextLink }
    } = getState() as RootState;
    const resData = await GET(`${nextLink}`, false, true);
    return {
      list: resData.data || [],
      nextLink: resData.links?.next || ''
    };
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response.data);
  }
});

export { loadMore };
