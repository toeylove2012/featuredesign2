import { NextPage } from 'next';
import styled from '@emotion/styled';
import _ from 'lodash';

import { IDataVideo } from 'interface/section';
import { IMAGE_DEFAULT } from 'constants/layout';

type Props = {
  data?: IDataVideo;
};
const CardVideoFull: NextPage<Props> = ({ data }): any => {
  if (_.isEmpty(data)) return;
  return (
    <>
      <CardWrapper className='card-wrapper'>
        <div className='resolution-image'>
          {data?.type_video && data?.video_src && <div className='play-card-live' />}
          <img src={data?.image || `${IMAGE_DEFAULT}`} width='100%' height='100%' alt='card-wrapper' title={data?.title || 'image'} loading='lazy' />
        </div>
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  display: block;
  margin-bottom: 17px;

  .resolution-image {
    position: relative;
    overflow: hidden;
    background: #fefefe;
    border-radius: 15px;

    &::before {
      display: block;
      content: '';
      padding-top: 56.25% !important;
    }
    .play-card-live {
      z-index: 1;
      position: absolute;
      width: 0;
      height: 0;
      border-top: 20px solid transparent;
      border-left: 40px solid rgba(255, 255, 255, 0.9);
      border-bottom: 20px solid transparent;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      filter: drop-shadow(2px 2px 2px #000);
    }

    img,
    iframe {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    .detail-published {
      position: absolute;
      width: 100%;
      z-index: 2px;
      padding: 5px;
      margin: 0px;
      left: 0;
      bottom: -3px;
      font-size: 10px !important;
      color: #ffffff !important;
      background: rgba(27, 27, 27, 0.8);
    }
  }
`;
export default CardVideoFull;
