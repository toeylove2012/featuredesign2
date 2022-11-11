import { IArticle, IMeta } from 'interface/section';
import { IAds, IAffiliate, IResponseData, IValidateFailed } from 'interface/service';
import _ from 'lodash';
import { GET, GET_ARTICLES } from 'services';
import { timestamp } from 'utils/helper';

type TInitProps = {
  statusCode: number;
  errMessage: string | null;
  articles: IArticle[];
  dataTags: any;
  lastNews: IArticle[];
  affiliate: IAffiliate[];
  meta: Partial<IMeta>;
  nextArticles: string;
  ads: IAds[];
};
export const getLotteryCategoryPage = async ({ res }: any): Promise<IValidateFailed | TInitProps> => {
  const initProps: TInitProps = {
    statusCode: 200,
    errMessage: null,
    articles: [],
    dataTags: [],
    lastNews: [],
    affiliate: [],
    meta: {},
    nextArticles: '',
    ads: []
  };
  let uri: string = `/api/v1.0/lottory`;

  try {
    const resData: IResponseData = await GET_ARTICLES(`${uri}`, false, true);
    const getTag = await GET('/api/v1.0/home/get-tags');
    let resDataTo: any = [];
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
      initProps.lastNews = resData?.lastNews || [];
      initProps.ads = resData?.ads || [];
      initProps.affiliate = resData?.affiliate || [];
    }

    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> LOTTERY_LIST ERROR : `, err.message);
    initProps.errMessage = err.message;
    initProps.statusCode = err.response?.status || 500;
  }
};
