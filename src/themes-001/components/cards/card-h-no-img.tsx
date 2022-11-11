import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { memo } from 'react';
import { NextPage } from 'next';
import { splitRote, useDateUpdate } from 'utils/helper';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { IArticle } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';
import { BiTimeFive } from 'react-icons/bi';
import { NextRouter, useRouter } from 'next/router';

type Props = {
  color?: string;
  className?: string;
  data?: IArticle;
  showBadge?: boolean;
  showTitle?: boolean;
  showBlurb?: boolean;
  showPublishDate?: boolean;
  showReadmore?: boolean;
  showFooter?: boolean;
  eventDataLayer?: IDataLayerGlobal;
  target?: string;
  external?: boolean;
  path?: string;
  size?: any;
};
const CardHNoImage: NextPage<Props> = ({
  color = '#000',
  className = '',
  data,
  showTitle = true,
  showBlurb = true,
  showPublishDate = true,
  showReadmore = false,
  showFooter = true,
  eventDataLayer = {},
  target = '',
  path = ''
}) => {
  if (isEmpty(data)) return null;
  const router: NextRouter = useRouter();

  return (
    <CardWrapper className={`${className} card-h`} color={color}>
      <a
        href={`${splitRote(router)}${data?.link || path}`}
        aria-label={data?.title}
        target={`${target === 'blank' ? '_blank' : '_self'}`}
        rel='noopener noreferrer'
        title={data?.title}
        tabIndex={-1}
        className='card-h-href'
        // ! DATALAYER
        onClick={() => sendDataLayerGlobal({ ...eventDataLayer })}
      >
        <div className='card-detail'>
          {/* ------------------------------ CONTENT-FOOTER ----------------------------  */}
          {showFooter && (
            <div className='card-footer'>
              <div className='center-content'>
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
              </div>
              <div className='footer-right'>
                {showReadmore && (
                  <div className='readmore'>
                    <small>อ่านต่อ</small>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* ---------------------------------- CONTENT -------------------------------  */}
          <div className='card-content'>
            {showTitle && <h3 className='title line-clamp --2'>{data?.title}</h3>}
            {showBlurb && <small className='blurb line-clamp --4'>{data?.blurb || ''}</small>}
          </div>
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
  .card-h-href {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'card-detail card-detail card-detail';
    .card-detail {
      grid-area: card-detail;
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
        color: var(--primary-color);
      }
    }
  }
  .card-detail {
    position: relative;
    margin: 0 0px 0 7px;
    .card-content {
      border-left: 1px solid #aaaaaa;
      margin-left: 5px;
      padding-left: 10px;
    }
  }
  /* ---------------------------------- TITLE --------------------------------- */

  .title {
    position: relative;
    min-height: 52px;
    text-transform: capitalize;
    font-size: 18px;
    line-height: 1.45;
    font-weight: 500;
    color: ${props => props.color};
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
    padding: 5px 0 5px;
    color: #939393;
    .center-content {
      display: flex;
      align-items: center;

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
        font-size: 14px;
        font-weight: 500;
        small,
        svg {
          color: #aaaaaa;
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
export default memo(CardHNoImage);
