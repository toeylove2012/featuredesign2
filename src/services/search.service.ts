import { IArticle, IMeta } from 'interface/section';
import { IAds, ILastNews, INavBar, IRelated } from 'interface/service';
import _ from 'lodash';
import { Session } from 'next-auth';
import { GET, GET_ARTICLES } from 'services';
import { convertObjPath, timestamp } from 'utils/helper';
import { getMember } from './member-auth/member.auth.service';

type TInitPropsSearchPage = {
  statusCode: number;
  errMessage: string | null;
  articles: IArticle;
  lastNews: ILastNews[];
  related: IRelated[];
  searchText: string;
  nextArticles: IArticle[];
  meta: IMeta[];
  navBar: INavBar[];
  ads: IAds[];
  dataTags?: any;
  sessionSevId: Session | null;
};
export const getSearchPage = async ({ req, res, query }: any): Promise<TInitPropsSearchPage> => {
  const initProps: TInitPropsSearchPage = {
    statusCode: 200,
    errMessage: null,
    articles: {},
    lastNews: [],
    related: [],
    searchText: '',
    nextArticles: [],
    meta: [],
    navBar: [],
    ads: [],
    dataTags: [],
    sessionSevId: null
  };

  try {
    initProps.sessionSevId = await getMember({ req });

    const fetchMenuNav = await GET('/api/v1.0/navigations/menu-nav');
    if (!_.isEmpty(fetchMenuNav)) initProps.navBar = fetchMenuNav;

    if (query?.q?.length > 70) {
      res.setHeader('location', '/category/latest-news');
      res.statusCode = 301;
      res.end();
    } else {
      const getTag = await GET('/api/v1.0/home/get-tags');
      if (!_.isEmpty(getTag)) {
        initProps.dataTags = getTag.tags;
      }
      const resData = await GET_ARTICLES(
        `/api/search${convertObjPath({
          q: query.q
        })}`,
        false,
        true
      );

      if (resData?.statusCode === 404 || _.isUndefined(resData)) {
        res.setHeader('location', '/category/latest-news');
        res.statusCode = 301;
        res.end();
      }
      if (!_.isEmpty(resData?.data)) {
        initProps.articles = resData.data || [];
        initProps.meta = resData?.meta;
        initProps.lastNews = resData.last_news ? resData.last_news.slice(0, 5) : [];

        initProps.nextArticles = resData?.links || {};
        initProps.ads = resData?.ads || [];
        initProps.searchText = query?.q || '';
      }
    }
    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> SEARCH ERROR : `, err.message);
    throw err;
  }
};

type TList = {
  name: string;
  limit?: number;
};
export const getSearch = async (list: TList[]): Promise<any> => {
  try {
    if (list.length === 1) {
      const result = await GET(`/api/search/tag${convertObjPath(list[0])}`);
      return {
        [list[0].name]: result
      };
    }

    const resData = await Promise.all(_.map(list, n => GET(`/api/search${convertObjPath(n)}`)));
    return _.reduce(
      list,
      (res, key, index) => ({
        ...res,
        [key.name]: resData[index]
      }),
      {}
    );
  } catch (err: any) {
    console.error(`${timestamp()} ==========> SEARCH ERROR : `, err.message);
    throw err;
  }
};
