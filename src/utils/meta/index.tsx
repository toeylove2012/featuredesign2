import { APP_IMG, GOPT_ID, IZOOTO_URL, TRUE_HITS_URL, WEB_NAME } from 'constants/index';
import { ADDRESS_ORG, FACEBOOK, IMAGE_DEFAULT, LOGO_192, LOGO_APPLE, LOGO_FAVICON, LOGO_MARK, THEME_APPLE_BAR, THEME_TITLE, THEME_WEB, TWITTER, WEB_URL, WEB_URL_SAME_AS } from 'constants/layout';
import parse from 'html-react-parser';
import _ from 'lodash';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import useResponsive from 'utils/devices';
import { splitRote } from 'utils/helper';
import { controller, fontUrl, webData } from 'utils/meta/controller';

const MetaDataLayer = dynamic(import('utils/meta/meta-datalayer'), { ssr: true });
const MetaPage = dynamic(import('utils/meta/page'), { ssr: true });

const { interstitialsPath } = webData;
const { facebook, googleOptimize, iZooTo, interstitials } = controller;
type Props = {
  data?: any;
  page?: string;
};
const MetaTheme: NextPage<Props> = ({ data, page }) => {
  const { isDesktop } = useResponsive();
  const themePage = splitRote({ route: page });
  if (!_.includes(['thansettakij', 'spring', 'posttoday', 'bangkokbiznews', 'komchadluek', 'nationthailand', 'thepeople', 'nationtv', 'tnews', 'khobsanam', 'thainewsonline'], WEB_NAME))
    return (
      <>
        <meta httpEquiv='content-language' content='th' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        {/* ----------------------------- GOOGLE : Fonts ----------------------------- */}
        <link rel='preload' href='https://fonts.googleapis.com' />
        <link rel='preload' href='https://fonts.gstatic.com' crossOrigin='ture' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Sarabun:wght@200;300;400;500;600;700&display=swap' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap' />
      </>
    );

  return (
    <>
      <meta httpEquiv='content-language' content='th' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='theme-color' content={THEME_WEB} />
      <meta name='application-name' content={WEB_NAME} />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-TileColor' content={THEME_TITLE} />
      <meta name='msapplication-TileImage' content={`${APP_IMG}/images/${LOGO_MARK}`} />

      <meta name='format-detection' content='telephone=no' />
      <meta name='next-head-count' />

      {/* ---------------------------------- APPLE_META --------------------------------- */}
      <meta name='apple-mobile-web-app-title' content={WEB_NAME} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content={THEME_APPLE_BAR} />

      {/* ------------------------------------ SOCIAL ----------------------------------- */}
      {facebook && (
        <>
          <meta property='fb:admins' content={FACEBOOK.ADMIN} />
          <meta property='fb:app_id' content={FACEBOOK.APP_ID} />
          <meta property='fb:pages' content={FACEBOOK.PAGE} />
        </>
      )}
      <meta property='twitter:creator' content={TWITTER.CREATOR} />
      <meta property='twitter:site' content={TWITTER.SITE} />
      <meta property='twitter:card' content='summary_large_image' />

      {/* ----------------------------------- ICONS ------------------------------------- */}
      <link rel='icon' href={`${APP_IMG}/images/${LOGO_FAVICON}`} />
      <link rel='mask-icon' href={`${APP_IMG}/images/${LOGO_192}`} color={THEME_WEB} />
      <link rel='shortcut icon' type='image/x-icon' href={`${APP_IMG}/images/${LOGO_FAVICON}`} />
      <link rel='apple-touch-startup-image' href={IMAGE_DEFAULT} />
      <link rel='apple-touch-icon' href={`${APP_IMG}/images${LOGO_APPLE}`} />
      <link rel='apple-touch-icon' sizes='58x58' href={`${APP_IMG}/images/Icon-58.png`} />
      <link rel='apple-touch-icon' sizes='80x80' href={`${APP_IMG}/images/Icon-80.png`} />
      <link rel='apple-touch-icon' sizes='152x152' href={`${APP_IMG}/images/Icon-152.png`} />
      <link rel='apple-touch-icon' sizes='167x167' href={`${APP_IMG}/images/Icon-167.png`} />
      <link rel='apple-touch-icon' sizes='180x180' href={`${APP_IMG}/images/Icon-180.png`} />
      <link rel='apple-touch-icon' sizes='192x192' href={`${APP_IMG}/images/Icon-192.png`} />

      {/* --------------------------------- MANIFEST ----------------------------------- */}
      <link rel='manifest' href={`${APP_IMG}/manifest.json`} />

      {/* ---------------------------------- FONTS ------------------------------------- */}
      <link rel='preload' href='https://fonts.googleapis.com' />
      <link rel='preload' href='https://fonts.gstatic.com' crossOrigin='true' />
      {_.map(fontUrl, (n: string, i: number) => (
        <link key={i} href={n} rel='stylesheet' />
      ))}

      {/* ---------------------------- SNIPPET : Organization -------------------------- */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: ` 
            { 
              "@context": "https://schema.org", 
              "@type": "Organization", 
              "name": "${WEB_NAME}",
              "legalName" : "${WEB_NAME}",
              "alternateName": "${WEB_NAME}", 
              "url": "${WEB_URL.WEB}", 
              "logo": "${WEB_URL.WEB}static/images/${LOGO_192}", 
              "foundingDate": "2000", 
              "address": { 
                "@type": "PostalAddress", 
                "streetAddress": "${ADDRESS_ORG.CONTENT}", 
                "addressLocality": "${ADDRESS_ORG.PROVINCE}",
                "addressRegion":  "${ADDRESS_ORG.REGION}",
                "postalCode": "${ADDRESS_ORG.POSTCODE}",
                "addressCountry":  "${ADDRESS_ORG.COUNTRY}"
              }, 
              "sameAs": [${WEB_URL_SAME_AS}] 
            } 
          `
        }}
      />

      {/* -------------------------------- GOOGLE_OPTIMIZE ------------------------------ */}
      {googleOptimize && !_.isEmpty(GOPT_ID) && <script async src={`https://www.googleoptimize.com/optimize.js?id=${GOPT_ID}`} />}

      {/* ----------------------------------- TRUE_HIT ---------------------------------- */}
      {!_.isEmpty(TRUE_HITS_URL) && (
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.defer = true;
                ga.src = "${TRUE_HITS_URL}";
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
              })();
            `
          }}
        />
      )}

      {/* ----------------------------------- IZOOTO ---------------------------------- */}
      {iZooTo && !_.isEmpty(IZOOTO_URL) && (
        <>
          <script defer type='text/javascript' src={IZOOTO_URL} />
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: 'window._izq = window._izq || []; window._izq.push(["init" ]);'
            }}
          />
        </>
      )}

      {/* --------------------------------- ADS : PPN --------------------------------- */}
      <script async type='text/javascript' src='https://securepubads.g.doubleclick.net/tag/js/gpt.js' />
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: 'var googletag = googletag || {}; window.googletag.cmd = googletag.cmd || [];'
        }}
      />

      {/* ----------------------------- SCRIPT_BROWSER ------------------------------- */}
      {!_.isEmpty(data.dataAdsHeader) && parse(`${data.dataAdsHeader[isDesktop ? 'header_desktop' : 'header_mobile']}`)}

      {/* ------------------------- ADS : INTERSTITIALS ------------------------- */}
      {interstitials && !_.isEmpty(interstitialsPath) && (
        <script
          async
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                window.googletag = window.googletag || { cmd: [] };
                // GPT ad slots
                var interstitialSlot, staticSlot;
                
                googletag.cmd.push(function () {
                  // Define a web interstitial ad slot.
                  interstitialSlot = googletag.defineOutOfPageSlot(
                    ${interstitialsPath},
                    googletag.enums.OutOfPageFormat.INTERSTITIAL
                  );
                
                  // Slot returns null if the page or device does not support interstitials.
                  if (interstitialSlot) {
                    interstitialSlot.addService(googletag.pubads());
                    document.getElementById("status").innerText = "Interstitial is loading...";
                
                    // Add event listener to enable navigation once the interstitial loads.
                    // If this event doesn't fire, try clearing local storage and refreshing
                    // the page.
                    googletag.pubads().addEventListener("slotOnload", function (event) {
                      if (interstitialSlot === event.slot) {
                        document.getElementById("link").style.display = "block";
                        document.getElementById("status").innerText = "Interstitial is loaded.";
                      }
                    });
                  }
                
                  // Define static ad slots.
                  staticSlot = googletag
                    .defineSlot(
                      ${interstitialsPath},
                      [1, 1],
                      "static-ad-1"
                    )
                    .addService(googletag.pubads());
                
                  // Enable SRA and services.
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                });
              `
          }}
        />
      )}

      {/* ------------------------------- Meta_DataLayer -------------------------------- */}
      <MetaDataLayer data={data} page={page} />

      {/* ------------------------------------ PAGE ------------------------------------- */}
      <MetaPage data={data} page={page} />
    </>
  );
};

export default MetaTheme;
