import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

type TControl = {
  flipNewspaper?: boolean;
};
const webListController: Partial<TReplaceType<IWebList, TControl>> = {
  thainewsonline: {
    flipNewspaper: true
  }
};

type TData = {};
const webListData: Partial<TReplaceType<IWebList, TData>> = {};

const controller = webListController[WEB_NAME] || {};
const webData = webListData[WEB_NAME] || {};

export { controller, webData };
