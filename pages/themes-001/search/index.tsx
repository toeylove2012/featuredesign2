import _ from 'lodash';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import StickyBox from 'react-sticky-box';

import { NextSeo } from 'next-seo';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { EntityId } from '@reduxjs/toolkit';

import { APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IMAGE_DEFAULT, WEB_DESC, WEB_TITLE, WEB_URL } from 'constants/layout';

import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import { convertObjPath, escapeChar, timestamp } from 'utils/helper';
import { IAds } from 'interface/service';
import { IResponseData } from 'interface/service';
import { IArticle, IMeta, IMetaData, INextArticles } from 'interface/section';
import { dataAction } from 'themes-001/components/redux/data';
import PageError from '../../404';
import { useAppDispatch, useAppSelector } from 'themes-001/components/redux/store';
import styled from '@emotion/styled';
import { getSearchPage } from 'services/search.service';
import CardH from 'themes-001/components/cards/card-h';
import useResponsive from 'utils/devices';

const DynamicAds = dynamic(import('utils/ads/dynamic-ads'));
const Layout = dynamic(import('themes-001/components/layout'));
const WidgetMeta = dynamic(import('themes-001/components/widget/widget-meta'));
const WidgetBreadcrumb = dynamic(import('themes-001/components/widget/widget-breadcrumb'));
const WidgetNews = dynamic(import('themes-001/components/widget/widget-lastnews'));
const SectionTags = dynamic(import('themes-001/components/sections/section-tags'));
const CardV = dynamic(import('themes-001/components/cards/card-v'));
const InfiniteScroll = dynamic(import('themes-001/components/InfiniteScroll'));
const WidgetSearch = dynamic(import('themes-001/components/widget/widget-search'));

type Props = {
  articles: IArticle[];
  lastNews: IArticle[];
  meta: IMeta;
  searchText: string;
  nextArticles: INextArticles;
  ads?: IAds[];
  dataTags?: any;
};

const { clear, initialValue } = dataAction;

const PageSearch: NextPage<Props> = ({ articles, dataTags, lastNews, searchText, nextArticles, meta, ads }) => {
  if (_.isEmpty(articles)) return <PageError />;
  const router: NextRouter = useRouter();
  const responsive = useResponsive();

  const searchName: string = escapeChar(searchText) || '';
  let baseUrlCategory: string = `${APP_URL}/search?q=${searchText}`;
  let dataTag = { data: dataTags };

  const _article = useMemo<IMeta>(
    () => ({
      ...meta,
      title: `?????????????????????????????? ${searchText} ?????????????????? ?????????????????????????????? ${searchText}`,
      description: `?????????????????????????????????????????????????????? ${searchText} ?????????????????? ?????????????????????????????? ${searchText} ???????????????????????? ${searchText} ?????????????????????????????????????????????????????? ${searchText} ??????????????????????????????????????????????????? ${searchText} - ?????????????????????????????????`,
      keyword: `${searchText}, tags`
    }),
    [meta]
  );

  const handleScrollBreadcrumb = (): void => {
    const breadCrumb = document.querySelector('.sticky-breadcrumb');
    const header = document.querySelector('.header-wrapper');
    if (document.documentElement.scrollTop > 0) {
      const height = header?.clientHeight !== undefined && header?.clientHeight - 1;
      breadCrumb?.setAttribute('style', `top: ${height}px; opacity: 1; visibility: visible;`);
    } else {
      breadCrumb?.setAttribute('style', 'opacity: 0; visibility: hidden;');
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', handleScrollBreadcrumb);
    return () => document.removeEventListener('scroll', handleScrollBreadcrumb);
  }, []);

  /* -------------------------------- START : LOADMORE -------------------------------- */
  const dispatch = useAppDispatch();
  const { ids, entities } = useAppSelector(state => state.data);

  // initial value
  useEffect(() => {
    dispatch(initialValue({ pageType: 'search', keyword: searchText, list: articles, router: router?.pathname, nextLink: nextArticles.next }));
    return () => {
      dispatch(clear());
    };
  }, []);

  /* ----------------------------------- SEO ---------------------------------- */
  const articleTitleSeo: string = escapeChar(_article?.title) || WEB_TITLE;
  const articleDescriptionSeo: string = escapeChar(_article?.description) || WEB_DESC;

  /* ------------------------------- Meta ------------------------------- */
  const metaData = useMemo<IMetaData>(
    () => ({
      heading: '??????????????????????????????',
      title: `" ${searchText} "`,
      description: articleDescriptionSeo
    }),
    [searchText, articleDescriptionSeo]
  );
  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo
        noindex={IS_NO_ROBOT_INDEX}
        nofollow={IS_NO_ROBOT_INDEX}
        title={_article?.title}
        description={_article?.description}
        openGraph={{
          type: 'article',
          locale: 'th',
          site_name: WEB_NAME,
          title: _article?.title,
          description: _article?.description,
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
            content: _article?.keyword || ''
          }
        ]}
      />
      {/* --------------------------------- HEADER --------------------------------- */}
      <Head>
        <link rel='canonical' href={baseUrlCategory} />
        <link rel='image_src' href={IMAGE_DEFAULT} />
        <meta property='twitter:title' content={_article?.title} />
        <meta property='twitter:url' content={WEB_URL.WEB} />
        <meta property='twitter:description' content={_article?.description} />
        <meta property='twitter:image' content={IMAGE_DEFAULT} />

        {/* --------------------------------- Truehit -------------------------------- */}
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                __th_page="searchs";
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
                    "target": "${WEB_URL.WEB}/search?q={search_term_string}", 
                    "query-input": "required name=search_term_string" 
                  } 
                } 
              `
          }}
        />

        {/* ---------------------------- SNIPPET : WebSite --------------------------- */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: ` 
                { 
                  "@context": "http://schema.org", 
                  "@type": "WebPage", 
                  "name": "${articleTitleSeo}", 
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
                  "itemListElement": [ 
                    { 
                      "@type": "ListItem", 
                      "position": 1, 
                      "name": "?????????????????????", 
                      "item": "${APP_URL}" 
                    }, 
                    { 
                      "@type": "ListItem", 
                      "position": 2, 
                      "name": "${articleTitleSeo}", 
                      "item": "${APP_URL}/search?q=${searchName}" 
                    } 
                  ] 
                } 
              `
          }}
        />
      </Head>
      <Layout>
        <PageWrapper className='section-1'>
          <div className='container'>
            {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />}
            <div className='block-wrapper'>
              <div className='block-1'>
                <WidgetMeta data={metaData} showDescription={false} />
                <WidgetSearch />
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_1} data={ads} />}
                {ids.length < 1 ? (
                  <div className='no-article'>
                    <img src={`${IMAGE_DEFAULT}`} alt='no-article' width='100%' loading='lazy' />
                  </div>
                ) : (
                  <InfiniteScroll className='infinite-scroll' pageType='category'>
                    {ids.map((dataKey: EntityId, index: any) => (
                      <>
                        {index === 5 && (
                          <>
                            {responsive.isMobile && (
                              <div className='lastnews-mb'>
                                <WidgetNews
                                  lastNews={lastNews}
                                  heading='??????????????????????????????'
                                  showImage={false}
                                  // ! DATALAYER
                                />
                              </div>
                            )}
                          </>
                        )}
                        {index === 10 && (
                          <>
                            {responsive.isMobile && (
                              <SectionTags
                                tags={dataTag}
                                title='?????????????????????????????????'
                                color='#000'
                                tagsIndex='index'
                                // ! DATALAYER
                                eventDataLayer={{
                                  type: DATALAYER_TYPE.TRACK_POSITION,
                                  router: router.pathname,
                                  section: '?????????????????????????????????',
                                  position: '?????????:?????????????????????????????????',
                                  data: {
                                    heading: '?????????????????????????????????'
                                  }
                                }}
                              />
                            )}
                          </>
                        )}
                        <CardH
                          data={entities[dataKey]?.data}
                          showBlurb={false}
                          showBadge={true}
                          showPublishDate={true}
                          showFooter={true}
                          // ! DATALAYER
                          eventDataLayer={{
                            ...entities[dataKey]?.eventDataLayer,
                            section: '?????????????????????????????????',
                            position: '?????????:header',
                            data: {
                              ...entities[dataKey]?.eventDataLayer?.data,
                              block: '1'
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
                    heading='??????????????????????????????'
                    // ! DATALAYER
                    eventDataLayer={{
                      type: DATALAYER_TYPE.TRACK_POSITION,
                      router: router.pathname,
                      section: '??????????????????????????????',
                      position: '?????????:header',
                      data: {
                        heading: '??????????????????????????????',
                        block: '2'
                      }
                    }}
                  />
                  {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_2} data={ads} />}

                  <SectionTags
                    tags={dataTag}
                    // inPage='tags'
                    tagsIndex='index'
                    color='#000'
                    // ! DATALAYER
                    eventDataLayer={{
                      type: DATALAYER_TYPE.TRACK_POSITION,
                      router: router?.pathname,
                      section: '??????????????????????????????????????????',
                      position: '?????????:??????????????????????????????',
                      data: {
                        heading: '??????????????????????????????????????????',
                        block: '2'
                      }
                    }}
                  />
                  {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_3} data={ads} />}
                </StickyBox>
              </div>
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
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  let initProps: any;
  try {
    const TInitPropsTags = await getSearchPage({ req, res, query });
    initProps = {
      ...TInitPropsTags
    };
  } catch (err: any) {
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }
  return {
    props: initProps
  };
};
export default PageSearch;

const PageWrapper = styled.section`
  position: relative;
  .infinite-scroll {
    .card-h {
      &:nth-child(5),
      &:nth-child(10) {
        padding-bottom: 0;
      }
    }
  }
  .container {
    width: 100%;
    max-width: 1300px;
    margin: auto;
    padding: 0px 15px;
  }
  .block-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'block-1 block-1 block-2';
    grid-gap: 20px;
    padding: 15px 0 30px;
    @media (max-width: 768px) {
      grid-template-areas: 'block-1 block-1 block-1';
    }
  }
  /* --------------------------------- BLOCK_1 -------------------------------- */

  .block-1 {
    grid-area: block-1;
    .lastnews-mb {
      .card-h-href {
        grid-template-columns: 1fr !important;
        .card-detail {
          margin-left: 0 !important;
        }
      }
    }
    .card-h {
      padding-bottom: 20px;
      .card-h-href {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: 'card-image card-detail card-detail';
        @media (max-width: 690px) {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-areas: 'card-image card-image card-detail card-detail';
        }
        .card-image {
          padding-top: 56.25%;
        }
        .card-detail {
          margin-left: 15px;
        }
      }
    }
  }
  /* --------------------------------- BLOCK_2 -------------------------------- */
  .block-2 {
    grid-area: block-2;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
