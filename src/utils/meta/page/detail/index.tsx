import { APP_IMG, APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_LOGO, WEB_TITLE, WEB_URL, WEB_URL_SAME_AS } from 'constants/layout';
import { IArticle } from 'interface/section';
import _ from 'lodash';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import { useMemo } from 'react';
import { escapeChar } from 'utils/helper';
import { controller, webData } from 'utils/meta/page/detail/controller';

const { listShowAds } = webData;
const { instagram, twitter, tikTok } = controller;
interface IMapArticle extends IArticle {
  description: string;
  keyword: string;
  imageUrl: string;
}
type Props = {
  article?: IArticle;
};
const MetaTheme: NextPage<Props> = ({ article }) => {
  const { _article, articleTitleSeo, articleDescriptionSeo, baseUrl } = useMemo(() => {
    const _article: IMapArticle = {
      ...article,
      title: article?.meta?.title || WEB_TITLE,
      description: article?.meta?.description || WEB_DESC,
      keyword: article?.meta?.keyword || WEB_KEYWORD,
      imageUrl: article?.meta?.og_social_image || IMAGE_DEFAULT
    };
    /* ----------------------------------- SEO ---------------------------------- */
    const articleTitleSeo: string = escapeChar(_article.title) || WEB_TITLE;
    const articleDescriptionSeo: string = escapeChar(_article.description) || WEB_DESC;
    const baseUrl: string = `${APP_URL}${_article.link}`;

    return {
      _article,
      articleTitleSeo,
      articleDescriptionSeo,
      baseUrl
    };
  }, [article]);

  const isNationTH = WEB_NAME === 'nationthailand';
  const textTitle = _article.title || WEB_TITLE;
  const textDescription = _article.description || WEB_DESC;
  const textKeyword = _article.keyword || WEB_KEYWORD;

  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo
        noindex={IS_NO_ROBOT_INDEX}
        nofollow={IS_NO_ROBOT_INDEX}
        title={textTitle}
        description={textDescription}
        openGraph={{
          type: 'article',
          locale: isNationTH ? 'en_US' : 'th_TH',
          url: baseUrl,
          title: textTitle,
          description: textDescription,
          site_name: WEB_NAME,
          article: {
            publishedTime: _article.published_at,
            modifiedTime: _article.updated_at,
            section: _article.section?.th,
            authors: [`${WEB_URL.FACEBOOK}`],
            tags: _article.tags
          },
          images: [
            {
              url: _article.imageUrl,
              width: 700,
              height: 395,
              alt: textTitle
            }
          ]
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: textKeyword
          }
        ]}
      />

      {/* --------------------------------- HEADER --------------------------------- */}
      <meta property='twitter:url' content={WEB_URL.WEB} />
      <meta property='twitter:title' content={textTitle} />
      <meta property='twitter:description' content={textDescription} />
      <meta property='twitter:image' content={_article.imageUrl || IMAGE_DEFAULT} />

      <link rel='canonical' href={_article.canonical} />
      <link rel='image_src' href={_article.imageUrl || IMAGE_DEFAULT} />

      {/* ---------------------------- SNIPPET : WEB_SITE --------------------------- */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "${WEB_NAME}",
              "url": "${APP_URL}",
              "description": "${articleDescriptionSeo}",
              "sameAs": [${WEB_URL_SAME_AS}],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "${APP_URL}/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `
        }}
      />
      {/* ---------------------------- SNIPPET : WEB_PAGE --------------------------- */}
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

      {/* ------------------------------- TRUE_HIT -------------------------------- */}
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `
            ${isNationTH ? '__en_page' : '__th_page'}="${_article.section?.en}";
          `
        }}
      />

      {/* ------------------------ SNIPPET : BREADCRUMB_LIST ------------------------ */}
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
                  "name": "${_article.section?.th}", 
                  "item": "${APP_URL}/${_article.section?.en}" 
                }, 
                { 
                  "@type": "ListItem", 
                  "position": 3, 
                  "name": "${articleTitleSeo}", 
                  "item": "${APP_URL}${_article.link}" 
                } 
              ] 
            } 
          `
        }}
      />

      {/* -------------------------- SNIPPET : NEWS_ARTICLE ------------------------- */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: ` 
            { 
              "@context": "http://schema.org", 
              "@type": "NewsArticle", 
              "mainEntityOfPage": { 
                "@type": "WebPage", 
                "@id": "${APP_URL}${_article.link}" 
              }, 
              "headline": "${articleTitleSeo}", 
              "alternativeHeadline": "${articleTitleSeo}", 
              "description": "${articleDescriptionSeo}", 
              "image": "${APP_IMG}${_article.image}", 
              "datePublished": "${_article.published_at}",
              "dateModified": "${_article.updated_at}",
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
                  "url": "${APP_URL}/images/${WEB_LOGO}" 
                } 
              } 
            } 
          `
        }}
      />

      {/* --------------------------- SOCIAL EMBED SCRIPT -------------------------- */}
      {instagram && <Script id='widget-instagram' strategy='afterInteractive' async src='//www.instagram.com/embed.js' />}
      {twitter && <Script id='widget-twitter' strategy='afterInteractive' async src='https://platform.twitter.com/widgets.js' />}
      {tikTok && <Script id='widget-tik-tok' strategy='afterInteractive' async src='https://www.tiktok.com/embed.js' />}

      {/* --------------------------- ARTICLE SHOW ADS -------------------------- */}
      {_article.is_show_ads && _.map(listShowAds, (src: string, index: number) => <script key={index} async src={src} />)}
    </>
  );
};

export default MetaTheme;
