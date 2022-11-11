import { IArticle, ILanguage, IMeta, INextArticles, PSection } from 'interface/section';

export interface ITags {
  id: number;
  name: string;
}
export interface ILastNews {
  id: number;
  title: string;
  blurb?: string;
  image: string;
  link: string;
  byline?: any;
  pageviews?: number;
  published_at: string;
}
export interface ISolrRelated {
  unitName: string;
  id: number;
  link: string;
  title: string;
  image: string;
  published_at: string;
}
export interface IAffiliate {
  id: number;
  title: string;
  link: string;
  bgColor: string;
  textColor: string;
  position: number;
  image: string;
}
export interface IRelated {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  byline?: any;
  pageviews?: number;
  published_at: string;
}
export interface IAds {
  id?: number;
  section?: string;
  position?: string;
  slotId?: string;
  sizeMobile?: number[][];
  sizeDesktop?: number[][];
  slotDefine?: string;
  className?: string;
  slotSize?: number[][];
}
export interface IMetaTag {
  title: string;
  keywords: string;
  description: string;
}
export interface IAdsNative {
  cat_id?: string;
  group_id?: string;
  name?: string | null;
  header?: string | null;
  body?: string | null;
  mobile_header?: string | null;
  mobile_body?: string | null;
}
export interface IResponseSectionBlock {
  block1?: PSection['block1'];
  block2?: PSection['block2'];
  block3?: PSection['block2'];
}
export interface IResponseSectionOne extends IResponseSectionBlock {
  metaTag?: IMetaTag;
  newHighlight: IArticle[];
  newHighlight2: any[];
  newHighlight3: any[];
  headerLatestNews: IArticle[];
  tags: ITags[];
  ads: IAds[];
}
export interface IResponseData {
  msg?: string;
  statusCode?: number;
  data?: IArticle | IArticle[];
  category?: ILanguage;
  subCategory?: ILanguage;
  SubCategory?: ILanguage;
  related?: IRelated[];
  solrRelated?: ISolrRelated[];
  meta?: IMeta;
  last_news: ILastNews[];
  affiliate: any[];
  ads: IAds[];
  adsNative: IAdsNative;
  nextTo?: string;
  links?: INextArticles;
}

interface INavBarSubData {
  blurb?: any;
  byline?: any;
  bylineList?: any[];
  id?: number;
  image?: number;
  is_video?: boolean;
  link?: string;
  pageviews?: number;
  published_at: any;
  section?: ILanguage;
  subCategory?: ILanguage;
  title?: string;
  type_video?: any;
  video_src?: any;
}
interface INavBarSub {
  data?: INavBarSubData[];
  id: number;
  link?: string;
  nameEng?: string;
  nameTh?: string;
}
export interface INavBar {
  abstract?: any;
  id?: number;
  image?: any;
  link?: string;
  nameEng?: string;
  nameTh?: string;
  sub?: INavBarSub[];
}

export interface IValidateFailed {
  redirect?: {
    destination: string;
    permanent: boolean;
  };
  notFound?: boolean;
}
