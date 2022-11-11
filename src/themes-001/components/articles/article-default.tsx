import _, { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

import { getAffiliate } from 'utils/contents/get-affiliate';
import { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import { IAds, IRelated, ISolrRelated } from 'interface/service';
import { IArticle } from 'interface/section';
import { timestamp, useDatePublished } from 'utils/helper';
import { Viewer } from 'themes-001/components/cards';
import { useEffect, useState } from 'react';
import { incrementCountview } from 'utils/countview';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import { DEFAULT_COUNT_VIEW } from 'constants/index';
import { NextRouter, useRouter } from 'next/router';
import useResponsive from 'utils/devices';
import styled from '@emotion/styled';
import CardFeature from '../cards/card-feature';
import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import SectionTags from '../sections/section-tags';
import SubContnetWrapper from './subcontent-data';
import WidgetNews from '../widget/widget-lastnews';

const WidgetSocial = dynamic(import('themes-001/components/widget/widget-social-share'));

const DynamicAds = dynamic(import('utils/ads/dynamic-ads'));
type Props = {
  article: IArticle;
  related?: IRelated[];
  solrRelated?: ISolrRelated[];
  affiliate?: any[];
  ads?: IAds[];
  showWidgetSocial?: boolean;
  showViewer?: boolean;
  showDate?: boolean;
  showGallery?: boolean;
  navSubMenu?: any;
};
const ArticleDefault: NextPage<Props> = ({ related, article, affiliate, ads, navSubMenu, showWidgetSocial = true, showGallery = true, showDate = true, showViewer = true }: Props) => {
  if (_.isEmpty(article)) return null;
  const router: NextRouter = useRouter();
  const [countView, setCountView] = useState<number>(article.pageviews || 0);
  const conditionCountview: boolean = showViewer && countView > DEFAULT_COUNT_VIEW;
  const responsive = useResponsive();

  let dataTag: any = { data: article?.tags };

  useEffect(() => {
    (async () => {
      try {
        const _pageviews: number = await incrementCountview({ id: article.id, pageviews: article.pageviews });
        setCountView(_pageviews);
      } catch (err: any) {
        console.error(`${timestamp()} ==========> CARD_FEATURE ERROR :`, err.message);
      }
    })();
  }, [article]);

  return (
    <ArticleWrapper>
      <div id='contents' className='contents'>
        <div className='card-title'>
          {!_.isEmpty(article.title) && <h1>{article.title}</h1>}

          <CardContent>
            {showWidgetSocial && (
              <WidgetSocial
                articleLink={`${router.asPath}`}
                // ! DATALAYER
                eventDataLayer={{
                  type: DATALAYER_TYPE.TRACK_POSITION,
                  router: router?.pathname,
                  position: responsive.isMobile ? (showGallery ? 'ใต้:อัลบั้มรูป' : 'ใต้:ภาพปกข่าว') : 'ใต้:ภาพปกข่าว',
                  section: 'แชร์'
                }}
              />
            )}
            <div className='meta'>
              {article.byline && (
                <div className='byline'>
                  <AiOutlineUser />
                  {article.byline}
                </div>
              )}
              {showDate && article.published_at && (
                <div className='date-publish'>
                  <div className='date'>
                    <BiTimeFive size={14} />
                    {`${useDatePublished(article.published_at)}`}
                  </div>
                  {conditionCountview && <Viewer data={countView} />}
                </div>
              )}
            </div>
          </CardContent>
        </div>
        {/* ------------------------------- IMAGE ------------------------------- */}
        <CardFeature data={article} />
        {article.description && (
          <div className='blurb-detail'>
            <span>”</span>
            <h2
              className='content-blurb'
              dangerouslySetInnerHTML={{
                __html: `${article.description}`
              }}
            />
          </div>
        )}
        {router?.pathname !== '/galleries/[id]' && (
          <>
            {(article.content_I || article.content_II || article.content_III) && (
              <div className='detail'>
                {/* ------------------------- CONTENTS I : INARTICLE 1 ------------------------- */}
                {!_.isEmpty(article.content_I) && typeof article.content_I === 'string' && (
                  <div id='paragraph-1'>
                    <div
                      className='content-detail'
                      dangerouslySetInnerHTML={{
                        __html: article.content_I
                      }}
                    />
                    {article.is_show_ads && getAffiliate(1, affiliate)}
                    {article.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_1} data={ads} />}
                  </div>
                )}
                {/* ------------------------- CONTENTS II and ADS : INARTICLE 2 ------------------------ */}
                {/* <LazyLoad offset={100} once> */}
                {!_.isEmpty(article.content_II) && typeof article.content_II === 'string' && (
                  <div id='paragraph-2'>
                    <div
                      className='content-detail'
                      dangerouslySetInnerHTML={{
                        __html: article.content_II
                      }}
                    />
                    {article.is_show_ads && getAffiliate(2, affiliate)}
                    {article.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_2} data={ads} />}
                  </div>
                )}
                {/* </LazyLoad> */}
                {/* -------------------------- CONTENTS III and ADS : INARTICLE 3 ----------------------- */}
                {/* <LazyLoad offset={100} once> */}
                {!_.isEmpty(article.content_III) && typeof article.content_III === 'string' && (
                  <div id='paragraph-3'>
                    <div
                      className='content-detail'
                      dangerouslySetInnerHTML={{
                        __html: article.content_III
                      }}
                    />
                    {article.is_show_ads && getAffiliate(3, affiliate)}
                    {article.is_show_ads && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_3} data={ads} />}
                  </div>
                )}
                {/* </LazyLoad> */}
                <div id='read-complete' />
                {/* ---------------------------------- TAGS ---------------------------------- */}
                {!_.isEmpty(article?.tags) && (
                  <SectionTags
                    tags={dataTag}
                    title='แฮชแท็กที่เกี่ยวข้อง'
                    inPage='content'
                    color='#fff'
                    // ! DATALAYER
                    eventDataLayer={{
                      type: DATALAYER_TYPE.TRACK_POSITION,
                      router: router.pathname,
                      section: 'แฮชแท็กที่เกี่ยวข้อง',
                      position: 'ใต้:ข่าวน่าสนใจ',
                      data: {
                        heading: 'แฮชแท็กที่เกี่ยวข้อง'
                      }
                    }}
                  />
                )}
                {responsive.isMobile && (
                  <WidgetNews
                    lastNews={related}
                    heading='ข่าวที่เกี่ยวข้อง'
                    showImage={true}
                    carousel={true}
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
                )}
              </div>
            )}
          </>
        )}
      </div>
      <SubContnetWrapper navSubMenu={navSubMenu} />
    </ArticleWrapper>
  );
};
const CardContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 690px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    svg {
      width: 12px;
      height: 12px;
    }
  }
  .meta {
    margin-bottom: 5px;
    @media (max-width: 690px) {
      margin-top: 10px;
    }
    .byline {
      color: var(--primary-color);
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    .date-publish {
      font-weight: 300;
      color: #aaa;
    }
    .date-publish,
    .byline,
    svg {
      font-size: 16px;

      margin-right: 5px;
      @media (max-width: 690px) {
        font-size: 12px;
      }
    }
  }

  margin: 15px auto 0;
  @media (max-width: 767px) {
    .widget-social-share {
      .title {
        text-align: end;
        margin: 10px 5px 5px 0;
        padding: 0;
      }
      .list-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          vertical-align: middle;
          height: 30px;
          width: 30px;
          color: #fff;
        }
      }
    }
  }
`;

const ArticleWrapper = styled.div`
  position: relative;
  font-weight: 500;
  letter-spacing: 0;
  .contents {
    display: grid;
    grid-gap: 20px;

    padding: 20px 0 0 0;
    @media (max-width: 690px) {
      grid-gap: 10px;
      padding: 0;
    }
  }
  .card-title {
    background-color: #fff;
    h1 {
      font-size: 32px;
      color: #000;
      line-height: 1.45;
      font-weight: 600;
      @media (max-width: 767px) {
        font-size: 20px;
      }
    }
  }

  .detail {
    background-color: #fff;
    overflow: hidden;
    /* font-family: 'Sarabun', sans-serif; */
  }
  .blurb-detail {
    display: flex;
    span {
      font-size: 100px;
      color: var(--primary-color);
    }
    .content-blurb {
      display: block;
      margin: auto;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.65;
      color: var(--primary-color);
      width: 100%;
      padding: 0 15px 0 35px;
      border-radius: 10px;
      @media (max-width: 767px) {
        font-size: 18px;
      }
    }
  }
  .content-detail {
    position: relative;
    display: block;
    width: 100%;
    font-size: 18px;
    font-weight: 300;
    font-family: var(--front-secondary), sans-serif;
    padding: 0 5px;
    span {
      font-size: 18px;
      @media (max-width: 767px) {
        font-size: 18px;
      }
    }
    p {
      font-size: 18px;
      line-height: 1.65;
      span {
        font-size: 18px;
      }
      margin: 15px 0;
      a {
        color: var(--primary-color);
        font-weight: 700;
        &:hover {
          color: #979797;
        }
      }
    }
    pre {
      white-space: break-spaces;
    }
    strong {
      font-weight: 700;
    }
    ol li {
      list-style: auto;
      line-height: 1.65;
      list-style-type: auto;
    }
    ul {
      li {
        list-style-type: none;
        display: list-item;
        margin-left: 1.5rem;
        line-height: 1.65;
        a {
          letter-spacing: 0.2px;
          font-display: swap;
        }
      }
    }

    blockquote {
      border-left: 8px solid var(--primary-color);
      background: var(--text-color);
      p,
      span,
      strong {
        padding: 15px 0 15px 30px;
      }
    }

    img {
      display: block;
      object-fit: cover;
      max-width: 100%;
      margin: 20px auto;
      height: auto !important;
      width: 100% !important;
    }
    picture {
      display: block;
      max-width: 100%;
      margin: auto;
      span {
        width: 100%;
        display: block;
        position: relative;
        text-align: center;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.6;
        color: rgb(117, 117, 117);
        padding: 10px;
        margin: -5px auto 15px 0px;
      }
    }
    .image-caption {
      font-weight: 400;
      font-size: 13px !important;
      font-style: italic;
      letter-spacing: 0.25px;
    }
    .affaliate-image {
      width: 80% !important;
    }
    blockquote[class='tiktok-embed'] {
      border: none;
      background: none;
    }
    div[class='twitter-tweet twitter-tweet-rendered'],
    iframe[class='instagram-media instagram-media-rendered'] {
      margin: auto !important;
    }
    /* iframe dailymotion */
    div[style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden;'] > iframe {
      display: block;
      position: relative !important;
      margin: 20px auto !important;
      max-width: 100% !important;
      height: 480px;
      @media (max-width: 767px) {
        height: 190px !important;
      }
    }
    div[style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden;'] {
      height: 480px !important;
      @media (max-width: 767px) {
        height: 200px !important;
      }
    }
    /* iframe dailymotion end */
  }
`;
export default ArticleDefault;
