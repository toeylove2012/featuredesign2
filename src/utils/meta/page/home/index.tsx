import { APP_URL, IS_NO_ROBOT_INDEX, WEB_NAME } from 'constants/index';
import { IMAGE_DEFAULT, TWITTER, WEB_DESC, WEB_KEYWORD, WEB_TITLE, WEB_URL, WEB_URL_SAME_AS } from 'constants/layout';
import { IMetaTag } from 'interface/service';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { controller } from 'utils/meta/page/home/controller';

const { flipNewspaper } = controller;
type Props = {
  metaTags?: IMetaTag;
};
const MetaHome: NextPage<Props> = ({ metaTags }) => {
  const isNationTH = WEB_NAME === 'nationthailand';
  const textTitle = typeof metaTags?.title === 'undefined' ? WEB_TITLE : metaTags.title || WEB_TITLE;
  const textDescription = typeof metaTags?.description === 'undefined' ? WEB_DESC : metaTags.description || WEB_DESC;
  const textKeyword = typeof metaTags?.keywords === 'undefined' ? WEB_KEYWORD : metaTags.keywords || WEB_KEYWORD;

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
          url: WEB_URL.WEB,
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
        twitter={{
          handle: TWITTER.CREATOR,
          site: TWITTER.SITE,
          cardType: 'summary_large_image'
        }}
      />

      {/* --------------------------------- HEADER --------------------------------- */}
      <meta name='next-head-count' />
      <meta property='twitter:url' content={WEB_URL.WEB} />
      <meta property='twitter:title' content={textTitle} />
      <meta property='twitter:description' content={textDescription} />
      <meta property='twitter:image' content={IMAGE_DEFAULT} />

      <link rel='canonical' href={WEB_URL.WEB} />
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
              "description": "${textDescription}", 
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
              "name": "${WEB_NAME}", 
              "description": "${textDescription}", 
              "publisher": { 
                "@type": "ProfilePage", 
                "name": "${WEB_NAME}" 
              } 
            } 
          `
        }}
      />

      {/* --------------------------------- TRUE_HIT -------------------------------- */}
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: isNationTH ? `__en_page="home";` : `__th_page="หน้าแรก";`
        }}
      />

      {/* --------------------------------- FLIP_NEWSPAPER ---------------------------------- */}
      {flipNewspaper && <script src='//static.fliphtml5.com/web/js/plugin/LightBox/js/fliphtml5-light-box-api-min.js' />}

      {/* --------------------------------- facebook thai news ---------------------------------- */}
      {/* <script async defer crossOrigin='anonymous' src='https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v9.0&appId=457910038922239&autoLogAppEvents=1' nonce='AQyVgwRa' /> */}
    </>
  );
};

export default MetaHome;
