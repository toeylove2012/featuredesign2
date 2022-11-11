import { IArticle, IMeta } from 'interface/section';
import { IAds } from 'interface/service';
import _ from 'lodash';
import { Session } from 'next-auth';
import { GET, GET_ARTICLES } from 'services';
import { convertObjPath, timestamp } from 'utils/helper';
import { getMember } from './member-auth/member.auth.service';

type TInitPropsTags = {
  statusCode: number;
  errMessage: string | null;
  articles: IArticle[];
  tagText: string;
  nextArticles: IArticle[];
  meta: IMeta[];
  lastNews: IArticle[];
  ads: IAds[];
  dataTags?: any;
  sessionSevId: Session | null;
};
export const getTagsPage = async ({ req, res, query }: any): Promise<TInitPropsTags> => {
  const initProps: TInitPropsTags = {
    statusCode: 200,
    errMessage: null,
    articles: [],
    tagText: '',
    nextArticles: [],
    meta: [],
    ads: [],
    lastNews: [],
    dataTags: [],
    sessionSevId: null
  };

  try {
    // initProps.sessionSevId = await getMember({ req });

    // const fetchMenuNav = await GET('/api/v1.0/navigations/menu-nav');
    // if (!_.isEmpty(fetchMenuNav)) initProps.navBar = fetchMenuNav;

    if (query?.id?.length > 150) {
      res.setHeader('location', '/category/latest-news');
      res.statusCode = 301;
      res.end();
    } else {
      const getTag = await GET('/api/v1.0/home/get-tags');
      if (!_.isEmpty(getTag)) {
        initProps.dataTags = getTag.tags;
      }
      const resData = await GET_ARTICLES(
        `/api/search/tag${convertObjPath({
          name: query.id
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
        initProps.meta = resData?.meta || {};
        initProps.nextArticles = resData.links || {};
        initProps.tagText = query.id || '';
        initProps.ads = resData.ads || [];
        initProps.lastNews = resData.last_news || [];
      }
    }
    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> TAG ERROR : `, err.message);
    throw err;
  }
};

type TList = {
  name: string;
  limit?: number;
};
export const getTags = async (list: TList[]): Promise<any> => {
  try {
    if (list.length === 1) {
      const result = await GET(`/api/search/tag${convertObjPath(list[0])}`);
      return {
        [list[0].name]: result
      };
    }

    const resData = await Promise.all(_.map(list, n => GET(`/api/search/tag${convertObjPath(n)}`)));

    return _.reduce(
      list,
      (res, key, index) => ({
        ...res,
        [key.name]: resData[index]
      }),
      {}
    );
  } catch (err: any) {
    console.error(`${timestamp()} ==========> TAG ERROR : `, err.message);
    throw err;
  }
};
