import styled from '@emotion/styled';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import CardVideoH from './components/card-video-h';
import useVideoIframe from './utils';

// ? HOW TO USE
//  <SectionVideo
//    id='section-video'
//    data={sectionVideo}
//    showReadMore={true}
//    // ! DATALAYER
//    eventDataLayer={{
//      type: DATALAYER_TYPE.TRACK_POSITION,
//      router: router?.pathname,
//      section: '',
//      position: ''
//    }}
//  />;

type Props = { id: string; data: any; eventDataLayer: any; showReadMore: boolean };
type TTagsLists = {
  title: string | null;
  link: string | null;
  data: any;
};

const Event006 = ({ id, data, eventDataLayer, showReadMore }: Props) => {
  if (_.isEmpty(data)) return null;

  const [counter, setCounter] = useState('1');
  const [active, setActive] = useState({ id: '1' });
  const [videoPlayer, setVideoPlayer] = useState(data.block1.data[0]);
  const [videoPlayLists, setVideoPlayLists] = useState(data.block1.data);

  const headingLabel = 'วิดีโอ';
  const headingPlaylistsLabel = 'Most Watched';
  const playlistsCount = `${counter} / ${videoPlayLists.length} วิดีโอ`;
  const readMoreLabel = 'ดูทั้งหมด';
  const limitLists = 10;

  const tagLists: TTagsLists[] = [{ ...data.block1 }, { ...data.block2 }, { ...data.block3 }];
  const conditionTags = (el: TTagsLists) => el?.data.length > 0 || false;

  useEffect(() => {
    setVideoPlayer({
      ...data.block1.data[0]
    });
  }, []);

  function handleTags(key: string) {
    setActive({ id: key });

    if (!_.isEmpty(data?.[`block${key}`]?.data)) {
      setVideoPlayer({ ...data[`block${key}`]?.data[0] });
      setVideoPlayLists(data[`block${key}`]?.data);
    }
  }

  function activeTags(id: string) {
    if (active.id === id) return '--active';
  }

  const settingVideo = {
    desktop: {
      position: {
        area: '"block-1 block-2"',
        rows: '1fr',
        columns: '2fr 1fr',
        gap: '15px'
      }
    },
    tablet: {
      position: {
        area: '"block-1 block-2"',
        rows: '1fr',
        columns: '2fr 1fr',
        gap: '15px'
      }
    },
    mobile: {
      position: {
        area: '"block-1" "block-2"',
        rows: '1fr',
        columns: '1fr',
        gap: '15px 0'
      }
    }
  };

  return (
    <>
      <EventWrapper id={id}>
        <div className='container'>
          <div className='heading-wrapper'>
            {/* -------------------------------- HEADING ------------------------------ */}
            <div className='heading'>
              <div className='live-button'>
                <svg x='0px' y='0px' width='20px' height='16px' viewBox='0 0 20 20'>
                  <path d='M8.5,6.8c-0.9,0-1.7,0.8-1.7,1.7c0,0.9,0.8,1.7,1.7,1.7c0.9,0,1.7-0.8,1.7-1.7C10.2,7.6,9.5,6.8,8.5,6.8z'></path>
                  <path d='M13.6,8.5c0-2.8-2.2-5.1-5-5.2c-2.8,0-5.1,2.2-5.2,5c0,0,0,0.1,0,0.1c0,1.8,1,3.5,2.6,4.4l0.9-1.4c-1.6-1-2.1-3-1.2-4.6s3-2.1,4.6-1.2c1,0.6,1.7,1.7,1.7,2.9c0,1.2-0.6,2.3-1.7,2.9l0.9,1.4C12.7,12,13.6,10.3,13.6,8.5L13.6,8.5z'></path>
                  <path d='M8.5,0C3.8,0,0,3.8,0,8.5c0,3,1.6,5.8,4.3,7.3l0.9-1.4c-3.3-1.9-4.4-6.1-2.5-9.3s6.1-4.4,9.3-2.5c2.1,1.2,3.4,3.5,3.4,5.9c0,2.4-1.3,4.7-3.4,5.9l0.9,1.4c4.1-2.3,5.5-7.5,3.1-11.6C14.4,1.6,11.6,0,8.5,0z'></path>
                </svg>
              </div>
              <h2>{headingLabel}</h2>
            </div>
            {showReadMore && (
              <a
                className='video-more'
                href='/'
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
          {/* -------------------------------- TAGS --------------------------------- */}
          {!_.isEmpty(tagLists) && (
            <TagsWrapper className='tags-wrapper'>
              {tagLists.map(
                (item: any, index: number) =>
                  // ต้องมีข่าวมากกว่า 1
                  conditionTags(item) && (
                    <div
                      key={index}
                      className={`tags-item ${activeTags(`${index + 1}`)}`}
                      onClick={() => {
                        handleTags(`${index + 1}`);
                      }}
                    >
                      <p> {item?.title} </p>
                    </div>
                  )
              )}
            </TagsWrapper>
          )}
          {/* -------------------------------- VIDEOS ------------------------------- */}
          <VideoWrapper className='video-wrapper' {...settingVideo}>
            <div className='block-1'>{!_.isEmpty(videoPlayer) && useVideoIframe(videoPlayer)}</div>
            <div className='block-2'>
              <div className='heading-play-lists'>
                <h2>{headingPlaylistsLabel}</h2>
                <span> {playlistsCount} </span>
              </div>
              <div className='video-playlists'>
                {_.isArray(videoPlayLists) &&
                  videoPlayLists.slice(0, limitLists).map((item: any, i: number) => (
                    <div
                      key={i}
                      className='video-item'
                      onClick={() => {
                        setCounter(`${i + 1}`);
                        setVideoPlayer({ ...item });
                      }}
                    >
                      <CardVideoH
                        data={item}
                        pause={`${counter}` === `${i + 1}`}
                        // ! DATALAYER
                        eventDataLayer={{
                          ...eventDataLayer
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </VideoWrapper>
        </div>
      </EventWrapper>
    </>
  );
};

export default Event006;

const TagsWrapper: any = styled.div<{}>`
  &.tags-wrapper {
    display: flex;
    width: 100%;
    max-width: 100%;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 5px;

    .tags-item {
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #023f87;
      border-radius: 5px;
      padding: 5px;
      margin: 5px;

      p {
        padding: 0 8px;
        color: #023f87;
        font-size: 14px !important;
        font-weight: 300;
      }

      &:nth-child(1) {
        margin-left: 0;
      }

      &.--active,
      &:hover {
        background-color: #023f87;
        border: 1px solid #023f87;
        p {
          color: #fff;
        }
      }
    }
  }
`;

const VideoWrapper: any = styled.div<{
  desktop: any;
  tablet: any;
  mobile: any;
}>`
  &.video-wrapper {
    position: relative;
    display: grid;

    grid-template-areas: ${({ desktop }) => (desktop?.position?.areas ? `${desktop?.position?.areas}` : '"block-1 block-2"')};
    grid-template-columns: ${({ desktop }) => (desktop?.position?.columns ? `${desktop?.position?.columns}` : '2fr 1fr')};
    grid-template-rows: ${({ desktop }) => (desktop?.position?.rows ? `${desktop?.position?.rows}` : '1fr')};
    grid-gap: ${({ desktop }) => (desktop?.position?.gap ? `${desktop?.position?.gap}` : '15px')};

    @media (max-width: 1024px) {
      grid-template-areas: ${({ tablet }) => (tablet?.position?.areas ? `${tablet?.position?.areas}` : '"block-1 block-2"')};
      grid-template-columns: ${({ tablet }) => (tablet?.position?.columns ? `${tablet?.position?.columns}` : '2fr 1fr')};
      grid-template-rows: ${({ tablet }) => (tablet?.position?.rows ? `${tablet?.position?.rows}` : '1fr')};
      grid-gap: ${({ tablet }) => (tablet?.position?.gap ? `${tablet?.position?.gap}` : '15px')};
    }

    @media (max-width: 767px) {
      grid-template-areas: ${({ mobile }) => (mobile?.position?.areas ? `${mobile?.position?.areas}` : '"block-1" "block-2"')};
      grid-template-columns: ${({ mobile }) => (mobile?.position?.columns ? `${mobile?.position?.columns}` : '1fr')};
      grid-template-rows: ${({ mobile }) => (mobile?.position?.rows ? `${mobile?.position?.rows}` : '1fr')};
      grid-gap: ${({ mobile }) => (mobile?.position?.gap ? `${mobile?.position?.gap}` : '15px 0px')};
    }
    /* --------------------------------- BLOCK-1 -------------------------------- */
    .block-1 {
      grid-area: block-1;
    }
    /* --------------------------------- BLOCK-2 -------------------------------- */
    .block-2 {
      grid-area: block-2;
    }
    .heading-play-lists {
      background-color: #023f87;
      padding: 10px;
      border-radius: 10px 10px 0 0;
      margin-bottom: 15px;
      @media (max-width: 1024px) {
        padding: 8px 10px;
      }

      h2,
      span {
        color: #fff;
      }
      h2 {
        font-size: 18px;
        line-height: 1.45;
        font-weight: 500;
        @media (max-width: 1024px) {
          font-size: 16px;
        }
      }
      span {
        font-size: 14px;
        line-height: 1.45;
        font-weight: 300;
        @media (max-width: 1024px) {
          font-size: 12px;
        }
      }
    }
    .video-playlists {
      overflow-x: hidden;
      padding-right: 5px;
      border-radius: 10px;
      height: 380px;
      @media (max-width: 1024px) {
        height: 290px;
      }
      @media (max-width: 768px) {
        height: 190px;
      }
      @media (max-width: 480px) {
        height: 290px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: #f1f1f1;
      }
      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      .video-item {
        margin-bottom: 15px;
      }
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

  .background-event {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
  }
  .heading-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0 0 5px;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      border-radius: 10px;
      background-color: #023f87;
    }
    .heading {
      display: flex;
      align-items: center;
      background-color: #023f87;
      border-radius: 10px 10px 0 0;
      padding: 5px 10px;
      /* padding-right: 15px; */
      h2 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        line-height: 1.45;
        font-weight: 500;
        color: #fff;
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
      color: #023f87;

      padding-right: 8px;
      transition: all 0.3s ease-in-out;
      svg {
        margin: 0 0 4px 8px;
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
