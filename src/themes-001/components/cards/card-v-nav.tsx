import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';
import { FaRegEye } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { memo, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { APP_IMG } from 'constants/index';

import { convertBadge, numeralFormat, splitRote, timestamp, useDateUpdate } from 'utils/helper';
import { IMAGE_SIZE } from 'themes-001/components/cards/image';
import { timeAgo } from 'utils/helper';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { IArticle } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';
import { useCountviews } from 'utils/countview';
import { DEFAULT_COUNT_VIEW } from 'constants/index';
import styled from '@emotion/styled';
import { NextRouter, useRouter } from 'next/router';

const Image = dynamic(import('themes-001/components/cards/image'));

type Props = {
  data?: IArticle;
  showBadge?: boolean;
  showTitle?: boolean;
  showBlurb?: boolean;
  showPublishDate?: boolean;
  showCountView?: boolean;
  showTimeAgo?: boolean;
  showFooter?: boolean;
  eventDataLayer?: IDataLayerGlobal;
};
const CardVNav: NextPage<Props> = ({
  data,
  showBadge = true,
  showTitle = true,
  showBlurb = true,
  showPublishDate = true,
  showCountView = true,
  showTimeAgo = true,
  showFooter = true,
  eventDataLayer = {}
}) => {
  if (isEmpty(data)) return null;
  const [countView, setCountView] = useState<number>(0);
  const router: NextRouter = useRouter();

  const conditionCountview: boolean = showCountView && countView > DEFAULT_COUNT_VIEW;
  const conditionBadge: string | false = showBadge && convertBadge(data, false);

  useEffect(() => {
    (async () => {
      try {
        const _pageviews: number = await useCountviews(data);
        setCountView(_pageviews);
      } catch (err: any) {
        console.error(`${timestamp()} ==========> CARD_FULL ERROR :`, err.message);
      }
    })();
  }, [data]);
  return (
    <CardWrapper className='card-v'>
      <a
        href={`${splitRote(router)}${data?.link || '#'}`}
        aria-label={data?.title}
        target='_self'
        title={data?.title}
        tabIndex={-1}
        // ! DATALAYER
        onClick={() =>
          sendDataLayerGlobal({
            ...eventDataLayer,
            data: {
              title: data?.title,
              ...eventDataLayer.data
            }
          })
        }
      >
        {/* ---------------------------------- IMAGE ---------------------------------  */}
        <div className='card-image'>
          <Image image={data?.image || '/default.jpg'} title={data?.title} external={false} size={IMAGE_SIZE.LG} />

          {!!conditionBadge && (
            <div className='badge'>
              <small className='line-clamp --1'>{conditionBadge}</small>
            </div>
          )}
        </div>
        <div className='card-detail'>
          {/* ---------------------------------- CONTENT -------------------------------  */}
          <div className='card-content'>
            {showTitle && <h3 className='title line-clamp --2'>{data?.title}</h3>}
            {showBlurb && <small className='blurb line-clamp --2'>{data?.blurb || ''}</small>}
          </div>

          {/* ------------------------------ CONTENT-FOOTER ----------------------------  */}
          {showFooter && (
            <div className='card-footer'>
              {showTimeAgo && (
                <div className='footer-left --show-desktop'>
                  <small> {timeAgo(data?.published_at)}</small>
                </div>
              )}
              <div className='footer-right'>
                {showPublishDate && (
                  <div className='published-date'>
                    <FaRegCalendarAlt size={10} />
                    <small>{useDateUpdate(data?.published_at)}</small>
                  </div>
                )}
                {conditionCountview && (
                  <div className='count-view'>
                    <FaRegEye size={12} />
                    <small>{numeralFormat(countView)}</small>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </a>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  /* ---------------------------------- HOVER --------------------------------- */
  &:hover {
    .card-image {
      img {
        transform: scale(1.1);
      }
      .badge small {
        &::before {
          transform-origin: left;
          transform: scaleX(1);
        }
      }
    }
    .card-content {
      .title {
        background-position: 0;
      }
    }
  }
  .card-image {
    position: relative;
    padding-top: 56.25%;
    background-image: url(${APP_IMG}/default-pic.jpg);
    background-size: cover;
    overflow: hidden;
    background-repeat: repeat;
    background-position: center;
    .resolution-image {
      box-shadow: 0px 0px 2px 0px #b7b7b7;
      position: absolute;
      width: 100% !important;
      height: 100% !important;
      top: 0;
      left: 0;
    }
    /* ---------------------------------- IMAGE --------------------------------- */
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      aspect-ratio: 16/9;
      transform-origin: 50% 65%;
      transition: transform 2s, filter 0.5s ease-out;
      /* cls */
      position: absolute;
      top: 0;
      left: 0;
      width: 101%;
      height: 101%;
      object-fit: cover;
    }
    /* ---------------------------------- BADGE --------------------------------- */
    .badge {
      position: static;
      top: 0px;
      width: 100%;
      display: flex;
      align-items: center;

      padding: 1px 0 0 5px;
      border-left: 3px solid var(--primary-color);
      margin: 10px 0 10px 0;
      small {
        position: relative;
        line-height: 1;
        color: #000;
        font-weight: 700;
        font-size: 14px;
        text-decoration: none;
        text-transform: capitalize;
        transition: All 0.2s ease-in;
        padding: 0;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 0px;
          border-radius: 2px;
          background-color: var(--primary-color);
          bottom: 0;
          left: 0;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s ease-in-out;
        }
      }
    }
  }
  /* -------------------------------- CONTENTS -------------------------------- */
  .card-content {
    margin: 10px 0px 7px;
  }
  /* ---------------------------------- TITLE --------------------------------- */

  .title {
    position: relative;
    min-height: 48px;
    margin-bottom: 10px;
    /* font-family: 'Nunito Sans', sans-serif; */
    text-transform: capitalize;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 700;

    color: #000;

    /* animation */
    background-image: linear-gradient(to right, var(--primary-color), var(--primary-color) 50%, rgb(0 0 0 / 95%) 50%);
    background-size: 200% 100%;
    background-position: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;
    /* animation */

    @media (max-width: 767px) {
      min-height: 35px;
      font-size: 16px;
    }
  }
  /* ---------------------------------- BLURB --------------------------------- */
  .blurb {
    margin: 5px 0;

    /* font-family: 'Nunito Sans', sans-serif; */
    text-transform: capitalize;
    font-size: 12px;
    line-height: 1.45;
    font-weight: 300;

    color: #939393;

    @media (max-width: 767px) {
      margin: 2.5px 0;
    }
  }
  /* --------------------------------- FOOTER --------------------------------- */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 5px 0 10px;

    border-top: 1px solid #c4c4c4;
    color: #939393;
    small {
      text-transform: lowercase;
      font-size: 12px;
      font-weight: 300;
      line-height: 1;
      @media (max-width: 767px) {
        font-size: 12px;
      }
    }

    .footer-left {
      display: none;
      &.--show-desktop {
        display: block;
        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .footer-right {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      .count-view {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding-top: 2px;
      }
      .published-date {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        letter-spacing: 0;
      }
    }
  }
  .card-detail {
    padding: 0 10px;
  }
`;
export default memo(CardVNav);
