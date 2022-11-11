import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

type TControl = {};
const webList: Partial<TReplaceType<IWebList, TControl>> = {};

type TData = {
  seoTitle: string;
  seoDescription: string;
};
const defaultSeo: TData = {
  seoTitle: '<target> รวมข่าวที่เกี่ยวกับ <target>',
  seoDescription: 'รวมข่าว <target> เกาะติดข่าวของ <target> ข่าวด่วนของ <target> ที่คุณสนใจ ติดตามเรื่อง <target>'
};
const webListData: TReplaceType<IWebList, TData> = {
  thansettakij: {
    seoTitle: '<target> ข่าว<target> เกาะติดข่าว<target> ข่าวเด่น <target>',
    seoDescription: '<target> รวมข่าว <target> เกาะติดข่าว <target> ข่าวเด่นของ <target> ติดตาม <target> เรื่องราวเกี่ยวกับ <target> โดย ฐานเศรษฐกิจ'
  },
  springnews: { ...defaultSeo },
  posttoday: {
    seoTitle: 'โพสต์ทูเดย์ รวมข่าว <target> เกาะติดข่าว <target> - โพสต์ทูเดย์',
    seoDescription: 'โพสต์ทูเดย์ รวมข่าว <target> เกาะติดข่าว <target> ข่าวด่วน <target> ติดตามข่าว <target> เรื่องราวเกี่ยวกับ <target> - โพสต์ทูเดย์'
  },
  bangkokbiznews: { ...defaultSeo },
  komchadluek: { ...defaultSeo },
  nationthailand: {
    seoTitle: '<target> all news related to <target>',
    seoDescription: 'All News <target> In Focus <target> BreakingNews of <target> Your Interested Follow Story <target>'
  },
  thepeople: { ...defaultSeo },
  nationtv: { ...defaultSeo },
  tnews: { ...defaultSeo },
  khobsanam: { ...defaultSeo },
  thainewsonline: { ...defaultSeo },
  default: { ...defaultSeo }
};

const controller = webList[WEB_NAME] || {};
const webData = webListData[WEB_NAME] || {};

export { controller, webData };
