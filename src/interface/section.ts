import { IAds, IResponseSectionBlock, IResponseSectionOne, ITags } from 'interface/service';

export interface ILanguage {
  th?: string;
  en?: string;
}
export interface IMeta {
  heading?: string;
  title?: string;
  abstract?: string;
  description?: string;
  keyword?: string;
  current_page?: number;
  from?: number;
  last_page?: number;
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
  subCategory?: ILanguage;
  category?: ILanguage;
  og_social_image?: string;
}
export interface IMetaData {
  heading?: string;
  title: string;
  description?: string;
}
export interface IStickyBreadcrumbData {
  category: string;
  queryString: string;
}
export interface INextArticles {
  first: string;
  last: string;
  prev: string;
  next: string;
}
export interface ICover {
  id: number;
  title: string;
  url: string;
  startDate: string;
  endDate: string;
  imagePath: string;
  imagePathMobile: string;
  status?: any;
  createAt: string;
  updateAt: string;
  deleteAt?: any;
}
export interface ISectionStatWidgets {
  id: number;
  slug: string;
  label: string;
}
export interface IDataVideo {
  id?: number | null;
  title?: string;
  blurb?: string;
  image?: string;
  link?: string;
  section?: ILanguage;
  detail_1?: string;
  is_video?: boolean;
  video_src?: string | null;
  type_video?: string | null;
  duration?: any;
  pageviews?: number;
  tags?: string[];
  published_at?: string;
}
export interface ILandingPage {
  imagePath?: string;
  imagePathMobile?: string;
}
export interface IArticle {
  data?: string;
  dateDefault?: any;
  gallery?: any;
  id?: number;
  title?: string;
  blurb?: string;
  description?: string;
  image?: string;
  link?: string;
  lastNews?: any;
  section?: ILanguage;
  subCategory?: ILanguage;
  is_video?: boolean;
  video_src?: string | null;
  type_video?: string | null;
  byline?: string;
  pageviews?: number;
  published_at?: string;
  meta?: IMeta;
  updated_at?: string;
  canonical?: string;
  tags?: string[];
  is_show_ads?: boolean;
  cat_id?: number;
  content_I?: string;
  content_II?: string;
  content_III?: string;
  secondAward?: any;
  thirdAward?: any;
  fourAward?: any;
  fifAward?: any;
  firstAward?: any;
  lastTwoNumber?: any;
  frontThreeNumber?: any;
  behindThreeNumber?: any;
}

export type PSection = {
  highlight1?: {
    title: string;
    link: string;
    data: IArticle[] | any;
  };
  highlight2?: {
    title: string;
    link: string;
    data: IArticle[] | any;
  };
  headerLatestNews?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block1?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block2?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block3?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block4?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block5?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block6?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block7?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block8?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block9?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  block10?: {
    title: string;
    link: string;
    data: IArticle[];
  };
  lottery?: any;
  tags?: { data: ITags[] };
  ads?: IAds;
};
export type PSectionLive = {
  block1?: {
    title: string;
    link: string;
    data: IArticle[];
    dataLive?: unknown[];
  };
  block2?: {
    title: string;
    link: string;
    data: IArticle[];
  };
};
export type TSection = {
  sectionCover: ICover[];
  sectionLandingPage?: ILandingPage;
  sectionOne: PSection;
  sectionTwo?: PSection;
  sectionThree?: PSection;
  sectionFour?: PSection;
  sectionFive?: PSection;
  sectionSix?: PSection;
  sectionSeven?: PSection;
  sectionEight?: PSection;
  sectionNine?: PSection;
};
export type TResponseData = [ICover[], IResponseSectionOne, IArticle[], IResponseSectionBlock, any[], ILandingPage, IResponseSectionBlock];
export type TPayload = {
  one: {
    block1: number;
    block2: number;
    block3: number;
    headerLatestNews: number;
  };
  two: {
    block1: number;
    block2: number;
    block3: number;
  };
  three: {
    block1: number;
    block2: number;
    block3: number;
  };
  four: {
    block1: number;
    block2: number;
    block3: number;
  };
  five: {
    block1: number;
    block2: number;
    block3: number;
    block4: number;
    block5: number;
    block6: number;
    block7: number;
    block8: number;
    block9: number;
    block10: number;
  };
};
