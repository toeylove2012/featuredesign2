import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/th';
import _ from 'lodash';
import numeral from 'numeral';
import he from 'he';

dayjs.extend(relativeTime);

const monthNames: string[] = ['มกราคม', 'กุมพาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

export const timestamp = () => {
  return dayjs(Date.now()).format('YYYY-MM-DD HH:MM:ss');
};

export function usePageViews(_pageviews: number): string | number {
  const result = _pageviews > 999 ? numeral(+_pageviews).format('0.0 a') : _pageviews;
  return result;
}

export const convertObjPath = (_obj: any): string => {
  if (!_obj || Object.keys(_obj).length < 1) return '';
  const entries = Object.entries(_obj);
  const itemData = encodeURI(`?${entries.join('&').split(',').join('=')}`);
  return itemData;
};
export const convertArrPathLottery = (_obj: any) => {
  if (!Array.isArray(_obj.lottos) || _obj.lottos?.length === 0) return null;
  const feild = Object.keys(_obj)[0];
  const itemData = `?${feild}[]=${_obj.lottos.join(`&${feild}[]=`)}`;
  return itemData;
};

export const convertArrPath = (_obj: any, field: any): string | null => {
  let result = '';
  if (!_.isArray(_obj)) return null;

  if (_obj?.length > 0) {
    result = `?${field}[]=${_obj.join(`&${field}[]=`)}`;
  } else {
    result = `?${field}=${_obj[0]}`;
  }
  return result;
};

export function rewriteTxt(_txt: string): string {
  if (_txt.indexOf('.') !== -1) return 'news';
  switch (_txt) {
    case 'category':
    case 'rss':
      return 'news';
    case 'column':
      return 'column';
    default:
      return _txt;
  }
}

export function useDateUpdate(_date?: Date | string): string | null {
  if (!_date) return null;
  return dayjs(_date).locale('th').add(543, 'year').format('DD MMM YYYY');
}

export function useDateUpdateDataLayer(_date: Date, _showTime: boolean): string | null {
  if (!_date) return null;
  const _format = _showTime === true ? 'DD MMM YYYY |  HH:mm น.' : 'DD MMM YYYY';
  return dayjs(_date).locale('th').add(543, 'year').format(_format);
}

export const numeralFormat = (countView: number): string | number | null => {
  if (countView === 0) return null;
  return countView > 999 ? numeral(countView).format('0.0a') : countView;
};

export function convertBadge(data: any, format: boolean): string {
  if (format) return `${data?.section?.th}/${data?.subCategory?.th}`;
  return data?.subCategory?.th ? data?.subCategory?.th : data?.section?.th;
}

export const timeAgo = (_date?: Date | string): string | null => {
  if (!_date) return null;
  const dateNow = dayjs(_date).locale('th');
  const diffStr = dateNow.from(new Date());
  return diffStr;
};

export const getWidthDimention = () => {
  const { innerWidth: width } = window;
  return {
    width
  };
};

export const escapeChar = (str: any): string | null => {
  if (!str) return null;
  return `${str}`.replace(/[\\]/g, '').replace(/["]/g, '\\$&');
};

export function useDatePublished(_date?: Date | string): string | null {
  if (!_date) return null;
  const today: Date = new Date(_date);
  const month = monthNames[today.getMonth()];
  const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  // const day = dateNames[today.getDay()];
  const year = today.getFullYear() + 543;
  return `${date} ${month} ${year}`;
}

export const deCodeSpecialChar = (str: any): string | null => {
  if (!str) return null;
  return he.decode(str);
};

export const splitRote = (_route: any) => {
  if (!_route) return '';
  if (_route.route === '/404') return '';
  const stepI = _route.route?.split('/')[1] || _route.url?.split('/')[1] || '';
  const stepII = stepI.split('-');
  const stepIII = stepII[0] === 'themes' ? '/' + stepI : '';

  return stepIII;
};
