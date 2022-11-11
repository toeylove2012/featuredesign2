import { GTM_ID } from 'constants/index';
import { NextPage } from 'next';
import _ from 'lodash';
import { splitRote, useDateUpdateDataLayer } from 'utils/helper';

type Props = {
  data?: any;
  page?: string;
};
type TResultDataLayer = {
  event?: string;
  article_category?: string;
  article_sub_category?: string;
  article_publication_date?: string | null;
};
const sendDataLayerPage = ({ page, data }: Props): TResultDataLayer[] => {
  const themePage = splitRote({ route: page });
  const _result: TResultDataLayer[] = [];
  switch (page) {
    case `${themePage || '/'}`:
      return _result.concat({
        event: 'page_metadata',
        article_category: 'index'
      });
    case `${themePage}/[cid]`:
      if (data?.subCategory?.th) {
        return _result.concat({
          event: 'page_metadata',
          article_category: data?.category?.th || '',
          article_sub_category: data?.subCategory?.th || ''
        });
      }
      return _result.concat({
        event: 'page_metadata',
        article_category: data?.category?.th
      });
    case `${themePage}/[cid]/[id]`:
      if (data?.article?.subCategory?.th) {
        return _result.concat({
          event: 'page_metadata',
          article_category: data?.article?.section?.th || '',
          article_sub_category: data?.article?.subCategory?.th || '',
          article_publication_date: useDateUpdateDataLayer(data?.article?.published_at, true)
        });
      }
      return _result.concat({
        event: 'page_metadata',
        article_category: data?.article?.section?.th
      });
    default:
      return _result.concat({
        event: 'page_metadata',
        article_category: _.split(page, '/')[1] || ''
      });
  }
};

const MetaDataLayer: NextPage<Props> = ({ data, page }) => (
  <>
    {/* ------------------- Google Track Manager PAGE METADATA ------------------- */}
    <script
      async
      type='text/javascript'
      dangerouslySetInnerHTML={{
        __html: `dataLayer = ${JSON.stringify(sendDataLayerPage({ page, data }))}`
      }}
    />

    {/* -------------------------- Google Track Manager -------------------------- */}
    <script
      async
      id='datalayer'
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:''; j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `
      }}
    />
  </>
);

export default MetaDataLayer;
