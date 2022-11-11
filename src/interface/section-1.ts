
export interface MetaTag {
  title: string;
  keywords: string;
  description: string;
}

export interface Section {
  th: string;
  en: string;
}

export interface SubCategory {
  th: string;
  en: string;
}

export interface NewHighlight {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section;
  subCategory: SubCategory;
  is_video: boolean;
  video_src?: any;
  byline?: any;
  pageviews: number;
  published_at: Date;
}

export interface Section2 {
  th: string;
  en: string;
}

export interface SubCategory2 {
  th: string;
  en: string;
}

export interface NewHighlight2 {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section2;
  subCategory: SubCategory2;
  is_video: boolean;
  video_src?: any;
  byline?: any;
  pageviews: number;
  published_at: Date;
}

export interface Section3 {
  th: string;
  en: string;
}

export interface SubCategory3 {
  th: string;
  en: string;
}

export interface HeaderLatestNew {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section3;
  subCategory: SubCategory3;
  is_video: boolean;
  video_src?: any;
  byline: string;
  pageviews: number;
  published_at: Date;
}

export interface Section4 {
  th: string;
  en: string;
}

export interface SubCategory4 {
  th: string;
  en: string;
}

export interface Datum {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section4;
  subCategory: SubCategory4;
  is_video: boolean;
  video_src?: any;
  byline?: any;
  pageviews: number;
  published_at: Date;
}

export interface Block1 {
  title: string;
  link: string;
  data: Datum[];
}

export interface Section5 {
  th: string;
  en: string;
}

export interface SubCategory5 {
  th: string;
  en: string;
}

export interface Datum2 {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section5;
  subCategory: SubCategory5;
  is_video: boolean;
  video_src?: any;
  byline: string;
  pageviews: number;
  published_at: Date;
}

export interface Block2 {
  title: string;
  link: string;
  data: Datum2[];
}

export interface Section6 {
  th: string;
  en: string;
}

export interface SubCategory6 {
  th: string;
  en: string;
}

export interface Datum3 {
  id: number;
  title: string;
  blurb: string;
  image: string;
  link: string;
  section: Section6;
  subCategory: SubCategory6;
  is_video: boolean;
  video_src?: any;
  byline?: any;
  pageviews: number;
  published_at: Date;
}

export interface Block3 {
  title: string;
  link: string;
  data: Datum3[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Data {
  metaTag: MetaTag;
  newHighlight: NewHighlight[];
  newHighlight2: NewHighlight2[];
  newHighlight3: any[];
  headerLatestNews: HeaderLatestNew[];
  block1: Block1;
  block2: Block2;
  block3: Block3;
  tags: Tag[];
}
