import _, { isEmpty } from 'lodash';
import styled from '@emotion/styled';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import ReactStickyBox from 'react-sticky-box';
import { NextSeo } from 'next-seo';
import { useEffect, useRef } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

import useResponsive from 'utils/devices';
import { IArticle } from 'interface/section';
import { IAds, IRelated } from 'interface/service';
import { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import { APP_IMG, APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { convertObjPath, escapeChar, timestamp } from 'utils/helper';
import { IAdsNative, IAffiliate, ILastNews, IResponseData, ISolrRelated } from 'interface/service';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_LOGO, WEB_TITLE, WEB_URL } from 'constants/layout';
import { setContents } from 'utils/contents/set-contents';
import PageError from '../../../404';
import { useSelector } from 'react-redux';
import { getDetailPage } from 'services/detail.service';
import ArticleDefault from 'themes-001/components/articles/article-default';

const Layout = dynamic(import('themes-001/components/layout'));
const WidgetNews = dynamic(import('themes-001/components/widget/widget-lastnews'));
const WidgetBreadcrumb = dynamic(import('themes-001/components/widget/widget-breadcrumb'));
const DynamicAds = dynamic(import('utils/ads/dynamic-ads'));
const SectionAffiliate = dynamic(import('themes-001/components/sections/section-event/section-affiliate'));

interface IMapArticle extends IArticle {
  description: string;
  keyword: string;
  imageUrl: string;
}
type Props = {
  article: IArticle;
  related: IRelated[];
  last_news: ILastNews[];
  solrRelated: ISolrRelated[];
  affiliate?: any[];
  adsNative?: IAdsNative;
  ads?: IAds[];
};
const PageDetail: NextPage<Props> = ({ article, related, last_news, solrRelated, affiliate, ads }) => {
  if (_.isEmpty(article)) return <PageError />;

  const _article: IMapArticle = {
    ...article,
    title: article?.meta?.title || WEB_TITLE,
    description: article?.meta?.description || WEB_DESC,
    keyword: article?.meta?.keyword || WEB_KEYWORD,
    imageUrl: article?.meta?.og_social_image || IMAGE_DEFAULT
  };
  const _showGallery = !_.isEmpty(article?.gallery);
  const navSubMenu = useSelector((state: any) => state?.navData?.result);
  /* -------------------------------- DATALAYER ------------------------------- */
  const sectionRef = useRef<null | string>(null);
  const footerRef = useRef<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    /* ------------------------------- SET_CONTENT ------------------------------ */
    setContents();
  }, [router.isReady]);

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
            heading: 'paragraph-1'
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
            heading: 'paragraph-2'
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
            heading: 'paragraph-3'
          }
        });
      }
    }
  };

  const handleScrollToReadComplete = async (): Promise<void> => {
    const sectionEl: HTMLElement | null = await document.getElementById('read-complete');
    if (sectionEl) {
      if (sectionEl.offsetTop < document.documentElement.scrollTop) {
        sectionRef.current = 'read-complete';
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
              time: timer
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
              time: '1-10'
            }
          });
          await localStorage.removeItem('_t');
        }
      }
    }
  };

  const handleScrollToSectionAds = async (): Promise<void> => {
    try {
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
              heading: 'section-ads'
            }
          });
        }
      }
    } catch (err: any) {
      console.error(`${timestamp()} ==========> handleScrollToSectionAds ERROR : `, err.message);
    } finally {
      footerRef.current = true;
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
            heading: 'footer-wrapper'
          }
        });
      }
    }
  };

  /* ----------------------------------- SEO ---------------------------------- */
  const articleTitleSeo: string = escapeChar(_article?.title) || WEB_TITLE;
  const articleDescriptionSeo: string = escapeChar(_article?.description) || WEB_DESC;
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
          url: `${APP_URL}${_article?.link}`,
          article: {
            publishedTime: _article?.published_at,
            modifiedTime: _article?.updated_at,
            section: _article?.section?.th,
            authors: [`${WEB_URL.FACEBOOK}`],
            tags: _article?.tags
          },
          images: [
            {
              url: _article?.imageUrl,
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
        <link rel='canonical' href={`${_article?.canonical}`} />
        <link rel='image_src' href={_article?.imageUrl || IMAGE_DEFAULT} />
        <meta property='twitter:title' content={_article?.title || WEB_TITLE} />
        <meta property='twitter:url' content={WEB_URL.WEB} />
        <meta property='twitter:description' content={_article?.description || WEB_DESC} />
        <meta property='twitter:image' content={_article?.imageUrl || IMAGE_DEFAULT} />

        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                    __th_page="${_article?.section?.en}";
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
                          "name": "${_article?.section?.th}", 
                          "item": "${APP_URL}/${_article?.section?.en}" 
                        }, 
                        { 
                          "@type": "ListItem", 
                          "position": 3, 
                          "name": "${articleTitleSeo}", 
                          "item": "${APP_URL}${_article?.link}" 
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
                        "@id": "${APP_URL}${_article?.link}" 
                      }, 
                      "headline": "${articleTitleSeo}", 
                      "alternativeHeadline": "${articleTitleSeo}", 
                      "description": "${articleDescriptionSeo}", 
                      "image": "${APP_IMG}${_article?.image}", 
                      "datePublished": "${_article?.published_at}",
                      "dateModified": "${_article?.updated_at}",
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
                          "url": "${APP_IMG}/images/${WEB_LOGO}" 
                        } 
                      } 
                    } 
                  `
          }}
        />
      </Head>
      {!_.isEmpty(affiliate) && <SectionAffiliate position={4} data={affiliate || []} />}
      <Layout>
        <PageWrapper className='article-wrapper'>
          {article?.is_show_ads && !_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} data={ads} />}
          <div className='container sticky-breadcrumb'>
            <WidgetBreadcrumb data={article} color='#aaaAAA' />
          </div>
          <div id='section-1' className='container article'>
            <div className='block-1'>
              <div className='content-article'>
                {/* -------------------------------- CONTENTS --------------------------------- */}
                <ArticleDefault related={related} navSubMenu={navSubMenu} showGallery={_showGallery} article={_article} related={related} solrRelated={solrRelated} affiliate={affiliate} ads={ads} />
                {/* --------------------------------- BYLINE --------------------------------- */}
                {/* {!_.isEmpty(article?.byline) && <div className='byline-content'>{article?.byline}</div>} */}
                {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.POSTARTICLE} data={ads} />}
              </div>
            </div>
            <div className='block-2'>
              <ReactStickyBox offsetBottom={80} offsetTop={50}>
                {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.STICKY_1} data={ads} />}

                <WidgetNews
                  lastNews={related}
                  heading='ข่าวที่เกี่ยวข้อง'
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router.pathname,
                    section: 'ข่าวที่เกี่ยวข้อง',
                    position: isEmpty(article?.gallery) ? 'ใต้:header' : 'ใต้:อัลบั้มรูป',
                    data: {
                      block: '2',
                      heading: 'ข่าวที่เกี่ยวข้อง'
                    }
                  }}
                />
                {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.STICKY_2} data={ads} />}
                <WidgetNews
                  lastNews={last_news}
                  heading='ข่าวล่าสุด'
                  showImage={true}
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router.pathname,
                    section: 'ข่าวล่าสุด',
                    position: isEmpty(article?.gallery) ? 'ใต้:header' : 'ใต้:อัลบั้มรูป',
                    data: {
                      block: '2',
                      heading: 'ข่าวล่าสุด'
                    }
                  }}
                />
                <WidgetNews
                  lastNews={solrRelated}
                  heading='ข่าวที่น่าสนใจ'
                  showImage={true}
                  external={true}
                  // ! DATALAYER
                  eventDataLayer={{
                    type: DATALAYER_TYPE.TRACK_POSITION,
                    router: router.pathname,
                    section: 'ข่าวที่น่าสนใจ',
                    position: isEmpty(article?.gallery) ? 'ใต้:header' : 'ใต้:อัลบั้มรูป',
                    data: {
                      block: '2',
                      heading: 'ข่าวที่น่าสนใจ'
                    }
                  }}
                />
              </ReactStickyBox>
            </div>
          </div>
          {/* -------------------- ADS : PPN - AD1X1 ------------------- */}
          {!_.isEmpty(ads) && article?.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.AD1X1} data={ads} />}
        </PageWrapper>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params, query }: any) => {
  let initProps;
  try {
    const TInitPropsContentPage = await getDetailPage({ req, params, query });
    initProps = {
      ...TInitPropsContentPage
    };
  } catch (err: any) {
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }
  return {
    props: initProps
  };
};

export default PageDetail;

const PageWrapper = styled.section`
  position: relative;
  .article {
    display: flex;
    width: 100%;
    max-width: 100%;
    gap: 20px;
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

      .slick-prev,
      .slick-next {
        top: -30px;
        svg {
          width: 30px;
          height: 30px;
          padding: 0;
          color: #aaaaaa;
          background-color: transparent;
          border: 1px solid #aaaaaa;
        }
      }

      .slick-prev {
        right: 35px;
        left: unset;
        svg {
          right: 0;
          left: unset;
          /* padding-left: 5px; */
        }
      }
      .slick-next {
        right: 0px;
        svg {
          right: 0;
          /* padding-right: 5px; */
        }
      }
    }
    .block-2 {
      width: 30%;
      max-width: 100%;
      /* margin-bottom: 15px; */
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
    color: #eb2227;
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
    margin-top: 30px;
    .related {
      display: block;
      background-color: #fff;
      border-radius: 15px;
      line-height: 1.45;
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
            margin: 10px 0;
            @media (max-width: 690px) {
              font-size: 16px;
              -webkit-line-clamp: 2;
            }
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

        background-color: #ea212d;
        background: linear-gradient(89.91deg, #8b0c13 0.84%, #ea212d 99.93%);
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
          background-color: #ea212d;
          background: linear-gradient(14.76deg, #8b0c13 11.18%, #ea212d 52.05%);
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
`;
