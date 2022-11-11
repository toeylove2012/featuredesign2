import { IArticle } from 'interface/section';
import _ from 'lodash';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { GET } from 'services';
import { TCategories, TFavoriteParent, TResponseUserSession, TSectionMember } from 'services/member-auth/interface/member';
import { validateSession } from 'services/member-auth/utils/validateSession';
import { convertFavorite } from 'services/member-auth/utils/helper';
import { convertArrPath } from 'utils/helper';

type TResponseFavorites = {
  data: TFavoriteParent[];
};

export const getMemberArticle = async ({ req }: any) => {
  try {
    let sectionMember: TSectionMember = {
      user: null,
      menu: [],
      tags: [],
      articlesTags: [],
      articlesCategories: []
    };
    const session: Session | null = await getSession({ req });

    if (!_.isEmpty(session?.user)) {
      const userSession: TResponseUserSession | null | undefined = await validateSession(session);
      if (!_.isEmpty(userSession)) {
        const { user } = userSession;
        let responseTags: IArticle[] = [];
        let responseCategories: IArticle[] = [];
        // MENU
        const responseMenu: TCategories[] = await GET('/api/v1.0/navigations/menu-nav', false, false);
        // TAGS
        const responseFavorite: TResponseFavorites = await GET(`/api/v1.0/favorite-tags`, false, true);

        // TAGS ARTICLE
        if (!_.isEmpty(user?.favoriteTags)) {
          const _tags = convertFavorite(user?.favoriteTags || [], 'nameTh') || [];
          const uriTags = `/api/search/tag${convertArrPath(_tags, 'name')}&limit=10`;
          const res = await GET(uriTags, false, true);
          if (!_.isEmpty(res?.data)) {
            responseTags = res?.data || [];
          }
        }

        // CATEGORIES ARTICLE
        if (!_.isEmpty(user?.favoriteCategories)) {
          const _categories = convertFavorite(user?.favoriteCategories || [], 'nameEng') || [];
          const uriCategories = `/api/v1.0/categories/mapping/categories${convertArrPath(_categories, 'name')}&limit=10`;
          const res = await GET(uriCategories, false, true);
          if (!_.isEmpty(res?.data)) {
            responseCategories = res?.data || [];
          }
        }
        // console.log('====>', responseFavorite?.data[0]?.data);
        // console.log('ValidateSession :', userSession, responseTags, responseCategories);
        sectionMember = {
          user: user || null,
          menu: responseMenu || [],
          tags: !_.isEmpty(responseFavorite?.data[0]) ? responseFavorite?.data[0]?.data : [],
          articlesTags: responseTags || [],
          articlesCategories: responseCategories || []
        };
      }
    }
    if (_.isEmpty(session?.user)) {
      console.log('======> Session Not found');
    }
    return {
      sectionMember,
      session
    };
  } catch (e) {
    throw e;
  }
};

export const getMember = async ({ req }: any) => {
  const session: Session | null = await getSession({ req });
  if (_.isEmpty(session?.user)) {
    console.log('======> Session Not found');
  }
  return session;
};
