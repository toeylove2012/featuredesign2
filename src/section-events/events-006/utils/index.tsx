import styled from '@emotion/styled';
import _ from 'lodash';
import ReactPlayer from 'react-player';
import CardVideoFull from 'section-events/events-006/components/card-video-full';

export const useVideoIframe = (_data: any) => {
  if (_.isEmpty(_data)) return null;

  switch (_data?.type_video) {
    case '1': // dailymotion
      return (
        <>
          <ResolutionWrapper
            id={`dailymotion-${_data?.video_src}`}
            className='resolution-dailymotion'
            dangerouslySetInnerHTML={{
              __html: `
                <script
                type='text/javascript'
                src='https://geo.dailymotion.com/player/${_data?.video_src}.js'
                data-video=${_data?.video_src}
                ></script>`
            }}
          />
        </>
      );
    case '2':
    case '3': // youtube
      return (
        <ResolutionWrapper className='resolution-video'>
          <ReactPlayer width='100%' height='100%' loop={true} playing={false} muted={true} url={`${_data?.video_src}`} />
        </ResolutionWrapper>
      );
    case '4':
      return (
        <ResolutionWrapper className='resolution-video'>
          <div
            dangerouslySetInnerHTML={{
              __html: _data?.video_src
            }}
          />
        </ResolutionWrapper>
      );
    default: // default
      return (
        <ResolutionWrapper className='resolution-video'>
          <CardVideoFull data={_data} />
        </ResolutionWrapper>
      );
  }
};

const ResolutionWrapper = styled.div`
  &.resolution-dailymotion {
    position: relative;
    &:before {
      content: '';
      background-color: #f1f1f1;
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 380px;
      @media (max-width: 1024px) {
        min-height: 270px;
      }
      @media (max-width: 767px) {
        min-height: 190px;
      }
      @media (max-width: 380px) {
        min-height: 160px;
      }
    }

    .dailymotion-player-root {
      background-color: #e4e4e4;
      border-radius: 10px;
    }
    iframe {
      border-radius: 10px;
      display: block;
      position: relative;
      margin: auto;
      width: 100%;
    }
  }

  &.resolution-video {
    & > div {
      width: 100%;
      height: 100%;
      position: relative;
      padding-top: 52.25%;
      border-radius: 10px;
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  &.resolution-image {
    position: relative;
    padding-top: 0;
    overflow: hidden;
  }
`;

export default useVideoIframe;
