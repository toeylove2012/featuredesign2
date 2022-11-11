import _ from 'lodash';
import dynamic from 'next/dynamic';
import StickyBox from 'react-sticky-box';
import { NextPage } from 'next';
import { EntityId } from '@reduxjs/toolkit';

import { IAds } from 'interface/service';
import { IMAGE_DEFAULT } from 'constants/layout';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import { IArticle, IMeta } from 'interface/section';
import DynamicAds, { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import { IMAGE_SIZE } from '../cards/image';
import styled from '@emotion/styled';
import CardVOverlay from '../cards/card-v-overlay';
import SectionTags from '../sections/section-tags';

// const SectionTags = dynamic(import('themes-001/components/sections/section-home/section-tags'));
const InfiniteScroll = dynamic(import('themes-001/components/InfiniteScroll'));
const WidgetBreadcrumb = dynamic(import('themes-001/components/widget/widget-breadcrumb'));
const CardV = dynamic(import('themes-001/components/cards/card-v'));
const WidgetNews = dynamic(import('themes-001/components/widget/widget-lastnews'));

type Props = {
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
const SubCategoryWrapper: NextPage<Props> = ({ articles, ads, navSubMenu, meta, ids, entities, lastNews, responsive, router, dataTags }) => {
  let dataTag = { data: dataTags };
  const divices = responsive.isMobile ? 0 : 2;

  return (
    <PageWrapper navCheck={navSubMenu ? navSubMenu[0]?.sub.length > 0 : false}>
      <div id='section-1' className='section-1'>
        <BreadcrumbWrapper className='sticky-breadcrumb container'>
          <WidgetBreadcrumb data={{ section: meta.category, subCategory: meta.subCategory }} color='#aaaAAA' />
        </BreadcrumbWrapper>
        {!_.isEmpty(articles) && (
          <>
            {/*  -------------------------------- SECTION-1 -------------------------------  */}
            <div className='container wrapper-1'>
              <>
                {articles.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card-item --item-${index + 1}`}>
                    {index === divices ? (
                      <CardVOverlay
                        className='card-responsive'
                        data={item}
                        showBlurb={true}
                        showTimeAgo={false}
                        showReadmore={true}
                        showByline={true}
                        showPublishDate={true}
                        showCountView={true}
                        showCenter={true}
                      />
                    ) : (
                      <CardV
                        className={'background-transparent'}
                        data={item}
                        size={IMAGE_SIZE.MD}
                        showBlurb={false}
                        showBadge={true}
                        showFooter={false}
                        showByline={true}
                        showPublishDate={true}
                        showCountView={true}
                        showCenter={true}
                      />
                    )}
                  </div>
                ))}
                {/* -------------------------- ADS - PPN : BILLBOARD ------------------------- */}
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />}
              </>
            </div>
            {responsive.isMobile && (
              <WidgetNews
                lastNews={lastNews}
                heading='ข่าวล่าสุด'
                showImage={false}
                // ! DATALAYER
              />
            )}
          </>
        )}
      </div>
      {/*  -------------------------------- SECTION-3 -------------------------------  */}
      <div id='section-3' className='section-3 container'>
        {/* {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />} */}
        <div className='wrapper-1'>
          <div className='block-1'>
            {ids.length < 1 ? (
              <div className='no-article'>
                <img src={`${IMAGE_DEFAULT}`} alt='no-article' width='100%' loading='lazy' />
              </div>
            ) : (
              <InfiniteScroll className='infinite-scroll' pageType='category'>
                {ids.slice(5).map((dataKey: EntityId, index: any) => (
                  <>
                    {index === 5 && (
                      <>
                        {responsive.isMobile && (
                          <SectionTags
                            tags={dataTag}
                            title='แท็กยอดนิยม'
                            color='#000'
                            tagsIndex='index'
                            // ! DATALAYER
                            eventDataLayer={{
                              type: DATALAYER_TYPE.TRACK_POSITION,
                              router: router.pathname,
                              section: 'แท็กยอดนิยม',
                              position: 'ใต้:ข่าวน่าสนใจ',
                              data: {
                                heading: 'แท็กยอดนิยม'
                              }
                            }}
                          />
                        )}
                      </>
                    )}
                    <CardVOverlay
                      key={dataKey}
                      data={entities[dataKey]?.data}
                      size={IMAGE_SIZE.MD}
                      showBlurb={true}
                      showBadge={true}
                      showFooter={true}
                      showReadmore={true}
                      showByline={true}
                      showPublishDate={true}
                      showCountView={true}
                      showCenter={true}
                      // ! DATALAYER
                      eventDataLayer={{
                        ...entities[dataKey]?.eventDataLayer,
                        section: 'section-3',
                        position: 'ใต้:section-2',
                        data: {
                          ...entities[dataKey]?.eventDataLayer.data,
                          block: '1',
                          index: entities[dataKey]?.eventDataLayer.data.index - 1
                        }
                      }}
                    />
                  </>
                ))}
              </InfiniteScroll>
            )}
          </div>
          <div className='block-2'>
            <StickyBox offsetTop={50} offsetBottom={50}>
              {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_1} data={ads} />}
              <WidgetNews
                lastNews={lastNews}
                heading='ข่าวล่าสุด'
                // ! DATALAYER
                eventDataLayer={{
                  type: DATALAYER_TYPE.TRACK_POSITION,
                  router: router.pathname,
                  section: 'ข่าวล่าสุด',
                  position: 'ใต้:section-2',
                  data: {
                    block: '2',
                    heading: 'ข่าวล่าสุด'
                  }
                }}
              />
              {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_3} data={ads} />}
              <div className='block-3'>
                <SectionTags
                  tags={dataTag}
                  title='แท็กยอดนิยม'
                  color='#000'
                  tagsIndex='index'
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router.pathname,
                    section: 'แท็กยอดนิยม',
                    position: 'ใต้:ข่าวน่าสนใจ',
                    data: {
                      heading: 'แท็กยอดนิยม'
                    }
                  }}
                />
              </div>
            </StickyBox>
          </div>
        </div>
      </div>
      {/* -------------------- ADS : PPN - POSTARTICLE ------------------- */}
      {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />}
    </PageWrapper>
  );
};

export default SubCategoryWrapper;

const BreadcrumbWrapper = styled.div`
  display: block;
`;
const PageWrapper = styled.section<{ navCheck: any }>`
  position: relative;
  .section-1 {
    background-color: #eff0f2;
    .wrapper-1 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        '--item-1 --item-3 --item-3 --item-4'
        '--item-2 --item-3 --item-3 --item-5';
      grid-gap: 20px;
      padding: 30px 15px;
      @media (max-width: 690px) {
        grid-template-columns: 1fr;
        grid-template-areas:
          '--item-1'
          '--item-2'
          '--item-3'
          '--item-4'
          '--item-5';
      }
      .--item-1 {
        grid-area: --item-1;
      }
      .--item-2 {
        grid-area: --item-2;
      }
      .--item-3 {
        grid-area: --item-3;
      }
      .--item-4 {
        grid-area: --item-4;
      }
      .--item-5 {
        grid-area: --item-5;
      }
    }
  }

  .section-3 {
    grid-area: section-3;
    padding: 30px 15px;

    .wrapper-1 {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      grid-template-areas: 'block-1 block-1 block-2';
      border-top: 2px solid #888888;
      padding: 30px 0;
      &::before {
        content: '';
        position: absolute;
        top: -2px;
        width: 350px;
        max-width: 100%;
        height: 2px;
        background-color: var(--secondary-color);
        @media (max-width: 690px) {
          width: 150px;
        }
      }

      @media (max-width: 768px) {
        grid-template-areas: 'block-1 block-1 block-1';
      }
    }

    /* --------------------------------- BLOCK_1 -------------------------------- */
    .block-1 {
      grid-area: block-1;
      .infinite-scroll {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: -5px -10px;
        .card-v {
          padding: 5px 10px 30px;
          width: 100%;
          min-width: auto;
          max-width: 50%;
          a {
            border-bottom: 2px solid #c07745;
          }
          /* margin: auto; */
          .title {
            font-size: 18px;
          }
          &:nth-child(1) {
            max-width: 50%;
            @media (max-width: 475px) {
              max-width: 100%;
            }
          }
          @media (max-width: 475px) {
            max-width: 100%;
          }
        }
        @media (max-width: 768px) {
          margin: -5px -5px;
          .card-v {
            .title {
              font-size: 16px;
            }
            padding: 5px 5px;
          }
        }

        @media (max-width: 475px) {
          margin: 0;
          .card-v {
            margin-bottom: 20px;
            padding: 0;
          }
        }

        .card-h-img,
        .card-h {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #c4c4c4;
        }
      }
    }
    /* --------------------------------- BLOCK_2 -------------------------------- */
    .block-2 {
      grid-area: block-2;
      display: block;
      position: relative;

      @media (max-width: 768px) {
        display: none;
      }
    }
    /* --------------------------------- BLOCK_3 -------------------------------- */

    .block-3 {
      padding: 20px 15px;
    }
  }
  /* ---------------------------- MOBILE AND TABLET --------------------------- */
  @media (max-width: 1024px) {
    padding-top: 0px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    .block-2,
    .block-1 {
      width: 100%;
    }
  }
  @media (max-width: 900px) {
    #tags {
      margin: -20px 0 0;
    }
  }
`;
