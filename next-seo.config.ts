import { IS_NO_ROBOT_INDEX } from 'constants/index';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_TITLE, WEB_URL } from 'constants/layout';
import { WEB_NAME } from 'constants/index';

const SEO: any = {
  noindex: IS_NO_ROBOT_INDEX,
  nofollow: IS_NO_ROBOT_INDEX,
  title: WEB_TITLE,
  description: WEB_DESC,
  openGraph: {
    type: 'website',
    locale: 'th',
    url: WEB_URL.WEB,
    title: WEB_TITLE,
    description: WEB_DESC,
    ['site_name']: WEB_NAME,
    images: [
      {
        url: IMAGE_DEFAULT,
        width: '1920',
        height: '1080',
        alt: WEB_NAME
      }
    ]
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: WEB_KEYWORD
    }
  ]
};

export default SEO;
