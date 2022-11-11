import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

type TControl = {
  facebook?: boolean;
  googleOptimize?: boolean;
  iZooTo?: boolean;
  interstitials?: boolean;
};
const webListController: TReplaceType<IWebList, TControl> = {
  thansettakij: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  springnews: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  posttoday: {
    facebook: true
  },
  bangkokbiznews: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  komchadluek: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  nationthailand: { iZooTo: true },
  thepeople: {
    facebook: true
  },
  nationtv: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  tnews: {
    facebook: true,
    googleOptimize: true,
    iZooTo: true
  },
  khobsanam: {
    facebook: true,
    iZooTo: true
  },
  thainewsonline: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  },
  default: {
    facebook: true,
    iZooTo: true,
    interstitials: true
  }
};

const defaultFont: string[] = [
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@200;300;400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600&display=swap'
];
const promptSarabunFont: string = 'https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;600&family=Sarabun:ital,wght@0,100;0,200;0,400;0,600;0,700;1,400&display=swap';
const webListFont: TReplaceType<IWebList, string[]> = {
  thansettakij: [...defaultFont],
  springnews: [...defaultFont],
  posttoday: [...defaultFont],
  bangkokbiznews: [
    promptSarabunFont,
    'https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap'
  ],
  komchadluek: [...defaultFont, 'https://fonts.googleapis.com/css2?family=Anton&display=swap'],
  nationthailand: ['https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap', promptSarabunFont],
  thepeople: [promptSarabunFont],
  nationtv: [...defaultFont],
  tnews: [...defaultFont],
  khobsanam: [...defaultFont],
  thainewsonline: [
    // `/static/fonts/Prompt/Prompt-Regular.ttf`,
    // `/static/fonts/Prompt/Prompt-Medium.ttf`,
    // `/static/fonts/Prompt/Prompt-Light.ttf`,
    // `/static/fonts/Prompt/Prompt-ExtraLight.ttf`,
    // `/static/fonts/Prompt/Prompt-SemiBold.ttf`,
    // `/static/fonts/Sarabun/Sarabun-Light.ttf`,
    // `/static/fonts/Sarabun/Sarabun-SemiBold.ttf`,
    ...defaultFont,
    `https://fonts.googleapis.com/css2?family=Mali:wght@100;200;300;400;600&display=swap`
  ],
  default: [...defaultFont]
};

type TData = {
  interstitialsPath?: string;
};
const webListData: TReplaceType<IWebList, TData> = {
  thansettakij: {
    interstitialsPath: '231599934,21862776100/thansettakij/interstital-ads/interstital-ads'
  },
  springnews: {
    interstitialsPath: '231599934,12270527/springnews/interstital-ads/interstital-ads'
  },
  posttoday: {},
  bangkokbiznews: {
    interstitialsPath: '231599934,4696586/bangkokbiznews/interstital-ads/interstital-ads'
  },
  komchadluek: {
    interstitialsPath: '231599934,11260700/komchadluek/interstital-ads/interstital-ads'
  },
  nationthailand: {},
  thepeople: {},
  nationtv: {
    interstitialsPath: '231599934,4541908/nationtv/interstital-ads/interstital-ads'
  },
  tnews: {},
  khobsanam: {},
  thainewsonline: {
    interstitialsPath: '231599934,108844724/thainewsonline/interstital-ads/interstital-ads'
  },
  default: {}
};

const controller = webListController[WEB_NAME] || {};
const fontUrl = webListFont[WEB_NAME] || [];
const webData = webListData[WEB_NAME] || {};

export { controller, fontUrl, webData };
