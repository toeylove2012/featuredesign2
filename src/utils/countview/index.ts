import Cookies from 'js-cookie';
import _ from 'lodash';
import { CLIENT_GSERVICE_URL } from '../../constants';
import { IArticle } from 'interface/section';
import { convertObjPath, timestamp } from 'utils/helper';
import { fetchWithTimeout } from './fetch-with-timeout';
import { WEB_NAME } from 'constants/index';

// for page detail
export const incrementCountview = async (_article: IArticle): Promise<number> => {
  if (!_article) return 0;
  let increase = 0;
  const _ga = Cookies.get('_ga');
  const _gid = Cookies.get('_gid');
  const params = {
    site: WEB_NAME,
    ga: _ga || '',
    gid: _gid || '',
    newsid: _article.id || ''
  };
  const uri = `${CLIENT_GSERVICE_URL}/cpvs`;
  try {
    // console.log('increment', _increment, _article.id, _article.pageviews);

    const res: any = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    if (_.isEmpty(res)) {
      const resData = await res.json();
      // console.log('pageviews :', resData, Number(resData), Number(_article.pageviews || 0));
      increase = Number(resData) + Number(_article.pageviews || 0);
      // console.log('increase :', increase);
      return increase;
    }
    return Number(0);
  } catch (err) {
    console.warn(`${timestamp()}==========> INCREMENT_COUNTVIEWS ERROR : ${uri}`, err);
    return Number(0);
  }
};

// for card
export const useCountviews = async (_article: IArticle | undefined): Promise<number> => {
  if (!_article) return 0;
  let increase = 0;
  const _ga = Cookies.get('_ga');
  const _gid = Cookies.get('_gid');
  const params = {
    site: WEB_NAME,
    ga: _ga || '',
    gid: _gid || '',
    newsid: _article.id || ''
  };
  const uri = `${CLIENT_GSERVICE_URL}/cpvs`;
  try {
    // console.log('increment', _article.id, _article.pageviews);
    const res = await fetchWithTimeout(`${CLIENT_GSERVICE_URL}/cpvs${convertObjPath(params)}`, {
      timeout: 1000
    });
    const resData = await res.json();
    // console.log('Increment pageviews : ', Number(resData || 0), '+', Number(_article.pageviews || 0), '=', Number(resData || 0) + Number(_article.pageviews || 0));
    increase = Number(resData) + Number(_article.pageviews || 0);

    // console.log('increase :', increase);
    return increase;
  } catch (err) {
    console.warn(`${timestamp()}==========> GET_COUNTVIEWS ERROR : ${uri}`, err);
    return Number(0);
  }
};
