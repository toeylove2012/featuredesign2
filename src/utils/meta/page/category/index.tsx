import { APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_TITLE, WEB_URL, WEB_URL_SAME_AS } from 'constants/layout';
import { IMeta } from 'interface/section';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { escapeChar } from 'utils/helper';
import { webData } from 'utils/meta/page/category/controller';

type Props = {
  meta?: IMeta;
};
const MetaTheme: NextPage<Props> = ({ meta }) => {
  const { _article, articleDescriptionSeo, baseUrl, setItemListElement } = useMemo(() => {
    const _article: IMeta = { ...meta, title: meta?.title || WEB_TITLE, description: meta?.description || WEB_DESC, keyword: meta?.keyword || WEB_KEYWORD };

    /* ----------------------------------- SEO ---------------------------------- */
    const articleDescriptionSeo: string = escapeChar(_article.description) || WEB_DESC;
    let baseUrl: string = `${APP_URL}/category/${_article.category?.en}`;

    /* ------------------------------- Breadcrumb ------------------------------- */
    let setItemListElement: string = '';

    if (_article.subCategory?.en !== null) {
      baseUrl = `${APP_URL}/category/${_article.category?.en}/${_article.subCategory?.en}`;
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
          "name": "${_article.category?.th}",
          "item": "${APP_URL}/category/${_article.category?.en}"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${_article.subCategory?.th}",
          "item": "${baseUrl}"
        }
      ]`;
    } else {
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
          "name": "${_article.category?.th}",
          "item": "${APP_URL}/category/${_article.category?.en}"
        }
        ]`;
    }

    return {
      _article,
      articleDescriptionSeo,
      baseUrl,
      setItemListElement
    };
  }, [meta]);

  const isNationTH = WEB_NAME === 'nationthailand';
  const textTitle = _article.title ? (webData.seoTitle ? webData.seoTitle.replace('<target>', _article.title) : _article.title) || WEB_TITLE : WEB_TITLE;
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
              "name": "${_article.subCategory?.th || _article.category?.th}",
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
            ${isNationTH ? '__en_page' : '__th_page'}="${_article.subCategory?.en || _article.category?.en}";
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
              "itemListElement": ${setItemListElement}
            }
          `
        }}
      />
    </>
  );
};

export default MetaTheme;
