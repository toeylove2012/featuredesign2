import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { loadMore, TPageType } from './redux/data/thunk';
import { useAppDispatch, useAppSelector } from './redux/store';

type Props = {
  children?: ReactNode;
  className?: string;
  pageStart?: number;
  threshold?: number;
  initialLoad?: boolean;
  hasMore?: boolean;
  useWindow?: boolean;
  loader?: ReactElement;
  onLoadMore?: () => void;
  pageType?: TPageType;
};

const Index: NextPage<Props> = ({ children, className, pageStart = 0, threshold = 4000, initialLoad, useWindow = true, hasMore, loader, onLoadMore, pageType }) => {
  const dispatch = useAppDispatch();
  const nextLink = useAppSelector(state => state.data.nextLink);
  const idsLength = useAppSelector(state => state.data.ids.length);
  const isInitialLoad: boolean = initialLoad === undefined ? idsLength < 7 : initialLoad;
  return (
    <InfiniteScroll
      className={className}
      pageStart={pageStart}
      threshold={threshold}
      initialLoad={isInitialLoad}
      hasMore={hasMore !== undefined ? hasMore : !!nextLink}
      useWindow={useWindow}
      loadMore={() => {
        if (onLoadMore) return onLoadMore();
        if (pageType) return dispatch(loadMore(pageType));
      }}
      loader={loader || <DefaultLoader />}
    >
      {children}
    </InfiniteScroll>
  );
};

const DefaultLoader: NextPage = () => (
  <div className='fetching' key='loading'>
    {' '}
    Loading...{' '}
  </div>
);

export default Index;
