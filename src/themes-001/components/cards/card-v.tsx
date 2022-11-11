import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';
import { FaRegEye } from 'react-icons/fa';
import { memo, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { APP_IMG, DEFAULT_COUNT_VIEW } from '../../../constants';
import { convertBadge, numeralFormat, splitRote, timestamp, useDateUpdate } from 'utils/helper';
import { IMAGE_SIZE } from 'themes-001/components/cards/image';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { IArticle } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';
import { useCountviews } from 'utils/countview';
import { FiPlayCircle } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { NextRouter, useRouter } from 'next/router';

const Image = dynamic(import('themes-001/components/cards/image'));

type Props = {
  className?: string;
  data?: IArticle;
  showBadge?: boolean;
  showTitle?: boolean;
  showBlurb?: boolean;
  showByline?: boolean;
  showCenter?: boolean;
  showPublishDate?: boolean;
  showCountView?: boolean;
  showReadmore?: boolean;
  showTimeAgo?: boolean;
  showFooter?: boolean;
  eventDataLayer?: IDataLayerGlobal;
  target?: string;
  external?: boolean;
  path?: string;
  size?: any;
};
const CardV: NextPage<Props> = ({
  className = '',
  data,
  showBadge = true,
  showTitle = true,
  showBlurb = true,
  showByline = false,
  showCenter = false,
  showPublishDate = true,
  showReadmore = false,
  showCountView = true,
  showFooter = true,
  eventDataLayer = {},
  target = '',
  external = false,
  path = '',
  size
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
    <CardWrapper className={`${className} card-v`}>
      <a
        href={`${splitRote(router)}${data?.link || path}`}
        aria-label={data?.title}
        target={`${target === 'blank' ? '_blank' : '_self'}`}
        rel='noopener noreferrer'
        title={data?.title}
        tabIndex={-1}
        // ! DATALAYER
        onClick={() => sendDataLayerGlobal({ ...eventDataLayer })}
      >
        {/* ---------------------------------- IMAGE ---------------------------------  */}
        <div className='card-image'>
          <Image image={data?.image || '/default.jpg'} title={data?.title} external={external} size={size || IMAGE_SIZE.LG} />

          {data.is_video === true && (
            <div className='play-btn'>
              <FiPlayCircle size={80} />
            </div>
          )}
          {!!conditionBadge && (
            <div className='badge'>
              <small className='line-clamp --1'>{conditionBadge}</small>
            </div>
          )}
        </div>
        <div className='card-detail'>
          {/* ---------------------------------- CONTENT -------------------------------  */}
          <div className='card-content'>
            {showCenter && (
              <div className='center-content'>
                {showByline && (
                  <>
                    {data.byline && (
                      <p className='byline'>
                        <AiOutlineUser /> {data.byline}
                      </p>
                    )}
                  </>
                )}
                {showPublishDate && (
                  <>
                    {data?.published_at && (
                      <div className='published-date'>
                        <BiTimeFive size={12} />
                        <small>{useDateUpdate(data?.published_at)}</small>
                      </div>
                    )}
                  </>
                )}
                {conditionCountview && (
                  <div className='count-view'>
                    <FaRegEye size={12} />
                    <small>{numeralFormat(countView)}</small>
                  </div>
                )}
              </div>
            )}
            {showTitle && <h3 className='title line-clamp --2'>{data?.title}</h3>}
            {showBlurb && <small className='blurb line-clamp --4'>{data?.blurb || ''}</small>}
          </div>

          {/* ------------------------------ CONTENT-FOOTER ----------------------------  */}
          {showFooter && (
            <div className='card-footer'>
              <div className='footer-right'>
                {showReadmore && (
                  <div className='readmore'>
                    <small>อ่านต่อ</small>
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
  overflow: hidden;
  width: 100%;
  min-width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  &.background-transparent {
    .card-detail {
      background-color: transparent;
    }
  }
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

    padding-top: 70%;
    background-image: url(${APP_IMG}/default.jpg);
    background-size: cover;
    background-repeat: repeat;
    overflow: hidden;
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
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      svg {
        color: #fff;
        filter: drop-shadow(0px 4px 6px #000);
      }
    }
    /* ---------------------------------- BADGE --------------------------------- */
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      background-color: var(--primary-color);
      max-width: max-content;
      small {
        position: relative;
        line-height: 1;
        color: var(--text-color);
        font-weight: 300;
        font-size: 12px;
        text-decoration: none;
        text-transform: capitalize;
        /* animation */
        transition: All 0.2s ease-in;
        padding: 0;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 0px;
          background-color: var(--tertiary-color);
          bottom: 0;
          left: 0;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s ease-in-out;
        }
        /* animation */
      }
    }
  }
  .card-detail {
    position: relative;
    background-color: #fff;
    padding: 5px 15px;
    @media (max-width: 768px) {
      padding: 0;
    }
  }
  /* -------------------------------- CONTENTS -------------------------------- */
  .card-content {
    margin: 10px 0px 7px;
    .center-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;

      p.byline {
        display: flex;
        align-items: center;
        color: var(--secondary-color);
        font-size: 14px;
        font-weight: 500;

        &::after {
          content: '/';
          margin-left: 5px;
          color: #aaaaaa;
          @media (max-width: 690px) {
            content: '';
          }
          @media (max-width: 475px) {
            content: '/';
          }
        }
        svg {
          margin-right: 5px;
          color: var(--secondary-color);
        }
      }
      .published-date {
        display: flex;
        align-items: center;
        gap: 5px;
        letter-spacing: 0;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 500;
        small,
        svg {
          color: #aaaaaa;
        }
        @media (max-width: 690px) {
          display: none;
        }
        @media (max-width: 475px) {
          display: flex;
        }
      }

      .count-view {
        display: flex;
        align-items: center;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 500;
        gap: 5px;
        &::before {
          content: '/';
          color: #aaaaaa;
        }
        small,
        svg {
          color: #aaaaaa;
        }
      }
    }
  }
  /* ---------------------------------- TITLE --------------------------------- */

  .title {
    position: relative;
    min-height: 52px;
    text-transform: capitalize;
    font-size: 18px;
    line-height: 1.45;
    font-weight: 700;
    color: #000;
    background-image: linear-gradient(to right, var(--secondary-color), var(--secondary-color) 50%, rgb(0 0 0 / 95%) 50%);
    background-size: 200% 100%;
    background-position: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;
    @media (max-width: 767px) {
      min-height: 35px;
    }
  }
  /* ---------------------------------- BLURB --------------------------------- */
  .blurb {
    margin: 5px 0;
    text-transform: capitalize;
    font-size: 14px;
    line-height: 1.45;
    font-weight: 500;

    color: #5b5e7a;

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

    .readmore {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--secondary-color);
      border: 1px solid var(--secondary-color);
      padding: 5px 10px;
      small {
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`;
export default memo(CardV);
