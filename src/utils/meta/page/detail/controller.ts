import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

type TControl = {
  instagram?: boolean;
  twitter?: boolean;
  tikTok?: boolean;
};
const webList: TReplaceType<IWebList, TControl> = {
  thansettakij: {
    twitter: true
  },
  springnews: {
    instagram: true,
    twitter: true
  },
  posttoday: {
    instagram: true,
    twitter: true
  },
  bangkokbiznews: {},
  komchadluek: {
    instagram: true
  },
  nationthailand: {
    instagram: true
  },
  thepeople: {},
  nationtv: {
    instagram: true,
    tikTok: true
  },
  tnews: {
    instagram: true,
    tikTok: true
  },
  khobsanam: {},
  thainewsonline: {
    instagram: true
  },
  default: {}
};

type TData = {
  listShowAds?: string[];
};
const webListData: Partial<TReplaceType<IWebList, TData>> = {
  thepeople: {
    listShowAds: ['https://www.googletagservices.com/tag/js/gpt.js']
  },
  thainewsonline: {
    listShowAds: ['//anymind360.com/js/4937/ats.js', '//code.th.giraff.io/data/widget-thainewsonlineco.js', '//get.optad360.io/sf/97b4aa87-a4ca-470b-99d6-148b19cb4f52/plugin.min.js']
  }
};

const controller = webList[WEB_NAME] || {};
const webData = webListData[WEB_NAME] || {};

export { controller, webData };
