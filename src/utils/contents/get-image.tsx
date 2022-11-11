import _ from 'lodash';
import Images from 'next/image';
import Script from 'next/script';
import ReactPlayer from 'react-player';
import { ReactElement } from 'react';

import { APP_IMG } from 'constants/index';
import { IArticle } from 'interface/section';
import styled from '@emotion/styled';

export const getFeatureImage = (_data: IArticle | null): ReactElement | null => {
  if (_.isEmpty(_data)) return null;
  switch (_data?.type_video) {
    case '1':
      // TEST : /program/commercial/40014893
      // ? Type: dailymotion
      // ? refs: https://developers.dailymotion.com/player/#player-library-script-video-embed
      return (
        <ResolutionWrapper className='resolution-dailymotion'>
          <Script id='load-dailymotion' strategy='beforeInteractive' src='https://geo.dailymotion.com/libs/player/x919m.js' />

          {!_.isEmpty(_data?.video_src) ? (
            <>
              <Script id='show-player' strategy='lazyOnload'>
                {`dailymotion
                .createPlayer("dailymotion-player", {
                  video: "${_data.video_src}",
              })
              .then((player) => console.log('player', player))
              .catch((e) => console.error(e));`}
              </Script>
              <div id='dailymotion-player' />
            </>
          ) : (
            <Images src={`${APP_IMG}${_data?.image}`} title={_data?.title} alt={_data?.title || ``} priority layout='fill' quality={75} />
          )}
        </ResolutionWrapper>
      );
    case '2':
      // TEST : program/the-nation-talk/40016996
      // ? Type: youtube
      return (
        <ResolutionWrapper className='resolution-video'>
          <ReactPlayer width='100%' height='100%' loop={true} playing={true} muted={true} url={_data?.video_src || ''} />
        </ResolutionWrapper>
      );
    case '5':
      // ? Type: youtube
      return (
        <ResolutionWrapper className='resolution-video'>
          <div dangerouslySetInnerHTML={{ __html: `${_data?.video_src}` }} />
        </ResolutionWrapper>
      );

    default:
      // TEST : /life/art-culture/40017612
      return (
        <ResolutionWrapper className='resolution-image'>
          <Images src={`${APP_IMG}${_data?.image}`} title={_data?.title} alt={_data?.title || ``} priority layout='fill' quality={100} />
        </ResolutionWrapper>
      );
  }
};

const ResolutionWrapper = styled.div`
  &.resolution-video {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    &:before {
      display: block;
      content: '';
      padding-top: 56.25%;
    }
    iframe {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  &.resolution-image {
    position: relative;
    padding-top: 56.25% !important;
    overflow: hidden;
    display: block;
    img {
      position: absolute;
      object-fit: cover;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  }
`;
