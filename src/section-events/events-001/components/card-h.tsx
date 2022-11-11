import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { FaRegEye, FaRegPlayCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import numeral from 'numeral';
import styled from '@emotion/styled';

import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import Image from 'section-events/events-001/components/image';
import { incrementCountview } from 'utils/countview';
import { NextPage } from 'next';
import { IDataLayerGlobal } from 'interface/data-layer';
import { IArticle } from 'interface/section';
import _ from 'lodash';

type Props = {
  data?: IArticle;
  eventDataLayer?: IDataLayerGlobal;
  showTitle?: boolean;
  showBlurb?: boolean;
  showTimeAgo?: boolean;
  showPublishDate?: boolean;
  showCountView?: boolean;
  showImage?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
};
const CardH: NextPage<Props> = ({
  data,
  eventDataLayer = {},
  showTitle = true,
  showBlurb = false,
  showTimeAgo = true,
  showPublishDate = false,
  showCountView = true,
  showImage = true,
  target = '_self'
}) => {
  if (_.isEmpty(data)) return null;
  const [countView, setCountView] = useState<number>(0);
  const external: boolean = 'unitName' in data;

  useEffect(() => {
    incrementCountview(data)
      .then(item => setCountView(item))
      .catch(() => setCountView(0));
  }, []);

  const dateUpdate: string = dayjs(data?.published_at).locale('th').add(543, 'year').format('DD MMM YYYY เวลา H:mm น.');

  return (
    <CardHWrapper className='card-h' href={data?.link} title={data?.title} aria-label={data?.title} target={target} rel='noopener noreferrer'>
      {showImage && (
        <div className='thumb'>
          <Image image={data?.image} title={data?.title} ignoreLazy={false} external={external} />
          {data.is_video && <FaRegPlayCircle />}
        </div>
      )}
      <div className='info'>
        {showTitle && <span className='title line-clamp --2'>{data?.title}</span>}
        {showBlurb && <span className='blurb line-clamp --2'>{data?.blurb}</span>}

        <div className='footer'>
          {showPublishDate && <span className='publish-date line-clamp --1'>{dateUpdate}</span>}
          {/* {showTimeAgo && <span className='time-ago line-clamp --1'>{timeAgo(data?.published_at)}</span>} */}
          {showCountView && countView > 500 && (
            <span className='count-view line-clamp --1'>
              <FaRegEye />
              {countView > 999 ? numeral(countView).format('0.0a') : countView}
            </span>
          )}
        </div>
      </div>
    </CardHWrapper>
  );
};

const CardHWrapper = styled.a`
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 15px;
  text-decoration: none;
  color: #000;
  .thumb {
    width: 40%;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    img,
    svg {
      transition: 0.5s;
    }
    .lazyload-wrapper {
      height: 100%;
      width: 100%;
      .resolution-image {
        height: 100%;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    svg {
      position: absolute;
      width: 38px;
      height: 38px;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .info {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    .title {
      margin: 0;
      line-height: 1.4;
      font-size: 16px;
      font-weight: 500;
      transition: 0.5s;
    }

    .blurb,
    .time-ago,
    .publish-date,
    .count-view {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
    }
    .count-view {
      display: flex;
      align-items: center;
      svg {
        margin: auto 2px auto 8px;
      }
    }

    .footer {
      display: flex;
    }
  }
  &:hover {
    .thumb {
      img {
        transform: scale(1.1);
      }
      svg {
        color: var(--tertiary-color);
      }
    }
    .info {
      .title {
        color: var(--tertiary-color);
      }
    }
  }
`;

export default CardH;
