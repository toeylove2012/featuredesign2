import { IArticle } from 'interface/section';
import { IAds, IAdsNative, IAffiliate, ILastNews, IRelated, IResponseData, ISolrRelated, IValidateFailed } from 'interface/service';
import _ from 'lodash';
import { GET_ARTICLES } from 'services';
import { convertObjPath, timestamp } from 'utils/helper';

type TInitProps = {
  statusCode: number;
  errMessage: string | null;
  article: IArticle;
  related: IRelated[];
  last_news: ILastNews[];
  solrRelated: ISolrRelated[];
  affiliate: IAffiliate[];
  adsNative: IAdsNative | null;
  ads: IAds[];
};
export const getDetailPage = async ({ req, params, query }: any): Promise<IValidateFailed | TInitProps> => {
  const initProps: TInitProps = {
    statusCode: 200,
    errMessage: null,
    article: {},
    related: [],
    last_news: [],
    solrRelated: [],
    affiliate: [],
    adsNative: null,
    ads: []
  };

  const { expires, signature } = query;

  const _type: string = `/${query.type || ''}`;
  let preview: string = '';
  let previewParams = {};
  if (expires && signature) {
    preview = '/preview';
    previewParams = {
      expires,
      signature
    };
  }

  const url: string = req.url;
  let uri = `contents/${params.id}`;
  if (url.startsWith('/advertorials')) {
    uri = `contents/${params.id}${_type}`;
  } else if (url.startsWith('/pr-news')) {
    uri = `contents/${params.id}${query?.type === 'pr-news' ? _type : ''}`;
  } else if (url.startsWith('/blogs')) {
    uri = `contents/${params.id}${_type}`;
  }

  try {
    // console.log(query, `/api/v1.0/${uri}${preview}${convertObjPath({ ...previewParams })}`, params.id, _type);
    const resData: IResponseData = await GET_ARTICLES(`/api/v1.0/${uri}${preview}${convertObjPath({ ...previewParams })}`, false, true);
    if (resData?.statusCode === 404 || _.isUndefined(resData)) {
      return {
        notFound: true
      };
    }

    if (!_.isEmpty(resData?.data)) {
      initProps.article = (resData?.data as IArticle) || [];
      initProps.related = resData?.related ? resData?.related.slice(0, 5) : [];
      initProps.last_news = resData?.last_news ? resData?.last_news.slice(0, 5) : [];
      initProps.solrRelated = resData?.solrRelated ? resData?.solrRelated.slice(0, 5) : [];
      initProps.affiliate = resData?.affiliate || [];
      initProps.ads = resData?.ads || [];
      initProps.adsNative = resData?.adsNative || null;
    }

    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> ARTICLE_DETAIL ERROR : `, err.message);
    throw err;
  }
};
