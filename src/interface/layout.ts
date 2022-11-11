import { IArticle, ILanguage } from 'interface/section';

interface INavDataSub {
  id: number;
  nameTh: string;
  nameEng: string;
  link: string;
  data: INavDataSubData[];
}
interface INavDataSubData {
  id: number;
  title: string;
  blurb?: string;
  image: string;
  link: string;
  section?: ILanguage;
  subCategory?: ILanguage;
  is_video: boolean;
  video_src?: string | null;
  type_video?: string | null;
  byline?: any;
  pageviews: number;
  published_at: string;
}

export interface IMenu {
  id: number;
  nameTh: string;
  nameEng: string;
  link: string;
  sub: ISubMenu[];
}
export interface IPartner {
  name: string;
  nameEng: string;
  link: string;
}
export interface ISubMenu {
  id: number;
  nameTh: string;
  nameEng: string;
  link: string;
  data: IArticle[];
}
export interface IExpandToggle {
  status: boolean;
  key: number | null;
}
export interface INavData {
  id: number;
  nameTh: string;
  nameEng: string;
  link: string;
  sub: INavDataSub[];
}
