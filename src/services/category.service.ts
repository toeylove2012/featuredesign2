import { IArticle, IMeta } from 'interface/section';
import { IAds, IAffiliate, IResponseData, IValidateFailed } from 'interface/service';
import _ from 'lodash';
// import { Session } from 'next-auth';
import { GET, GET_ARTICLES } from 'services';
import { rewriteTxt, timestamp } from 'utils/helper';
// import { getMember } from './member-auth/member.auth.service';

type TInitProps = {
  statusCode: number;
  errMessage: string | null;
  articles: IArticle[];
  dataTags: any;
  dataPostNext: any;
  lastNews: IArticle[];
  affiliate: IAffiliate[];
  meta: Partial<IMeta>;
  nextArticles: string;
  ads: IAds[];
};
export const getCategoryPage = async ({ res, query }: any): Promise<TInitProps> => {
  const initProps: TInitProps = {
    statusCode: 200,
    errMessage: null,
    articles: [],
    dataTags: [],
    dataPostNext: {},
    lastNews: [],
    affiliate: [],
    meta: {},
    nextArticles: '',
    ads: []
  };
  let uri: string = `categories/${rewriteTxt(query?.cid)}`;
  if (!_.isEmpty(query?.sub)) {
    uri = `categories/${rewriteTxt(query?.cid)}/${query?.sub}`;
  }

  try {
    // console.log('CATEGORY', query?.cid, uri);
    const regex: RegExp = /([ก-๙])/;
    if (regex.test(query?.cid)) {
      res.setHeader('location', '/category/latest-news');
      res.statusCode = 301;
      res.end();
    }
    const resData: IResponseData = await GET_ARTICLES(`/api/v1.0/${uri}`, false, true);

    let getTag: any = null;
    if (query?.cid === 'post-next' && !query?.sub) {
      const res = await Promise.all([GET(`/api/v1.0/video/categories/${query.cid}`)]);
      if (!_.isEmpty(res[0])) {
        initProps.dataPostNext.dataSet = _.find(res[0], n => n.topic === 'poster-post-next') || {};
      }
    } else {
      getTag = await GET('/api/v1.0/home/get-tags');
    }

    let resDataTo: any = [];
    // console.log(resData);
    if (resData?.statusCode === 404 || _.isUndefined(resData)) {
      res.setHeader('location', '/category/latest-news');
      res.statusCode = 301;
      res.end();
    }
    if (!_.isEmpty(getTag)) {
      initProps.dataTags = getTag.tags;
    }
    if (!_.isEmpty(resData)) {
      if (_.isEmpty(resData?.data)) {
        resDataTo = resData?.nextTo ? await GET_ARTICLES(`${resData?.nextTo}`, false, true) : { data: [] };
        initProps.articles = (resDataTo?.data as IArticle[]) || [];
      } else {
        initProps.articles = (resData.data as IArticle[]) || [];
      }
      initProps.nextArticles = resData?.nextTo || resData?.links?.next || '';
      initProps.meta = {
        ...resData.meta,
        subCategory: resData?.subCategory || {},
        category: resData?.category || {}
      };
      initProps.nextArticles = resData?.nextTo || resData?.links?.next || '';
      initProps.lastNews = resData.last_news || [];
      initProps.ads = resData?.ads || [];
      initProps.affiliate = resData?.affiliate || [];
    }
    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> CATEGORY_LIST ERROR : `, err.message);
    throw err;
  }
};
