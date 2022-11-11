import styled from '@emotion/styled';
import _ from 'lodash';
import { NextPage } from 'next';
import { memo, useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { CgPlayButtonO, CgPlayPauseO } from 'react-icons/cg';

import { IArticle } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';

import { APP_IMG, DEFAULT_COUNT_VIEW } from 'constants';
import { numeralFormat, timeAgo } from 'utils/helper';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import useResponsive from 'utils/devices';

type Props = {
  color?: string;
  className?: string;
  data?: IArticle;
  showBadge?: boolean;
  showTitle?: boolean;
  showBlurb?: boolean;
  showByline?: boolean;
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
  pause?: boolean;
};
const CardVideoH: NextPage<Props> = ({
  color = '',
  className = '',
  data,
  showTitle = true,
  showTimeAgo = true,
  showReadmore = true,
  showCountView = true,
  showFooter = true,
  eventDataLayer = {},
  target = '',
  path = '',
  pause = false
}) => {
  if (_.isEmpty(data)) return null;
  const [countView, setCountView] = useState<number>(0);
  const responsive = useResponsive();
  const conditionCountview: boolean = showCountView && countView > DEFAULT_COUNT_VIEW && responsive.isDesktop;
  useEffect(() => {
    setCountView(data?.pageviews || 0);
  }, [data]);

  return (
    <CardWrapper
      className={`${className} card-h`}
      color={color}
      // ! DATALAYER
      onClick={() => sendDataLayerGlobal({ ...eventDataLayer })}
    >
      {/* ---------------------------------- IMAGE ---------------------------------  */}
      <CardImage className='card-image'>
        <picture className='resolution-image'>
          <img src={data?.image ? `${data?.image}?x-image-process=style/md` : `${APP_IMG}/default.jpg`} width='100%' height='100%' loading='lazy' />
        </picture>
      </CardImage>
      <div className='card-detail'>
        {/* ---------------------------------- CONTENT -------------------------------  */}
        <div className='card-content'>{showTitle && <h3 className='title line-clamp --2'>{data?.title}</h3>}</div>

        {/* ------------------------------ CONTENT-FOOTER ----------------------------  */}
        {showFooter && (
          <div className='card-footer'>
            <div className='footer-left'>
              {data.is_video === true && <div className={`play-btn ${pause ? '--pause' : ''}`}>{pause ? <CgPlayPauseO size={16} /> : <CgPlayButtonO size={16} />}</div>}
              {showTimeAgo && (
                <div className='time-ago'>
                  <small> {timeAgo(data?.published_at)}</small>
                </div>
              )}
              {conditionCountview && (
                <div className='count-view'>
                  <FaRegEye size={12} />
                  <small>{numeralFormat(Number(countView))}</small>
                </div>
              )}
            </div>
            <div className='footer-right'>
              {showReadmore && (
                <a
                  href={data?.link || path}
                  aria-label={data?.title}
                  target={`${target === 'blank' ? '_blank' : '_self'}`}
                  rel='noopener noreferrer'
                  title={data?.title}
                  tabIndex={-1}
                  className='card-h-href'
                  // ! DATALAYER
                  onClick={() => sendDataLayerGlobal({ ...eventDataLayer })}
                >
                  <small className='video-remore'>อ่านต่อ...</small>{' '}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

const CardImage = styled.div`
  position: relative;
  overflow: hidden;
  background: #f1f2f3;
  border-radius: 3px;
  margin-right: 15px;
  @media (max-width: 1024px) {
    margin-right: 8px;
  }
  .resolution-image {
    display: flex;
    position: relative;
    padding-top: 56.25%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;

      transform-origin: 50% 65%;
      transition: transform 2s, filter 0.5s ease-out;
    }
    @media (max-width: 1024px) {
      padding-top: 85%;
    }
    @media (max-width: 767px) {
      padding-top: 56.25%;
    }
    @media (max-width: 380px) {
      padding-top: 80%;
    }
  }
  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    svg {
      color: #fff;
      filter: drop-shadow(0px 2px 2px #000);
    }
  }
`;

const CardWrapper = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  &.card-h {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    grid-template-areas: 'card-image card-detail';
    .card-image {
      grid-area: card-image;
    }
    .card-detail {
      grid-area: card-detail;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1.8fr;
    }
    @media (max-width: 767px) {
      grid-template-columns: 1fr 2fr;
    }
  }
  /* ---------------------------------- HOVER : CARD --------------------------------- */
  &:hover {
    .card-image {
      img {
        transform: scale(1.1);
      }
    }
    .card-content {
      .title {
        color: #939393;
      }
    }
  }

  .card-content {
    .title {
      position: relative;
      min-height: 42px;
      background-position: 0;
      font-size: 16px;
      line-height: 1.45;
      font-weight: 500;
      /* color: #023f87; */
      color: var(--primary-color);
      transition: all 0.3s ease-in-out;

      @media (max-width: 1024px) {
        min-height: 35px;
        font-size: 14px;
      }
    }
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .footer-left {
      display: flex;
      align-items: center;
      .play-btn {
        display: flex;
        margin-right: 8px;
        svg {
          /* color: #023f87; */
          color: var(--primary-color);
        }
        &.--pause svg {
          color: #ff4338;
        }
      }

      .badge {
        font-size: 14px;
        line-height: 1.45;
        font-weight: 500;
        /* color: #023f87; */
        color: var(--primary-color);
        padding-right: 8px;
      }
      .time-ago,
      .count-view {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 1.45;
        font-weight: 300;
        color: #939393;
        padding-right: 8px;
        svg {
          margin-right: 5px;
        }
      }
    }

    .footer-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .video-remore {
        font-size: 12px;
        line-height: 1.45;
        font-weight: 400;
        color: #939393;
        padding-right: 8px;
        transition: all 0.3s ease-in-out;
        /* ---------------------------------- HOVER : VIEW_MORE --------------------------------- */
        &:hover {
          /* color: #023f87; */
          color: var(--primary-color);
        }
      }
    }
  }
`;
export default memo(CardVideoH);
