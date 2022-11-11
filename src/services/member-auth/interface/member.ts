import { TChild } from 'redux/reducers/member';
import { IArticle } from 'interface/section';

export type TSession = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: Date;
};

export type TFavoriteTypes = 'tags' | 'categories';
export type TFollowTypes = 'ติดตาม' | 'กำลังติดตาม';
export type TResponseUserSession = {
  status: boolean;
  user: TUser | null;
};

export type TUser = {
  name: string | null;
  email: string | null;
  image: string | null;
  _id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  birthday?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  province?: TAddress | null;
  district?: string | null;
  subdistrict?: string | null;
  favoriteTags?: TChild[];
  favoriteCategories?: TChild[];
};

export type TAddress = {
  id: string | number;
  name: string;
};

export type TSubCategories = {
  id: number;
  nameTh: string;
  nameEng: string;
  link: string | null;
  data: IArticle[];
};

export type TCategories = {
  id: number;
  nameTh: string;
  nameEng: string;
  abstract: string | null;
  image: string | null;
  link: string | null;
  sub: TSubCategories[];
};

export type TFavoriteData = {
  tags: TFavoriteParent[];
  categories: TCategories[];
};

export type TFavoriteParent = {
  title: string;
  data: TFavoriteChild[];
  section_id?: number | undefined;
};

export type TFavoriteChild = {
  id: number;
  nameTh: string;
  nameEng: string;
  image: string | null;
};

export type TSectionMember = {
  user: TUser | null;
  menu: TCategories[];
  tags: TFavoriteChild[];
  articlesTags: IArticle[];
  articlesCategories: IArticle[];
};
