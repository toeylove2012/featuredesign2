import _ from 'lodash';
import Cookies from 'js-cookie';
import sanitizeHtml from 'sanitize-html';
import { timestamp } from 'utils/helper';
import { WEBSITE } from 'services/member-auth/constants';
import { decryptionClient, encryptionClient } from 'services/member-auth/utils/decryption-payload';
import { TChild, TSateSelected } from 'redux/reducers/member';
import { TUser } from 'services/member-auth/interface/member';

type TPayload = {
  _ga: string;
  _gid: string;
  _id: string;
  _nid: string;
  email: string;
  favoriteTags: TFavoriteTags;
  favoriteCategories: TFavoriteCategories;
};

type TFavoriteTags = {
  site: string;
  tags: TChild[];
};

type TFavoriteCategories = {
  site: string;
  categories: TChild[];
};

export async function sendSubscribe(user: TUser, selected: TSateSelected) {
  try {
    const ga = Cookies.get('_ga');
    const gid = Cookies.get('_gid');
    const nid = Cookies.get('_nid');
    // console.log('sendSubscribe #1 :', user, selected);

    const payload: TPayload = {
      _ga: ga || '',
      _gid: gid || '',
      _nid: nid || '',
      _id: sanitizeHtml(user?._id || ''),
      email: sanitizeHtml(user?.email || ''),
      favoriteTags: {
        site: WEBSITE,
        tags: selected.tags
      },
      favoriteCategories: {
        site: WEBSITE,
        categories: selected.categories
      }
    };
    const response: Response = await fetch('/api/member/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: encryptionClient(payload) })
    });
    const data = await response.json();
    const _data = decryptionClient(data?.data);
    // console.log('===========> #####', data, _data?.user);

    // console.log('sendSubscribe #3 :', favoriteTags, favoriteCategories);
    if (!_.isEmpty(data?.data)) {
      return { favoriteTags: _data?.user?.favoriteTags || [], favoriteCategories: _data?.user?.favoriteCategories };
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(`${timestamp()} ==========>  handleSubmit ERROR : `, error.message);
  }
}
