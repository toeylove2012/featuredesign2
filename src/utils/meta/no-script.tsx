import { GTM_ID } from 'constants/index';
import { NextPage } from 'next';

const NoScript: NextPage = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=${GTM_ID}'
        height='0' width='0'
        style='display:none;visibility:hidden'></iframe>`
    }}
  />
);

export default NoScript;
