import { IArticle, ILanguage, IMeta, TPayload, TSection } from 'interface/section';
import _ from 'lodash';
import { Session } from 'next-auth';
import { convertObjPath, rewriteTxt, timestamp } from 'utils/helper';
import { GET, GET_ARTICLES } from 'services';
import { getMember } from './member-auth/member.auth.service';
import { IAds, IAdsNative, IAffiliate, ILastNews, IMetaTag, INavBar, IRelated } from 'interface/service';
import { APP_URL, CONTENT_DEFAULT } from 'constants/index';
import { COUNTVIEW_SHOW_COUNT } from 'constants/index';
import { TSectionMember } from './member-auth/interface/member';

// type TInitProps = TSection & {
//   statusCode: number;
//   errMessage: string | null;
//   metaTags: Partial<IMetaTag>;
//   ads: IAds[];
// };
export type TInitPropsIndexPage = {
  statusCode: number;
  errMessage: string | null;
  sectionOne: any;
  sectionTwo: any;
  sectionThree: any;
  sectionFour: any;
  sectionFive: any;
  sectionSix: any;
  covers: any[];
  dataLandingPage: any[];
  dataPopular: any[];
  event0: any;
  acticlesresDataPin: any;
  acticlesresDataPinOne: any;
  dataSetPinEmbed: any;
  dataSetPinEmbedOne: any;
  navBar: INavBar[];
  ads: IAds[];
  sessionSevId: Session | null;
  sectionMember: TSectionMember | null;
  dataSet: any;
};
export const initPropsPageIndex: TInitPropsIndexPage = {
  statusCode: 200,
  errMessage: null,
  sectionOne: {},
  sectionTwo: {},
  sectionThree: {},
  sectionFour: {},
  sectionFive: {},
  sectionSix: {},
  covers: [],
  dataLandingPage: [],
  dataPopular: [],
  event0: null,
  acticlesresDataPin: null,
  acticlesresDataPinOne: null,
  dataSetPinEmbed: null,
  dataSetPinEmbedOne: null,
  navBar: [],
  ads: [],
  sessionSevId: null,
  sectionMember: null,
  dataSet: null
};
export const getIndexPage = async ({ req }: any): Promise<TInitPropsIndexPage> => {
  const initProps: TInitPropsIndexPage = _.cloneDeep(initPropsPageIndex);
  // const initProps: TInitProps = {
  //   statusCode: 200,
  //   errMessage: null,
  //   sectionCover: [],
  //   sectionLandingPage: {},
  //   sectionOne: {},
  //   sectionTwo: {},
  //   sectionThree: {},
  //   sectionFour: {},
  //   sectionFive: {},
  //   sectionSix: {},
  //   metaTags: {},
  //   ads: []
  // };

  const payload: TPayload = {
    one: {
      block1: 6,
      block2: 6,
      block3: 6,
      headerLatestNews: 6
    },
    two: {
      block1: 6,
      block2: 6,
      block3: 3
    },
    three: {
      block1: 3,
      block2: 3,
      block3: 3
    },
    four: {
      block1: 3,
      block2: 3,
      block3: 3
    },
    five: {
      block1: 3,
      block2: 3,
      block3: 3,
      block4: 3,
      block5: 3,
      block6: 3,
      block7: 3,
      block8: 3,
      block9: 3,
      block10: 3
    }
  };

  try {
    // const { sectionMember, session } = await getMemberArticle({ req });
    // initProps.sectionMember = sectionMember;
    // initProps.sessionSevId = session;

    const fetchImagesCover = await GET('/api/v1.0/imagecover');
    const fetchSectionOne = await GET(`/api/v1.0/home/section-one${convertObjPath(payload.one)}`);
    const fetchSectionTwo = await GET(`/api/v1.0/home/section-two${convertObjPath(payload.two)}`);
    const fetchSectionThree = await GET(`/api/v1.0/home/section-three${convertObjPath(payload.three)}`);
    const fetchSectionFour = await GET(`/api/v1.0/home/section-four${convertObjPath(payload.four)}`);
    const fetchSectionFive = await GET(`/api/v1.0/home/section-five${convertObjPath(payload.five)}`);
    const fetchDataSet = await GET('/api/datasets');
    const fetchPopularNews = await GET('/api/v1.0/categories/popular-news');
    const fetchLandingPage = await GET('/api/landing-page');
    const fetchMenuNav = await GET('/api/v1.0/navigations/menu-nav');
    if (!_.isEmpty(fetchSectionOne)) {
      initProps.sectionOne = {
        highlight1: {
          title: 'highlight-1',
          link: '',
          data: fetchSectionOne?.newHighlight || []
        },
        highlight2: {
          title: 'highlight-2',
          link: '',
          data: fetchSectionOne?.newHighlight2 || []
        },
        headerLatestNews: {
          title: 'ข่าวล่าสุด',
          link: '',
          data: fetchSectionOne.headerLatestNews || []
        },
        block1: {
          title: fetchSectionOne.block1?.title,
          link: fetchSectionOne.block1?.link || '',
          data: fetchSectionOne.block1?.data || []
        },
        block2: {
          title: fetchSectionOne.block2?.title,
          link: fetchSectionOne.block2?.link || '',
          data: fetchSectionOne.block2?.data || []
        },
        block3: {
          title: fetchSectionOne.block3?.title,
          link: fetchSectionOne.block3?.link || '',
          data: fetchSectionOne.block3?.data || []
        }
      };
      initProps.ads = fetchSectionOne?.ads;
    }
    if (!_.isEmpty(fetchSectionTwo)) {
      initProps.sectionTwo = {
        block1: {
          title: fetchSectionTwo.block1?.title,
          link: fetchSectionTwo.block1?.link || '',
          data: fetchSectionTwo.block1?.data || []
        },
        block2: {
          title: fetchSectionTwo.block2?.title,
          link: fetchSectionTwo.block2?.link || '',
          data: fetchSectionTwo.block2?.data || []
        },
        block3: {
          title: fetchSectionTwo.block3?.title,
          link: fetchSectionTwo.block3?.link || '',
          data: fetchSectionTwo.block3?.data || []
        },
        tags: {
          data: fetchSectionOne?.tags || []
        }
      };
    }
    if (!_.isEmpty(fetchSectionThree)) {
      initProps.sectionThree = {
        block1: {
          title: fetchSectionThree.block1?.title,
          link: fetchSectionThree.block1?.link || '',
          data: fetchSectionThree.block1?.data || []
        },
        block2: {
          title: fetchSectionThree.block2?.title,
          link: fetchSectionThree.block2?.link || '',
          data: fetchSectionThree.block2?.data || []
        },
        block3: {
          title: fetchSectionThree.block3?.title,
          link: fetchSectionThree.block3?.link || '',
          data: fetchSectionThree.block3?.data || []
        }
      };
    }
    if (!_.isEmpty(fetchSectionFour)) {
      initProps.sectionFour = {
        block1: {
          title: fetchSectionFour.block1?.title,
          link: fetchSectionFour.block1?.link || '',
          data: fetchSectionFour.block1?.data || []
        },
        block2: {
          title: fetchSectionFour.block2?.title,
          link: fetchSectionFour.block2?.link || '',
          data: fetchSectionFour.block2?.data || []
        },
        block3: {
          title: fetchSectionFour.block3?.title,
          link: fetchSectionFour.block3?.link || '',
          data: fetchSectionFour.block3?.data || []
        }
      };
    }
    if (!_.isEmpty(fetchSectionFive)) {
      initProps.sectionFive = {
        block1: {
          title: fetchSectionFive.block1?.title,
          link: fetchSectionFive.block1?.link || '',
          data: fetchSectionFive.block1?.data || []
        },
        block2: {
          title: fetchSectionFive.block2?.title,
          link: fetchSectionFive.block2?.link || '',
          data: fetchSectionFive.block2?.data || []
        },
        block3: {
          title: fetchSectionFive.block3?.title,
          link: fetchSectionFive.block3?.link || '',
          data: fetchSectionFive.block3?.data || []
        },
        block4: {
          title: fetchSectionFive.block4?.title,
          link: fetchSectionFive.block4?.link || '',
          data: fetchSectionFive.block4?.data || []
        },
        block5: {
          title: fetchSectionFive.block5?.title,
          link: fetchSectionFive.block5?.link || '',
          data: fetchSectionFive.block5?.data || []
        },
        block6: {
          title: fetchSectionFive.block6?.title,
          link: fetchSectionFive.block6?.link || '',
          data: fetchSectionFive.block6?.data || []
        },
        block7: {
          title: fetchSectionFive.block7?.title,
          link: fetchSectionFive.block7?.link || '',
          data: fetchSectionFive.block7?.data || []
        },
        block8: {
          title: fetchSectionFive.block8?.title,
          link: fetchSectionFive.block8?.link || '',
          data: fetchSectionFive.block8?.data || []
        },
        block9: {
          title: fetchSectionFive.block9?.title,
          link: fetchSectionFive.block9?.link || '',
          data: fetchSectionFive.block9?.data || []
        },
        block10: {
          title: fetchSectionFive.block10?.title,
          link: fetchSectionFive.block10?.link || '',
          data: fetchSectionFive.block10?.data || []
        },
        lottery: {
          data: fetchSectionFour.lottory || []
        }
      };
    }
    return initProps;
  } catch (err: any) {
    console.error(`${timestamp()} ==========> PAGE_INDEX ERROR : `, err.message);
    throw err;
  }
};
