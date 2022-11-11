import _ from 'lodash';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import LazyLoad from 'react-lazyload';
import { GetServerSideProps, NextPage } from 'next';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_LOGO, WEB_TITLE, WEB_URL } from 'constants/layout';
import { APP_IMG, APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { escapeChar, timestamp } from 'utils/helper';
import { useEffect, useRef } from 'react';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { NextRouter, useRouter } from 'next/router';
import { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import Script from 'next/script';
import { IAdsNative, ISolrRelated } from 'interface/service';
import { IAds, IRelated } from 'interface/service';
import { IArticle, IMeta } from 'interface/section';
import { setContents } from 'utils/contents/set-contents';
import WidgetLastnews from 'themes-001/components/widget/widget-lastnews';
import ReactStickyBox from 'react-sticky-box';
import Carousels from 'themes-001/components/carousels';
import useResponsive from 'utils/devices';
import CardV from 'themes-001/components/cards/card-v';
import WidgetLotteryCheck from 'themes-001/components/widget/widget-lottery-check';
import WidgetLotteryResult from 'themes-001/components/widget/widget-lottery-result';
import CardH from 'themes-001/components/cards/card-h';
import { GET } from 'services';
import styled from '@emotion/styled';

const SectionAffiliate = dynamic(import('themes-001/components/sections/section-event/section-affiliate'));
const WidgetBreadcrumb = dynamic(import('themes-001/components/widget/widget-breadcrumb'));
const DynamicAds = dynamic(import('utils/ads/dynamic-ads'));
const Layout = dynamic(import('themes-001/components/layout'));
const ArticleDefault = dynamic(import('themes-001/components/articles/article-default'));
const SectionTags = dynamic(import('themes-001/components/sections/section-tags'));
const CardFeature = dynamic(import('themes-001/components/cards/card-feature'));

interface IMapArticle extends IArticle {
  description: string;
  datePeriod?: any;
  keyword: string;
  imageUrl: string;
}
type Props = {
  article: IArticle;
  related: IRelated[];
  lastNews: IArticle[];
  solrRelated: ISolrRelated[];
  affiliate?: any[];
  adsNative?: IAdsNative;
  secondAward: string;
  ads?: IAds[];
};
const PageDetail: NextPage<Props> = ({ article, related, lastNews, solrRelated, affiliate, ads }) => {
  if (_.isEmpty(article)) return <PageError />;

  const _article: IMapArticle = {
    ...article,
    title: article?.meta?.title || WEB_TITLE,
    description: article?.meta?.description || WEB_DESC,
    keyword: article?.meta?.keyword || WEB_KEYWORD,
    imageUrl: article?.meta?.og_social_image || IMAGE_DEFAULT
  };

  let dataTag: any = { data: article?.tags };
  const responsive = useResponsive();

  /* -------------------------------- DATALAYER ------------------------------- */
  const sectionRef = useRef<null | string>(null);
  const footerRef = useRef<boolean>(false);
  const router: NextRouter = useRouter();

  /* ----------------------------------- LOTTERY_LISET ---------------------------------- */

  const lottoryList = [
    { title: 'รางวัลที่ 2', content: 'รางวัลละ 200,000 บาท', awards: [...article.secondAward] },
    { title: 'รางวัลที่ 3', content: ' รางวัลละ 80,000 บาท', awards: [...article.thirdAward] },
    { title: 'รางวัลที่ 4', content: ' รางวัลละ 40,000 บาท', awards: [...article.fourAward] },
    { title: 'รางวัลที่ 5', content: ' รางวัลละ 20,000 บาท', awards: [...article.fifAward] }
  ];
  const awardsList = [
    [
      { id: 1, title: 'รางวัลที่ 1', content: 'รางวัลละ 6,000,000 บาท', lottos: [...article.firstAward] },
      { id: 2, title: 'เลขท้าย 2 ตัว', content: 'รางวัลละ 2,000 บาท', lottos: [...article.lastTwoNumber] }
    ],
    [
      { id: 3, title: 'เลขหน้า 3 ตัว', content: 'รางวัลละ 4,000 บาท', lottos: [...article.frontThreeNumber] },
      { id: 4, title: 'เลขหลัง 3 ตัว', content: 'รางวัลละ 4,000 บาท', lottos: [...article.behindThreeNumber] }
    ]
  ];

  /* ----------------------------------- SEO ---------------------------------- */
  const articleTitleSeo: string = escapeChar(_article?.title) || WEB_TITLE;
  const articleDescriptionSeo: string = escapeChar(_article?.description) || WEB_DESC;

  useEffect(() => {
    /* ------------------------------- SET_CONTENT ------------------------------ */
    setContents();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleParagraphOne);
    return () => document.removeEventListener('scroll', handleParagraphOne);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleParagraphTwo);
    return () => document.removeEventListener('scroll', handleParagraphTwo);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleParagraphThree);
    return () => document.removeEventListener('scroll', handleParagraphThree);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollToReadComplete);
    return () => document.removeEventListener('scroll', handleScrollToReadComplete);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollToSectionAds);
    return () => document.removeEventListener('scroll', handleScrollToSectionAds);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollToSectionFooter);
    return () => document.removeEventListener('scroll', handleScrollToSectionFooter);
  }, []);
  const handleParagraphOne = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('paragraph-1');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'paragraph-1';
        document.removeEventListener('scroll', handleParagraphOne);
        sendDataLayerGlobal({
          type: DATALAYER_TYPE.TRACK_SCROLL,
          router: router?.pathname,
          section: 'scroll',
          data: {
            title: router.asPath,
            heading: 'paragraph-1',
            block: '',
            index: '',
            carousel: '',
            time: ''
          }
        });
      }
    }
  };

  const handleParagraphTwo = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('paragraph-2');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'paragraph-2';
        document.removeEventListener('scroll', handleParagraphTwo);
        sendDataLayerGlobal({
          type: DATALAYER_TYPE.TRACK_SCROLL,
          router: router?.pathname,
          section: 'scroll',
          data: {
            title: router.asPath,
            heading: 'paragraph-2',
            block: '',
            index: '',
            carousel: '',
            time: ''
          }
        });
      }
    }
  };

  const handleParagraphThree = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('paragraph-3');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'paragraph-3';
        document.removeEventListener('scroll', handleParagraphThree);
        sendDataLayerGlobal({
          type: DATALAYER_TYPE.TRACK_SCROLL,
          router: router?.pathname,
          section: 'scroll',
          data: {
            title: router.asPath,
            heading: 'paragraph-3',
            block: '',
            index: '',
            carousel: '',
            time: ''
          }
        });
      }
    }
  };

  const handleScrollToReadComplete = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('section-ads');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'section-ads';
        const _t: any = localStorage.getItem('_t');
        if (!isNaN(_t)) {
          const counter = parseInt(_t);
          const toArray = (num: any) => num && [...`${num}`].map(elem => parseInt(elem));
          const _a = toArray(counter)[toArray(counter).length - 1] === 0 ? 0 : 1;
          const _b = counter - 1;
          const start = Math.floor((_a === 0 ? _b : counter) / 10) * 10;
          const end = Math.ceil(counter / 10) * 10;
          const first = start === 0 ? 1 : start + 1;
          const second = end === 0 ? 10 : end;
          const timer = `${first}-${second}`;

          document.removeEventListener('scroll', handleScrollToReadComplete);
          sendDataLayerGlobal({
            type: DATALAYER_TYPE.TRACK_READTIME,
            router: router?.pathname,
            section: 'scroll',
            data: {
              title: router.asPath,
              heading: 'read-complete',
              time: timer,
              block: '',
              index: '',
              carousel: ''
            }
          });
          await localStorage.removeItem('_t');
        } else {
          document.removeEventListener('scroll', handleScrollToReadComplete);
          sendDataLayerGlobal({
            type: DATALAYER_TYPE.TRACK_READTIME,
            router: router?.pathname,
            section: 'scroll',
            data: {
              title: router.asPath,
              heading: 'read-complete',
              time: '1-10',
              block: '',
              index: '',
              carousel: ''
            }
          });
          await localStorage.removeItem('_t');
        }
      }
    }
  };

  const handleScrollToSectionAds = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('section-ads');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'section-ads';
        document.removeEventListener('scroll', handleScrollToSectionAds);
        sendDataLayerGlobal({
          type: DATALAYER_TYPE.TRACK_SCROLL,
          router: router?.pathname,
          section: 'scroll',
          data: {
            title: router.asPath,
            heading: 'section-ads',
            block: '',
            index: '',
            carousel: '',
            time: ''
          }
        });
        footerRef.current = true;
      }
    }
  };
  const handleScrollToSectionFooter = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('footer-wrapper');
    if (footerRef.current) {
      if (sectionEl && sectionEl.offsetTop < document.documentElement.scrollTop + 500) {
        document.removeEventListener('scroll', handleScrollToSectionFooter);
        sendDataLayerGlobal({
          type: DATALAYER_TYPE.TRACK_SCROLL,
          router: router?.pathname,
          section: 'scroll',
          data: {
            title: router.asPath,
            heading: 'footer-wrapper',
            block: '',
            index: '',
            carousel: '',
            time: ''
          }
        });
      }
    }
  };

  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo
        noindex={IS_NO_ROBOT_INDEX}
        nofollow={IS_NO_ROBOT_INDEX}
        title={_article?.title || WEB_TITLE}
        description={_article?.description || WEB_DESC}
        openGraph={{
          type: 'article',
          locale: 'th',
          site_name: WEB_NAME,
          title: _article?.title || WEB_TITLE,
          description: _article?.description || WEB_DESC,
          url: `${APP_URL}${router.asPath}`,
          article: {
            publishedTime: _article?.published_at,
            modifiedTime: _article?.updated_at,
            section: _article?.section?.th,
            authors: [`${WEB_URL.FACEBOOK}`],
            tags: _article?.tags
          },
          images: [
            {
              url: `${APP_IMG}${article?.image}`,
              width: 700,
              height: 395,
              alt: _article?.title || WEB_TITLE
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
        <link rel='canonical' href={`${APP_URL}${router.asPath}`} />
        <link rel='image_src' href={`${APP_IMG}${article?.image}` || IMAGE_DEFAULT} />
        <meta property='twitter:title' content={_article?.title || WEB_TITLE} />
        <meta property='twitter:url' content={WEB_URL.WEB} />
        <meta property='twitter:description' content={_article?.description || WEB_DESC} />
        <meta property='twitter:image' content={`${APP_IMG}${article?.image}` || IMAGE_DEFAULT} />

        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                    __th_page="สลากกินแบ่ง";
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
                          "name": "หน้าแรก", 
                          "item": "${APP_URL}" 
                        }, 
                        { 
                          "@type": "ListItem", 
                          "position": 2, 
                          "name": "สลากกินแบ่ง", 
                          "item": "${APP_URL}/lottery" 
                        }, 
                        { 
                          "@type": "ListItem", 
                          "position": 3, 
                          "name": "${articleTitleSeo}", 
                          "item": "${APP_URL}${router.asPath}" 
                        } 
                      ] 
                    } 
                  `
          }}
        />

        {/* -------------------------- SNIPPET : NewsArticle ------------------------- */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: ` 
                    { 
                      "@context": "http://schema.org", 
                      "@type": "NewsArticle", 
                      "mainEntityOfPage": { 
                        "@type": "WebPage", 
                        "@id": "${APP_URL}${router.asPath}" 
                      }, 
                      "headline": "${articleTitleSeo}", 
                      "alternativeHeadline": "${articleTitleSeo}", 
                      "description": "${articleDescriptionSeo}", 
                      "image": "${APP_IMG}${_article?.image}", 
                      "datePublished": "${_article?.published_at || ''}",
                      "dateModified": "${_article?.updated_at || ''}",
                      "author": { 
                        "@type": "Thing", 
                        "name": "${_article.byline || WEB_NAME}",
                        "url": "${APP_URL}"
                      }, 
                      "publisher": { 
                        "@type": "Organization", 
                        "name": "${WEB_NAME}", 
                        "logo": { 
                          "@type": "ImageObject", 
                          "url": "${APP_URL}/static/images/${WEB_LOGO}" 
                        } 
                      } 
                    } 
                  `
          }}
        />
        {/* -------------------------------- ADS : Native (Mgid) ------------------------------- */}
        {/* {article.is_show_ads && adsNative?.header && parse(adsNative?.header || '')} */}

        {/* --------------------------- Social embed script -------------------------- */}
        <Script id='widget-instagram' strategy='afterInteractive' async src='//www.instagram.com/embed.js' />
        <Script id='widget-twitter' strategy='afterInteractive' async src='https://platform.twitter.com/widgets.js' />
      </Head>
      {!_.isEmpty(affiliate) && <SectionAffiliate position={4} data={affiliate || []} />}
      <Layout>
        <PageWrapper className='article-wrapper'>
          <div className='container sticky-breadcrumb'>
            <WidgetBreadcrumb data={{ section: { th: 'สลากกินแบ่ง' }, subCategory: { th: '' }, title: article.title }} color='#000' />
          </div>
          {article?.is_show_ads && !_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />}
          <div className='container article'>
            <div className='block-1'>
              <WidgetLotteryResult />
              {/* <CardFeature data={article} showTitle={false} /> */}
              {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_1} data={ads} />}
              <div className='content-article'>
                {/* -------------------------------- CONTENTS --------------------------------- */}
                <ArticleDefault article={article} related={related} solrRelated={solrRelated} affiliate={affiliate} ads={ads} />
                <HeadSeo>
                  <h2> {WEB_DESC}</h2>
                </HeadSeo>
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_2} data={ads} />}
                <div className='detail-lottery'>
                  <div className='show-mobile'>
                    <WidgetLotteryCheck
                      // ! DATALAYER
                      eventDataLayer={{
                        type: DATALAYER_TYPE.TRACK_POSITION,
                        router: router?.pathname,
                        section: 'ตรวจผลสลากกินแบ่งรัฐบาล',
                        position: 'ใต้:header'
                      }}
                    />
                  </div>

                  <div className='article-area'>
                    <div className='award-block --black mt-30'>
                      <div className='detail-header'>
                        <div className='heading'> ผลสลากกินแบ่งรัฐบาล </div>
                        <span> {`งวดประจำวันที่ ${_article?.datePeriod}`} </span>
                      </div>
                      {awardsList.map((row, indexR) => {
                        return (
                          <div key={indexR} className='result-block'>
                            {row.map((col, index) => (
                              <div key={index} className={`col-6 result-item item-${indexR}-${index}`}>
                                <div className='result-content'>
                                  <h2 className='title'> {col?.title} </h2>
                                  <h3 className='content'> {col?.content} </h3>
                                </div>
                                <div className='result-list'>
                                  {col?.lottos.map((item, i) => (
                                    <h4 key={i}> {item} </h4>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                    {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_3} data={ads} />}
                    <div>
                      {lottoryList.map((el, index) => {
                        return (
                          <div key={index} className='award-block'>
                            <h2> {el.title} </h2>
                            <h3> {el.content} </h3>
                            <div className='award-list'>
                              {el.awards.map((val, i) => (
                                <div key={i} className='award-item'>
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* --------------------------------- BYLINE --------------------------------- */}
                {!_.isEmpty(ads) && article?.is_show_ads && (
                  <div id='postartice' className='ads-sticky-overflow'>
                    <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />
                  </div>
                )}
              </div>
            </div>
            <div className='block-2'>
              <ReactStickyBox offsetBottom={80} offsetTop={180}>
                <WidgetLotteryCheck
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router?.pathname,
                    section: 'ตรวจผลสลากกินแบ่งรัฐบาล',
                    position: 'ใต้:header'
                  }}
                />
                {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.STICKY_1} data={ads} />}

                <WidgetLastnews
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
              </ReactStickyBox>
            </div>
          </div>
          {/* -------------------- ADS : PPN - POSTARTICLE ------------------- */}
          {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />}
          {/* -------------------- ADS : PPN - AD1X1 ------------------- */}
          {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.AD1X1} data={ads} />}
        </PageWrapper>
      </Layout>
    </>
  );
};

type TInitProps = {
  statusCode: number;
  errMessage: string | null;
  article: IArticle;
  // latest: any[];
  related: IRelated[];
  lastNews: any[];
  meta: IMeta;
  ads: IAds[];
};
export const getServerSideProps: GetServerSideProps = async ({ res, params }: any) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=59');
  const initProps: TInitProps = {
    statusCode: 200,
    errMessage: null,
    article: {},
    related: [],
    lastNews: [],
    meta: {},
    ads: []
  };

  const regex = /([1-9]([0-9]{3})-([1][0-2]|[0][0-9])-([0-2][0-9]|[3][0-1]))/;
  const { id } = params;
  const checkId = regex.test(id);

  try {
    if (checkId) {
      const uri = `/api/v1.0/lottory/${id}`;
      const resData = await GET(uri, false, true);
      if (_.isEmpty(resData)) {
        return {
          notFound: true
        };
      }
      if (resData?.statusCode === 404 || _.isUndefined(resData)) {
        return {
          notFound: true
        };
      }

      if (!_.isEmpty(resData)) {
        initProps.article = resData?.data || [];
        initProps.related = resData?.related || [];
        initProps.lastNews = resData.lastNews ? resData.lastNews.slice(0, 5) : [];
        initProps.meta = resData?.meta;
        initProps.ads = resData?.ads || [];
      }
    }
  } catch (err: any) {
    console.error(`${timestamp()} ==========> LOTTERY_DETAIL ERROR : `, err.message);
    initProps.errMessage = err?.message;
    initProps.statusCode = err?.response?.status || 500;
  }

  return {
    props: initProps
  };
};

export default PageDetail;

const HeadSeo = styled.div`
  position: absolute;
  visibility: hidden;
  overflow: hidden;
`;

const PageWrapper = styled.section`
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  .show-mobile {
    display: none;
    @media (max-width: 767px) {
      display: block;
    }
  }

  .show-desktop {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }

  .detail-lottery {
    .show-mobile {
      padding: 30px 0 0;
    }
  }
  .article {
    display: flex;
    width: 100%;
    max-width: 100%;
    gap: 20px;
    padding-top: 20px;
    .block-1 {
      width: 70%;
      max-width: 100%;
      display: block;
      /* word-break: break-all; */
      .gallery-content-list {
        display: none;
      }
      @media (max-width: 768px) {
        width: 100%;
        .gallery-content-list {
          display: block;
          column-count: unset;
          .lg-react-element {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 10px;
            .card-image {
              padding-top: 100%;
            }

            .more-gallery {
              p {
                padding: 0;
                margin: 0;
              }
            }
          }
        }
      }
      @media (max-width: 690px) {
        .gallery-content-list {
          margin-bottom: 10px;
        }
      }
    }
    .block-2 {
      width: 30%;
      max-width: 100%;
      margin-bottom: 15px;
      display: block;
      @media (max-width: 1024px) {
        .card-image {
          padding-top: 84%;
        }
      }
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  #section-ads {
    max-width: 100%;
    margin: 30px auto;
  }
  .byline-content {
    display: block;
    padding: 15px 0;
    max-width: 500px;
    width: 100%;
    color: var(--primary-color);
    font-size: 18px;
    font-weight: 500;

    @media (max-width: 1024px) {
      padding: 0 15px;
      margin-bottom: 30px;
    }

    @media (max-width: 767px) {
      max-width: 250px;
      padding: 0 10px;
    }
    @media (max-width: 475px) {
      font-size: 16px;
    }
  }
  .sticky-breadcrumb {
    display: block;
    position: sticky;
  }

  .footer-detail {
    grid-area: footer-detail;
    display: grid;
    grid-gap: 20px;
    .related {
      display: block;
      background-color: #fff;
      border-radius: 15px;
      padding: 20px 30px;
      .title {
        font-size: 24px;
        color: #333335;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .card-item {
        margin: -6px 0;
        a {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 20px;
          font-weight: 300;
          color: #333335;
          p {
            margin: 0;
            padding: 10px 0;
          }
        }
      }
    }
    .solrrelated {
      display: block;
      background-color: #fff;
      border-radius: 15px;
      padding: 20px 30px;
      .title-header {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 17px;
        padding: 5px 20px;
        display: block;
        cursor: pointer;
        position: relative;
        margin-left: 6px;
        width: max-content;
        color: #fff;
        transform: skew(-20deg);

        background-color: var(--primary-color);
        background: linear-gradient(89.91deg, #8b0c13 0.84%, var(--primary-color) 99.93%);
        @media (max-width: 690px) {
          font-size: 14px;
        }
        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: -10px;
          width: 4px;
          height: 100%;
          background-color: var(--primary-color);
          background: linear-gradient(14.76deg, #8b0c13 11.18%, var(--primary-color) 52.05%);
        }
        &::before {
          content: '';
          right: -6px;
          width: 3px;
        }
        &::after {
          content: '';
          right: -14px;
          width: 4px;
        }
        svg {
          width: 30px;
          height: 30px;
        }
      }
      .card-list {
        display: grid;
        grid-template-columns: 1fr;
        margin: 0 -10px;
      }
    }
    .bg-hastag {
      border-radius: 15px;
      margin-bottom: 15px;
      @media (max-width: 768px) {
        margin-bottom: 0;
      }
    }
    .lastnews-mb {
      @media (min-width: 769px) {
        display: none;
        margin-bottom: 0;
      }
      @media (max-width: 690px) {
        .card-list {
          .card-item {
            .card-h-img {
              .title {
                -webkit-line-clamp: 2;
              }
            }
          }
        }
      }
      display: block;
      margin-bottom: 20px;
    }
  }

  .award-block {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
    display: block;

    &.--black {
      /* background-color: #000; */
      .heading {
        background: -webkit-linear-gradient(89.91deg, #8b0c13 0.84%, var(--primary-color) 99.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #fee600;
        font-size: 32px;
        @media (max-width: 768px) {
          font-size: 26px;
        }
      }
      span {
        color: #000;
        padding-bottom: 30px;
      }
    }

    .detail-header {
      text-align: center;
    }

    .result-content {
      /* display: block; */
      width: 100%;
      display: block;
      text-align: start;
      @media (max-width: 768px) {
        text-align: center;
      }
      h2.title {
        font-size: 24px;
        background: -webkit-linear-gradient(89.91deg, #8b0c13 0.84%, var(--primary-color) 99.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #fee600;
        margin: 10px auto 0;
        text-align: right;
        @media (max-width: 768px) {
          font-size: 22px;
        }
      }
      h3.content {
        margin: 0 auto 10px;
        font-size: 12px;
        font-weight: 300;
        text-align: right;
      }
    }
    .result-block {
      display: flex;
      justify-content: space-around;
      @media (max-width: 690px) {
        flex-direction: column;
      }
      .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;

        .result-list {
          h4 {
            margin: 0;
          }
        }
        &.item-0-0 {
          .result-list {
            justify-content: center;
            padding: 5px 0 5px 15px;
            h4 {
              font-size: 36px;
              font-weight: 600px;
              color: #000;
            }
          }
        }
        &.item-0-1 {
          .result-list {
            justify-content: center;
            padding: 5px 0 5px 15px;
          }
          h4 {
            font-size: 36px;
          }
        }
        &.item-1-0 {
          .result-list {
            /* padding: 5px 0 5px 15px; */
            display: flex;
          }
          h4 {
            font-size: 26px;
            padding: 0 0 0 15px;
          }
          /* @media (max-width: 768px) {
            width: 50%;
          } */
        }
        &.item-1-1 {
          .result-list {
            display: flex;
          }
          h4 {
            font-size: 26px;
            padding: 0 0 0 15px;
          }
          /* @media (max-width: 768px) {
            width: 50%;
          } */
        }
      }
    }

    h2 {
      margin: 10px auto;

      text-align: center;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin: 10px auto;
      color: rgba(0, 0, 0, 0.75);
    }
    .award-list {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      .award-item {
        font-weight: 300;
        padding: 5px 15px 10px 15px;
      }
    }
  }
`;
