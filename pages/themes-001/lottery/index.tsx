import _ from 'lodash';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useSelector } from 'react-redux';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_TITLE, WEB_URL } from 'constants/layout';
import { escapeChar, timestamp } from 'utils/helper';
import { APP_IMG, APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IArticle, IMeta } from 'interface/section';
import { IAffiliate, IResponseData } from 'interface/service';
import { IAds } from 'interface/service';
import { EntityId } from '@reduxjs/toolkit';
import CardV from 'themes-001/components/cards/card-v';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import StickyBox from 'react-sticky-box';
import SectionTags from 'themes-001/components/sections/section-tags';
import DynamicAds, { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import WidgetNews from 'themes-001/components/widget/widget-lastnews';
import WidgetLotteryResult from 'themes-001/components/widget/widget-lottery-result';
import WidgetLotteryCheck from 'themes-001/components/widget/widget-lottery-check';
import { dataAction } from 'themes-001/components/redux/data';
import PageError from '../../404';
import { useAppDispatch, useAppSelector } from 'themes-001/components/redux/store';
import WidgetBreadcrumb from 'themes-001/components/widget/widget-breadcrumb';
import { GET, GET_ARTICLES } from 'services';
import styled from '@emotion/styled';
import { getLotteryCategoryPage } from 'services/lottery.service';

const InfiniteScroll = dynamic(import('themes-001/components/InfiniteScroll'));
const SectionAffiliate = dynamic(import('themes-001/components/sections/section-event/section-affiliate'));
const Layout = dynamic(import('themes-001/components/layout'));

type Props = {
  articles: IArticle[];
  dataTags: any;
  meta: IMeta;
  nextArticles: string;
  ads?: IAds[];
  lastNews?: IArticle[];
  affiliate?: IAffiliate[];
};

const { clear, initialValue } = dataAction;

const LotteryCategory: NextPage<Props> = ({ articles, dataTags, meta, nextArticles, ads, lastNews, affiliate }) => {
  if (_.isEmpty(articles)) return <PageError />;

  const router: NextRouter = useRouter();
  let dataTag: any = { data: dataTags };
  const _article = useMemo<IMeta>(() => ({ ...meta, title: meta?.title || WEB_TITLE, description: meta?.description || WEB_DESC, keyword: meta?.keyword || WEB_KEYWORD }), [meta]);
  const navSubMenu = useSelector((state: any) => state?.navData?.result);

  /* ------------------------------- meta ------------------------------- */
  //   const metaData = useMemo<IMetaData>(
  //     () => ({
  //       heading: _article.heading,
  //       title: _article.subCategory?.th || _article.category?.th || 'new',
  //       description: _article.description
  //     }),
  //     [_article]
  //   );

  /* ------------------------------- Breadcrumb ------------------------------- */
  let baseUrlCategory: string = `${APP_URL}/lottery`;
  let setItemListElement: string = '';

  baseUrlCategory = `${APP_URL}/lottery`;
  setItemListElement = `[
        {
          "@type": "ListItem",
          "position": 1,
          "name": "หน้าแรก",
          "item": "${APP_URL}"
        },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "สลากกินแบ่งรัฐบาล",
            "item": "${APP_URL}/lottery"
          }
        ]`;

  const dispatch = useAppDispatch();
  const { ids, entities } = useAppSelector((state: { data: any }) => state.data);

  // initial value
  useEffect(() => {
    /* -------------------------------- START : LOADMORE -------------------------------- */
    dispatch(initialValue({ pageType: 'category', list: articles, router: router?.pathname, nextLink: nextArticles }));
    return () => {
      dispatch(clear());
    };
  }, []);

  /* ----------------------------------- SEO ---------------------------------- */
  const articleDescriptionSeo: string = escapeChar(_article?.description) || WEB_DESC;

  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo
        noindex={IS_NO_ROBOT_INDEX}
        nofollow={IS_NO_ROBOT_INDEX}
        title={_article?.title || WEB_TITLE}
        description={`${_article?.description} ผลสลากกินแบ่งรัฐบาลและลอตเตอรี่รวมผลสลากกินแบ่งรัฐบาล ตรวจงวดประจำวัน มีครบมากที่สุดต้อง posttoday` || WEB_DESC}
        openGraph={{
          type: 'article',
          locale: 'th_TH',
          site_name: WEB_NAME,
          title: _article?.title || WEB_TITLE,
          description: _article?.description || WEB_DESC,
          url: baseUrlCategory,
          images: [
            {
              url: IMAGE_DEFAULT,
              width: 1920,
              height: 1080,
              alt: WEB_NAME
            }
          ]
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: _article?.keyword || WEB_KEYWORD
          }
        ]}
      />
      {/* --------------------------------- HEADER --------------------------------- */}
      <Head>
        <link rel='canonical' href={baseUrlCategory} />
        <link rel='image_src' href={IMAGE_DEFAULT} />

        <meta property='twitter:title' content={_article?.title || WEB_TITLE} />
        <meta property='twitter:url' content={WEB_URL.WEB} />
        <meta property='twitter:description' content={_article?.description || WEB_DESC} />
        <meta property='twitter:image' content={IMAGE_DEFAULT} />

        {/* ------------------------------- Truehit -------------------------------- */}
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                __th_page="lottery";
              `
          }}
        />

        {/* ---------------------------- SNIPPET : WebSite --------------------------- */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "${WEB_NAME}",
                  "url": "${WEB_URL.WEB}",
                  "description": "${articleDescriptionSeo}",
                  "sameAs": [
                    "${WEB_URL.FACEBOOK}",
                    "${WEB_URL.TWITTER}",
                    "${WEB_URL.INSTAGRAM}",
                    "${WEB_URL.YOUTUBE}",
                    "${WEB_URL.LINE}"
                  ],
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "${WEB_URL.WEB}search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              `
          }}
        />
        {/* ---------------------------- SNIPPET : WebPage --------------------------- */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
                  {
                    "@context": "http://schema.org",
                    "@type": "WebPage",
                    "name": "สลากกินแบ่ง",
                    "description": "${articleDescriptionSeo}",
                    "publisher": {
                      "@type": "ProfilePage",
                      "name": "${WEB_NAME}"
                    }
                  }
                `
          }}
        />

        {/* ------------------------ SNIPPET : BreadcrumbList ------------------------ */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
                {
                  "@context": "http://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": ${setItemListElement}
                }
              `
          }}
        />
      </Head>
      {!_.isEmpty(affiliate) && <SectionAffiliate position={4} data={affiliate || []} />}

      <Layout>
        <HeadSeo>
          <h1>{`${meta.title}`}</h1>
          <h2> {meta?.description ? meta.description : WEB_DESC}</h2>
        </HeadSeo>
        <PageWrapper className='section-1' navCheck={navSubMenu ? navSubMenu[0]?.sub.length > 0 : false}>
          <div className='block-1'>
            {/* <div className='bg-overlay'></div> */}
            <BreadcrumbWrapper className='sticky-breadcrumb container'>
              <WidgetBreadcrumb data={{ section: { th: 'สลากกินแบ่ง' }, subCategory: meta.subCategory }} color='#000' />
            </BreadcrumbWrapper>
          </div>
          {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />}
          <div className='block-2-3 container'>
            <div className='block-2'>
              <WidgetLotteryCheck
                // ! DATALAYER
                eventDataLayer={{
                  type: DATALAYER_TYPE.TRACK_POSITION,
                  router: router?.pathname,
                  section: 'ตรวจผลสลากกินแบ่งรัฐบาล',
                  position: 'ใต้:header'
                }}
              />
              <WidgetLotteryResult />
              {ids.length < 1 ? (
                <div className='no-article'>
                  <img src={`${IMAGE_DEFAULT}`} alt='no-article' width='100%' loading='lazy' />
                </div>
              ) : (
                <InfiniteScroll className='infinite-scroll' pageType='category'>
                  {ids.map((dataKey: EntityId) => (
                    <>
                      <CardV
                        key={dataKey}
                        data={entities[dataKey]?.data}
                        path={`/lottery/${entities[dataKey]?.data?.dateDefault}`}
                        showBlurb={false}
                        showBadge={false}
                        showFooter={false}
                        // ! DATALAYER
                        eventDataLayer={{
                          ...entities[dataKey]?.eventDataLayer,
                          section: 'ข่าวทั้งหมด',
                          position: 'ใต้:header',
                          data: {
                            ...entities[dataKey]?.eventDataLayer?.data,
                            heading: 'สลากกินแบ่ง',
                            block: '1'
                          }
                        }}
                      />
                    </>
                  ))}
                </InfiniteScroll>
              )}
            </div>
            <div className='block-3'>
              <StickyBox offsetTop={50} offsetBottom={50}>
                <WidgetLotteryCheck />
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_1} data={ads} />}
                <WidgetNews
                  lastNews={lastNews}
                  heading={'ข่าวล่าสุด'}
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router.pathname,
                    section: 'ข่าวล่าสุด',
                    position: 'ใต้:ตรวจผลสลากกินแบ่งรัฐบาล',
                    data: {
                      block: '2',
                      heading: 'ข่าวล่าสุด'
                    }
                  }}
                />
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_2} data={ads} />}
                <SectionTags
                  tags={dataTag}
                  inPage='category'
                  color='#000'
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router?.pathname,
                    section: 'แฮชแท็กยอดนิยม',
                    position: 'ใต้:ข่าวล่าสุด',
                    data: {
                      heading: 'แฮชแท็กยอดนิยม',
                      block: '2'
                    }
                  }}
                />
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_3} data={ads} />}
              </StickyBox>
            </div>
          </div>
          {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />}
          {/* -------------------- ADS : PPN - AD1X1 ------------------- */}
          {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.AD1X1} data={ads} />}
        </PageWrapper>
      </Layout>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let initProps;
  try {
    const TInitPropsLotteryCategoryPage = await getLotteryCategoryPage({ res });
    initProps = {
      ...TInitPropsLotteryCategoryPage
    };
  } catch (err: any) {
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }
  return {
    props: initProps
  };
};

export default LotteryCategory;

const PageWrapper = styled.section<{ navCheck: any }>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'block-1 block-1 block-1 block-1 block-1'
    'block-2-3 block-2-3 block-2-3 block-2-3 block-2-3';
  grid-gap: 20px;
  /* background-color: #eff0f2; */
  .block-1 {
    grid-area: block-1;
  }
  .lineimg {
    @media (min-width: 691px) {
      display: none;
    }
    &.--grid-item {
      grid-area: lineimg;
    }
    margin: 15px 0;
  }
  .container {
    width: 100%;
    max-width: 1300px;
    margin: auto;
    padding: 0px 15px;
  }
  .bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-image: url(${APP_IMG}/images/bg-post-next.webp?x-image-process=style/md);
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 380px;
    @media (max-width: 768px) {
      min-height: 210px;
    }
  }
  /* --------------------------------- BLOCK_1 -------------------------------- */
  .block-3 {
    grid-area: block-3;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 768px) {
      display: none;
    }
    .widget-meta {
      .meta-description {
        display: none;
      }
    }
  }

  /* --------------------------------- BLOCK_2 -------------------------------- */
  .block-2-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    grid-template-areas: 'block-2 block-2 block-3';
    grid-area: block-2-3;
    @media (max-width: 768px) {
      grid-template-areas: 'block-2 block-2 block-2';
    }
  }
  .block-2 {
    grid-area: block-2;
    .lottery-wraper {
      display: none;
      @media (max-width: 768px) {
        display: block;
      }
    }
    .infinite-scroll {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -5px -10px;
      .card-v {
        padding: 5px 10px;
        width: 100%;
        min-width: auto;
        max-width: 50%;
        /* margin: auto; */
        @media (max-width: 768px) {
          padding: 5px 5px;
        }
        .title {
          font-size: 18px;
        }
        &:nth-child(1) {
          max-width: ${(props: { navCheck: any }) => (props.navCheck ? '100%' : '50%')};
          margin-bottom: ${(props: { navCheck: any }) => (props.navCheck ? '15px' : '0')};
          .card-content {
            display: ${(props: { navCheck: any }) => (props.navCheck ? 'none' : 'blcok')};
          }
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

      .card-h-img,
      .card-h {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #c4c4c4;
      }
    }
  }
  /* ---------------------------- MOBILE AND TABLET --------------------------- */
  @media (max-width: 1024px) {
    padding-top: 0px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    .widget-tags {
      padding: 15px 0 0px;
    }
    .block-3,
    .block-2 {
      width: 100%;
    }
  }
`;

const BreadcrumbWrapper = styled.div`
  display: block;
`;
const HeadSeo = styled.div`
  position: absolute;
  visibility: hidden;
  overflow: hidden;
`;
