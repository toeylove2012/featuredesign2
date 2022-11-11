import { IArticle, IMeta } from 'interface/section';
import { IAds, IValidateFailed } from 'interface/service';
import _ from 'lodash';
// import { Session } from 'next-auth';
import { GET } from 'services';
import { timestamp } from 'utils/helper';
// import { getMember } from './member-auth/member.auth.service';

type TInitProps = {
  statusCode: number;
  errMessage: string | null;
  articles: any[];
  lastNews: IArticle[];
  meta: Partial<IMeta>;
  ads: IAds[];
};

function convertPaths(uri: string, arr: string[]) {
  let paths = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      paths.push(GET(`${uri}${arr[i]}`));
    }
  }
  return paths;
}

function mapSectionVideo(data) {
  let objects = [];
  for (let i = 0; i < data.length; i++) {
    if (Object.values(data[i])) {
      for (let n = 0; n < Object.values(data[i]).length; n++) {
        if (!_.isEmpty(Object.values(data[i])[n]?.data)) {
          objects.push(Object.values(data[i])[n]);
        }
      }
    }
  }
  return objects.flat();
}
export const getVideoPage = async ({ res, query }: any): Promise<IValidateFailed | TInitProps> => {
  const initProps: TInitProps = {
    statusCode: 200,
    errMessage: null,
    articles: [],
    lastNews: [],
    meta: {},
    ads: []
  };

  try {
    console.time('VIDEO');
    const paths = convertPaths('/api/v1.0/video/', ['section-one', 'section-two', 'section-three', 'section-four', 'section-five', 'section-six']);
    const resData = await Promise.all(paths);

    const section = mapSectionVideo(resData);
    console.log('VIDEO', section);
    if (!_.isEmpty(resData[0])) {
      initProps.meta = resData[0].metaTag;
      initProps.lastNews = resData[0].headerLatestNews;
      initProps.ads = resData[0].ads;

      initProps.articles = section;
    }
    console.timeEnd('VIDEO');
    // time: 6s
    return {
      props: initProps
    };
  } catch (err: any) {
    console.error(`${timestamp()} ==========> VIDEO_LIST ERROR : `, err?.message);
    initProps.errMessage = err.message || null;
    initProps.statusCode = err.response?.status || 500;
  }
};
