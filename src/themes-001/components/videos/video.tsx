import _ from 'lodash';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

import { IAds } from 'interface/service';
import { IArticle, IMeta } from 'interface/section';
import DynamicAds, { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import styled from '@emotion/styled';

import VideoLatest from './section-video-latest';
import SectionVideo from './section-video';

const WidgetBreadcrumb = dynamic(import('themes-001/components/widget/widget-breadcrumb'));

type Props = {
  id?: string;
  articles: IArticle[];
  ads?: IAds[];
  navSubMenu?: any;
  meta: IMeta;
  ids?: any;
  entities?: any;
  lastNews?: IArticle[];
  responsive?: any;
  router?: any;
  dataTags?: any;
};
const VideoWrapper: NextPage<Props> = ({ id, articles, ads, navSubMenu, meta, lastNews }) => {
  return (
    <PageWrapper id={id} navCheck={navSubMenu ? navSubMenu[0]?.sub.length > 0 : false}>
      <div id='section-1' className='section-1'>
        <BreadcrumbWrapper className='sticky-breadcrumb container'>
          <WidgetBreadcrumb data={{ section: meta.category, subCategory: meta.subCategory }} color='#aaaAAA' />
        </BreadcrumbWrapper>
        {!_.isEmpty(articles) && (
          <>
            {/*  -------------------------------- SECTION-1 -------------------------------  */}
            <VideoLatest id='video-latest' heading='วิดีโอล่าสุด' data={lastNews} eventDataLayer={null} />
            {articles.map((el, i) => (
              <SectionVideo id={`video-${i + 1}`} data={el} eventDataLayer={null} showReadMore={true} />
            ))}
          </>
        )}
      </div>
      {/* -------------------- ADS : PPN - POSTARTICLE ------------------- */}
      {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />}
    </PageWrapper>
  );
};

export default VideoWrapper;

const BreadcrumbWrapper = styled.div`
  display: block;
`;
const PageWrapper = styled.section<{ navCheck: any }>`
  position: relative;
  .container {
    width: 100%;
    max-width: 1300px;
    margin: auto;
    padding: 0px 15px;
  }
`;
