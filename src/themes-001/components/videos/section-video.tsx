import styled from '@emotion/styled';
import { Media } from 'interface/media';
import _ from 'lodash';
import { FaPlay } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import useResponsive from 'utils/devices';
import Carousels from '../carousels';
import CardVideoV from './card-video-v';

type Props = { id: string; data: any; eventDataLayer: any; showReadMore: boolean };

const SectionVideo = ({ id, data, eventDataLayer, showReadMore }: Props) => {
  if (_.isEmpty(data)) return null;
  const MediaQuery: Media = useResponsive();

  const readMoreLabel: string = 'ดูทั้งหมด';
  const limitLists = 10;

  return (
    <>
      <EventWrapper id={id}>
        <div className='container'>
          <div className='heading-wrapper'>
            {/* -------------------------------- HEADING ------------------------------ */}
            <div className='heading'>
              <FaPlay size={14} />
              <h2>{data.title}</h2>
            </div>
            {showReadMore && (
              <a
                className='video-more'
                href={data.link}
                aria-label={readMoreLabel}
                target='_self'
                rel='noopener noreferrer'
                title={readMoreLabel}
                tabIndex={-1}
                // ! DATALAYER
                onClick={() => sendDataLayerGlobal({ ...eventDataLayer })}
              >
                {readMoreLabel}
                <FiArrowRightCircle size={14} />
              </a>
            )}
          </div>
          {/* -------------------------------- VIDEOS ------------------------------- */}
          <VideoWrapper className='video-wrapper'>
            <Carousels slideShow={MediaQuery.isMobile ? 1 : 4} autoplay={false} infinite={false}>
              {_.isArray(data?.data) &&
                data?.data.slice(0, limitLists).map((item: any, i: number) => (
                  <div key={i} className={`video-item --${i + 1}`}>
                    <CardVideoV
                      data={item}
                      // ! DATALAYER
                      eventDataLayer={{
                        ...eventDataLayer
                      }}
                    />
                  </div>
                ))}
            </Carousels>
          </VideoWrapper>
        </div>
      </EventWrapper>
    </>
  );
};

export default SectionVideo;

const VideoWrapper: any = styled.div<{
  desktop: any;
  tablet: any;
  mobile: any;
}>`
  .video-item {
    padding: 0 15px 15px 0;
  }
  .slick-dots li {
    button:before {
      height: 5px !important;
      border-radius: 20px;
    }
  }
`;

const EventWrapper: any = styled.div<{
  desktop: any;
  mobile: any;
}>`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  padding: 30px 0;

  &:nth-child(odd) {
    background-color: #ffffff;
  }
  &:nth-child(even) {
    background-color: #eff0f2;
  }

  .heading-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0 0 15px;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      border-radius: 10px;
      /* background-color: #023f87; */
      background-color: var(--primary-color);
    }
    .heading {
      display: flex;
      align-items: center;
      /* background-color: #023f87; */
      background-color: var(--primary-color);
      border-radius: 10px 10px 0 0;
      padding: 5px 10px;
      svg {
        color: #fff;
        margin-right: 10px;
      }
      h2 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        line-height: 1.45;
        font-weight: 500;
        color: #fff;
        @media (max-width: 1024px) {
          font-size: 16px;
        }
      }
    }

    .video-more {
      cursor: pointer;
      display: flex;
      width: 100px;
      justify-content: flex-end;
      align-items: flex-end;
      padding-right: 5px;

      font-size: 16px;
      line-height: 1.45;
      font-weight: 500;
      /* color: #023f87; */
      color: var(--primary-color);

      padding-right: 8px;
      transition: all 0.3s ease-in-out;
      svg {
        margin: 0 0 4px 8px;
      }
      @media (max-width: 1024px) {
        font-size: 14px;
      }
      &:hover {
        color: #838383;
      }
    }

    .live-button {
      padding: 8px 10px 0 0;
      svg path {
        fill: #fff;
        /* Copy this @keyframes block to your CSS*/
        @keyframes animate {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        &:nth-of-type(1) {
          -webkit-animation: animate 2s infinite;
          animation: animate 2s infinite;
        }
        &:nth-of-type(2) {
          -webkit-animation: animate 2s infinite;
          animation: animate 2s infinite;
          -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
        }
        &:nth-of-type(3) {
          -webkit-animation: animate 2s infinite;
          animation: animate 2s infinite;
          -webkit-animation-delay: 1s;
          animation-delay: 1s;
        }
      }
    }
  }
`;
