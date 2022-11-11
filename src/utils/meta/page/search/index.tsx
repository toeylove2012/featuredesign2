import { APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_TITLE, WEB_URL, WEB_URL_SAME_AS } from 'constants/layout';
import { IMeta } from 'interface/section';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { escapeChar } from 'utils/helper';
import { webData } from 'utils/meta/page/search/controller';

const { seoTitle, seoDescription } = webData;
type Props = {
  meta?: IMeta;
  searchText?: string;
};
const MetaTheme: NextPage<Props> = ({ meta, searchText }) => {
  const { _article, articleTitleSeo, articleDescriptionSeo, baseUrl, searchName } = useMemo(() => {
    const _article: IMeta = {
      ...meta,
      title: searchText ? seoTitle.replace('<target>', searchText) || WEB_TITLE : WEB_TITLE,
      description: searchText ? seoDescription.replace('<target>', searchText) || WEB_DESC : WEB_DESC,
      keyword: `${searchText}, tags`
    };

    /* ----------------------------------- SEO ---------------------------------- */
    const articleTitleSeo: string = escapeChar(_article.title) || WEB_TITLE;
    const articleDescriptionSeo: string = escapeChar(_article.description) || WEB_DESC;
    const baseUrl: string = `${APP_URL}/search?q=${searchText}`;
    const searchName: string = escapeChar(searchText) || '';

    return {
      _article,
      articleTitleSeo,
      articleDescriptionSeo,
      baseUrl,
      searchName
    };
  }, [meta, searchText]);

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
            content: textKeyword
          }
        ]}
      />

      {/* --------------------------------- HEADER --------------------------------- */}
      <meta property='twitter:url' content={WEB_URL.WEB} />
      <meta property='twitter:title' content={textTitle} />
      <meta property='twitter:description' content={textDescription} />
      <meta property='twitter:image' content={IMAGE_DEFAULT} />

      <link rel='canonical' href={baseUrl} />
      <link rel='image_src' href={IMAGE_DEFAULT} />

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
            ${isNationTH ? '__en_page' : '__th_page'}="search";
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
                  "name": "${articleTitleSeo}", 
                  "item": "${APP_URL}/search?q=${searchName}" 
                } 
              ] 
            } 
          `
        }}
      />
    </>
  );
};

export default MetaTheme;
