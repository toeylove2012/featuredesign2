import { NextPage } from 'next';
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import Image from 'section-events/events-001/components/image';
import { IDataLayerGlobal } from 'interface/data-layer';
import styled from '@emotion/styled';

type Props = {
  data?: any;
  path?: string;
  crossDomain?: boolean;
  nonePicture?: boolean;
  eventDataLayer?: IDataLayerGlobal;
};
const CardVEV: NextPage<Props> = ({ data = {}, path = '#', crossDomain = false, eventDataLayer = {}, nonePicture = false }) => {
  return (
    <CardVEVWrapper className='card-v-ev'>
      {!nonePicture && (
        <div className='news-image'>
          {crossDomain ? (
            <a tabIndex={-1} href={`https://www.nationthailand.com${path}`} target='_blank' rel='noreferrer'>
              <Image image={data?.image} title={data?.title} crossDomain={true} />
              {data.is_video && <FaRegPlayCircle />}
            </a>
          ) : (
            <a href={path} tabIndex={-1} aria-label={data?.title}>
              <Image image={data?.image} title={data?.title} />
              {data.is_video && <FaRegPlayCircle />}
            </a>
          )}
        </div>
      )}
      <div className='news-content'>
        {crossDomain ? (
          <a tabIndex={-1} href={`https://www.nationthailand.com${path}`} target='_blank' rel='noreferrer'>
            <Image image='/images/property_inside/icon-playlist-1.svg' title='icon' ignoreLazy={false} external={false} specialNews={true} />
            <p className='line-clamp --2'>{data.title}</p>
          </a>
        ) : (
          <a href={path} tabIndex={-1} className='line-clamp --2'>
            <Image image='/images/property_inside/icon-playlist-1.svg' title='icon' ignoreLazy={false} external={false} specialNews={true} />
            <p className='line-clamp --2'>{data.title}</p>
          </a>
        )}
      </div>
    </CardVEVWrapper>
  );
};

const CardVEVWrapper = styled.div`
  position: relative;
  cursor: pointer;
  border: 2px solid rgb(182, 182, 182);
  margin-bottom: 15px;
  .news-image {
    overflow: hidden;
    position: relative;
    aspect-ratio: 16 / 9;
    img,
    svg {
      transition: 0.5s;
    }
    img {
      aspect-ratio: 16 / 9;
    }
    svg {
      position: absolute;
      width: 50px;
      height: 50px;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .news-content {
    margin-top: 0;
    background-color: #3cb54a;
    display: flex;
    padding: 4px 6px;
    img {
      width: 20px;
      height: auto;
    }
    a {
      display: flex;
      gap: 10px;
      transition: 0.5s;
      text-decoration: none;
      color: #000;
      font-weight: 600;
      align-items: center;
    }
  }
  &:hover {
    .news-image {
      img {
        transform: scale(1.1);
      }
      svg {
        color: #ffff00;
      }
    }
    .news-content {
      a {
        color: #ffff00;
      }
    }
  }
`;

export default CardVEV;
