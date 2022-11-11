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
  seoDescription: 'ค้นหาข่าวเกี่ยวกับ <target> เกาะติดข่าวของ <target> วันนี้ ข่าวด่วน <target> ที่คุณสนใจ ติดตามเรื่อง <target>'
};
const webListData: TReplaceType<IWebList, TData> = {
  thansettakij: {
    seoTitle: 'ผลการค้นหา <target> ล่าสุด',
    seoDescription: 'ค้นหาข่าวเกี่ยวกับ <target> อัพเดทล่าสุด ติดตามข่าว <target> วันนี้ ข่าวด่วน <target> ทุกประเด็นร้อน ฐานเศรษฐกิจ สำนักข่าวออนไลน์ รายงานทุกข่าวด่วน ถ่ายทอดสด ทุกเหตุการณ์'
  },
  springnews: { ...defaultSeo },
  posttoday: {
    seoTitle: 'ผลการค้นหา <target> ล่าสุด ติดตามข่าว <target>',
    seoDescription: 'ค้นหาข่าวเกี่ยวกับ <target> ล่าสุด ติดตามข่าว <target> ข่าวด่วน <target> เรื่องราวเกี่ยวกับ <target> ข่าวที่เกี่ยวข้อง <target> - โพสต์ทูเดย์'
  },
  bangkokbiznews: { ...defaultSeo },
  komchadluek: {
    seoTitle: 'ผลการค้นหา <target> ทั้งหมด',
    seoDescription: 'ค้นหาข่าวเกี่ยวกับ <target> เกาะติดข่าวของ <target> วันนี้ ข่าวด่วน <target> ที่คุณสนใจ ติดตามเรื่อง <target>'
  },
  nationthailand: {
    seoTitle: '<target> all news related to <target>',
    seoDescription: 'Search result related <target> In Focus <target> BreakingNews of <target> Your Interested Follow Story <target>'
  },
  thepeople: { ...defaultSeo },
  nationtv: { ...defaultSeo },
  tnews: { ...defaultSeo },
  khobsanam: { ...defaultSeo },
  thainewsonline: {
    seoTitle: '<target> รวมข่าวที่เกี่ยวกับ <target>',
    seoDescription: 'ค้นหาข่าวเกี่ยวกับ <target> อัพเดทล่าสุด ติดตามข่าว <target> วันนี้ ข่าวด่วน <target> ที่คุณสนใจ'
  },
  default: { ...defaultSeo }
};

const controller = webList[WEB_NAME] || {};
const webData = webListData[WEB_NAME] || {};

export { controller, webData };
