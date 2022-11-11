import _ from 'lodash';
import { getFeatureImage } from 'utils/contents/get-image';
import { NextPage } from 'next';
import { IArticle } from 'interface/section';
import styled from '@emotion/styled';

type Props = {
  data: IArticle;
  showImage?: boolean;
  showBreadcrumb?: boolean;
  showByLine?: boolean;
};
const CardFeature: NextPage<Props> = ({ data, showImage = true, showByLine = false }) => {
  if (_.isEmpty(data)) return null;

  return (
    <>
      <CardWrapper className='card-feature'>
        {/* ---------------------------------- DATE ---------------------------------- */}
        {showImage && (
          <CardImage className='card-image '>
            {!_.isEmpty(data) && getFeatureImage(data)}
            {!data.is_video && (
              <div className='card-content'>
                {/* ---------------------------------- TITLE --------------------------------- */}
                {showByLine && data.byline && (
                  <div className='byline'>
                    <small>{`BY LINE : ${data.byline}`}</small>
                  </div>
                )}
              </div>
            )}
          </CardImage>
        )}
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: block;
  width: 100%;
  max-width: 1300px;
  margin: auto;
  .date-publish {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: var(--primary-color);
    text-transform: uppercase;
    svg {
      font-size: 14px;
      margin-bottom: -1px;
    }
    span {
      padding: 5px;
    }
    @media (max-width: 1024px) {
      padding: 5px 0px;
    }
    @media (max-width: 767px) {
      font-size: 12px;
      padding: 5px 0px;
    }
  }
  .meta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 5px;
    .byline {
      font-size: 14px;
      font-weight: 700;
      color: #000;
    }
    @media (max-width: 767px) {
      width: 50%;
    }
  }

  .viewer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    svg {
      vertical-align: middle;
      height: 35px;
      width: 35px;
      padding: 10.5px 10px;
      color: var(--primary-color);
      g {
        fill: var(--primary-color);
      }
    }
    span {
      color: var(--primary-color);
      vertical-align: middle;
      font-size: 14px;
      font-weight: 600;
      padding-left: 0;
    }
    @media (max-width: 767px) {
      svg {
        height: 32px;
        width: 32px;
        padding: 10px;
      }
      span {
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
`;

const CardImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  /* ---------------------------------- IMAGE --------------------------------- */
  img {
    display: block;
    width: 100%;
    max-height: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    @media (max-width: 767px) {
      border-radius: 0px;
    }
  }

  .card-content {
    width: 100%;
    position: absolute;
    z-index: 8;
    display: block;
    text-align: center;
    bottom: 2rem;
  }
  /* ---------------------------------- TITLE --------------------------------- */
  .card-title {
    margin: 0.5rem 0 2rem 0;
    padding: 0 20px;
    font-size: 32px;
    line-height: 1.45;
    color: #fff;
    filter: drop-shadow(2px 2px 3px #1b1b1b);

    @media (max-width: 767px) {
      margin: 0.5rem 0 1rem 0;
      font-size: 28px;
    }
    @media (max-width: 475px) {
      margin: 0.5rem 0 1rem 0;
      font-size: 20px;
    }
  }
  /* --------------------------------- BYLINE --------------------------------- */
  .byline {
    display: block;
    width: 100%;
    max-width: 25%;
    text-align: center;
    margin: auto;
    padding: 10px 0;

    border-width: 1px 0px;
    border-style: solid;
    border-color: #ffffff;

    color: #fff;

    small {
      filter: drop-shadow(2px 2px 1px #1b1b1b);

      text-transform: uppercase;
      font-size: 24px;
    }
    @media (max-width: 767px) {
      max-width: 60%;
      padding: 5px 0;
      small {
        font-size: 12px;
      }
    }
  }
`;

export default CardFeature;
