import _ from 'lodash';
import { Session } from 'next-auth';

import { APP_SECRET_KEY, MEMBER_API_URL, WEBSITE } from 'services/member-auth/constants';
import { decryption, encryption } from 'services/member-auth/utils/decryption-token';
import { dateFormatter } from 'services/member-auth/utils/helper';
import { timestamp } from 'utils/helper';
import { TResponseUserSession } from 'services/member-auth/interface/member';

export const generateSignature = async (): Promise<string> => {
  const { createHmac } = await import('crypto');
  const SECRET_KEY = APP_SECRET_KEY;
  const time = Math.round(new Date().getTime() / 1000);
  const hmac = createHmac('sha256', SECRET_KEY).update(`${SECRET_KEY}${time}`).digest('base64');
  const b64 = Buffer.from(hmac).toString('base64');
  const encodeURI = encodeURIComponent(b64);
  return `${time}-${encodeURI}`;
};

export async function validateToken(user: any) {
  try {
    if (_.isEmpty(user)) return null;
    // #1 : GenerateToken timed out in 15 minutes.
    const accessToken = await generateSignature();
    // console.log('#1 AccessToken : ', accessToken);
    // #2 : Encrypts data to get profile data.
    const subscriptionToken = encryption({ email: user?.email });
    // console.log('#2 SubscriptionToken : ', subscriptionToken, decryption({ accessToken: subscriptionToken }));
    // #3 : GET Profile
    const uri = `${MEMBER_API_URL}/api/users/profile`;
    const resProfile = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: `${accessToken}`
      },
      body: JSON.stringify({ subscriptionToken })
    })
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.error(`${timestamp()} ==========> ValidateToken ERROR : ${uri} `, err.message));
    // console.log('#3 GetProfile : ', resProfile);
    if (resProfile?.statusCode === 200) {
      // #4 : Decrypts data for use
      // console.log('#4 Decrypts Profile : ', resProfile?.data?.userProfile);
      const result = decryption(resProfile?.data?.userProfile);
      // console.log('#4 Decrypts Profile : ', result);
      let favoriteTags = [];
      let favoriteCategories = [];
      favoriteTags = (await validateFavorite(result?.favoriteTags, 'tags')) || [];
      favoriteCategories = (await validateFavorite(result?.favoriteCategories, 'categories')) || [];
      return { ...result, favoriteTags, favoriteCategories };
    }
    return null;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> ValidateToken ERROR : `, err.message);
  }
}

export async function validateFavorite(data: any, field: string) {
  try {
    if (_.isEmpty(data)) return null;
    const website = WEBSITE;
    // #5 Search for tags by website.
    // console.log('#5 FavoriteTags :', data);
    const result = data.find((el: any) => el.site === website)?.[field] || [];
    const uniqTag = _.uniq(result);
    // #ุ Find Remove Duplicate Tags
    // console.log('#6 Find Tags', website, ':', uniqTag);
    return uniqTag || [];
  } catch (err: any) {
    console.error(`${timestamp()} ==========> ValidateFavorite ERROR : `, err.message);
  }
}

export const validateSession = async (session: Session | null): Promise<TResponseUserSession | null | undefined> => {
  try {
    if (!_.isEmpty(session?.user)) {
      // console.log('Session :', session);
      const userData = await validateToken(session?.user);
      // console.log('#7 ValidateToken :', userData);
      // const tags = await convertFavorite(userData?.favoriteTags);
      // console.log('#10 Tags :', tags);
      if (!_.isEmpty(userData)) {
        const result = {
          status: _.isEmpty(userData?.favoriteTags),
          user: {
            _id: userData?._id || '',
            name: userData?.name || '',
            firstName: userData?.name ? userData?.name.split(' ')[0] : '',
            lastName: userData?.name ? userData?.name.split(' ')[1] : '',
            email: userData?.email || '',
            image: userData?.image || '',
            gender: userData?.gender || '',
            birthday: userData?.birthday ? dateFormatter(new Date(userData?.birthday)) : dateFormatter(new Date('')),
            phoneNumber: userData?.phoneNumber || '',
            address: userData?.address || '',
            province: userData?.province || null,
            district: userData?.district || null,
            subdistrict: userData?.subDistrict || null,
            favoriteTags: userData?.favoriteTags || [],
            favoriteCategories: userData?.favoriteCategories || []
          }
          // tags: userData?.favoriteTags || [],
          // categories: userData?.favoriteCategories || []
        };
        // console.log('#8 Result :', result);
        return result;
      }
      return null;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(`${timestamp()} ==========> ValidateSession ERROR : `, error.message);
  }
};

// export async function convertFavorite(tags: any) {
//   try {
//     const tagData = await Promise.all([
//       GET(`https://api.komchadluek.net/api/search/tag?name=${tags[0]}`, true, true),
//       GET(`https://api.komchadluek.net/api/search/tag?name=${tags[1]}`, true, true),
//       GET(`https://api.komchadluek.net/api/search/tag?name=${tags[2]}`, true, true)
//     ]);
//     const favorite: any[] = [];
//     tags.forEach((el: any, i: number) => {
//       if (!_.isEmpty(tagData[i + 1]?.data)) {
//         favorite.push({
//           title: el,
//           data: tagData[i + 1]?.data || []
//         });
//       }
//     });
//     console.log('#9 ConvertFavorite :', favorite);
//     return favorite;
//   } catch (err: any) {
//     console.error(`${timestamp()} ==========> ConvertFavorite ERROR : `, err.message);
//   }
// }
