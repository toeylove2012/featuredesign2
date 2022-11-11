import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { IArticle } from 'interface/section';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import { timestamp } from 'utils/helper';
import { IDataLayerGlobal } from 'interface/data-layer';
import { loadMore, TPageType } from './thunk';

interface IEntity {
  id: number | string;
  data: IArticle;
  eventDataLayer: IDataLayerGlobal;
}

interface IInitialValuePayload {
  pageType: TPageType;
  keyword?: string;
  nextLink: string;
  router: string;
  list: IArticle[];
}

interface IState extends EntityState<IEntity> {
  nextLink: string;
  router: string;
  keyword: string;
}

// entity
const dataAdapter = createEntityAdapter<IEntity>();

// initial state
const initialState: IState = {
  nextLink: '',
  router: '',
  keyword: '',
  ...dataAdapter.getInitialState()
};

// slice
const dataSlice = createSlice({
  name: 'data',
  initialState: _.cloneDeep(initialState),
  reducers: {
    clear: state => {
      state.nextLink = '';
      state.router = '';
      state.keyword = '';
      state.ids = [];
      state.entities = {};
    },
    initialValue: (state, { payload }: PayloadAction<IInitialValuePayload>) => {
      const { list, router, nextLink, pageType, keyword } = payload;
      state.nextLink = list.length === 0 || !nextLink ? '' : nextLink;
      state.router = router || '';
      state.keyword = keyword || '';
      dataAdapter.addMany(state, getListEntity[pageType](list, router, state.ids.length, keyword));
    }
  },
  extraReducers: builder => {
    builder.addCase(loadMore.fulfilled, (state, { payload, meta }) => {
      const { router, keyword, ids } = state;
      const { list, nextLink } = payload;
      const { arg: pageType } = meta;
      state.nextLink = list.length === 0 ? '' : nextLink;
      dataAdapter.addMany(state, getListEntity[pageType](list, router, ids.length, keyword));
    });
    builder.addCase(loadMore.rejected, (state, { payload, error }) => {
      console.error(`${timestamp()}==========> LOAD_DATA ERROR : ${state.nextLink}`, payload || error.message);
    });
  }
});

// action
export const dataAction = dataSlice.actions;

// reducer
export default dataSlice.reducer;

// logic
const getListEntity = {
  search: (list: IArticle[], router: string, offset: number, keyword?: string): IEntity[] =>
    _.map(list, (data: IArticle, index: number) => ({
      id: data.id || _.uniqueId('data-'),
      data,
      eventDataLayer: {
        type: DATALAYER_TYPE.TRACK_POSITION,
        router,
        section: 'section-1',
        position: 'ใต้:header',
        data: {
          title: data.title,
          heading: `ผลการค้นหา ${keyword}`,
          index: offset + index + 1
        }
      }
    })),
  category: (list: IArticle[], router: string, offset: number): IEntity[] =>
    _.map(list, (data: IArticle, index: number) => ({
      id: data.id || _.uniqueId('data-'),
      data,
      eventDataLayer: {
        type: DATALAYER_TYPE.TRACK_POSITION,
        router,
        section: 'section-1',
        position: 'ใต้:header',
        data: {
          title: data.title,
          heading: data.section?.th,
          index: offset + index + 1
        }
      }
    })),
  tag: (list: IArticle[], router: string, offset: number, keyword?: string): IEntity[] =>
    _.map(list, (data: IArticle, index: number) => ({
      id: data.id || _.uniqueId('data-'),
      data,
      eventDataLayer: {
        type: DATALAYER_TYPE.TRACK_POSITION,
        router,
        section: 'section-1',
        position: 'ใต้:header',
        data: {
          title: data.title,
          heading: `แท็กที่เกี่ยวข้อง ${keyword}`,
          index: offset + index + 1
        }
      }
    }))
};
