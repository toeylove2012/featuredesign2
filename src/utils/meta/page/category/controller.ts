import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

type TControl = {};
const webList: Partial<TReplaceType<IWebList, TControl>> = {};

type TData = {
  seoTitle?: string;
};
const webListData: Partial<TReplaceType<IWebList, TData>> = {
  posttoday: {
    seoTitle: 'ข่าวที่เกี่ยวข้อง <target> หมวดหมู่ <target>'
  },
  khobsanam: {
    seoTitle: 'ขอบสนาม - <target>'
  }
};

const controller = webList[WEB_NAME] || {};
const webData = webListData[WEB_NAME] || {};

export { controller, webData };
