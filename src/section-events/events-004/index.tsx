import _ from 'lodash';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { convertDatasets } from 'utils/datasets';
import useResponsive from 'utils/devices';

type Props = { id: string; data: any };

const Event004 = ({ id, data }: Props) => {
  if (_.isEmpty(data)) return null;

  const dataAll = {
    background: {
      desktop: convertDatasets(data, 'background-desktop', true),
      mobile: convertDatasets(data, 'background-mobile', true)
    },
    position: {
      desktop: {
        areas: convertDatasets(data, 'desktop-areas', true),
        rows: convertDatasets(data, 'desktop-rows', true),
        columns: convertDatasets(data, 'desktop-columns', true)
      },
      mobile: {
        areas: convertDatasets(data, 'mobile-areas', true),
        rows: convertDatasets(data, 'mobile-rows', true),
        columns: convertDatasets(data, 'mobile-columns', true)
      }
    },
    title: {
      text: convertDatasets(data, 'หัวข้อ', true),
      font: {
        desktop: '68px',
        tablet: '38px',
        mobile: '28px'
      },
      color: {
        desktop: '#FFF',
        tablet: '#FFF',
        mobile: '#FFF'
      }
    },
    description: {
      text: convertDatasets(data, 'รายละเอียด', true),
      font: {
        desktop: '20px',
        tablet: '18px',
        mobile: '16px'
      },
      color: {
        desktop: '#FFF',
        tablet: '#FFF',
        mobile: '#FFF'
      }
    },
    image: {
      link: convertDatasets(data, 'รูปภาพ', true),
      width: '100%',
      height: '100%'
    },
    video: {
      link: convertDatasets(data, 'วิดีโอ', true),
      width: '1000px',
      height: '600px'
    }
  };
  const responsive = useResponsive();
  const { background, position, title, description, image, video } = dataAll;
  return (
    <>
      <EventWrapper
        id={id}
        mobile={{
          position: position.mobile,
          color: {
            title: title?.color?.mobile,
            description: description?.color?.mobile
          },
          font: {
            title: title?.font?.mobile,
            description: description?.font?.mobile
          }
        }}
        tablet={{
          color: {
            title: title?.color?.tablet,
            description: description?.color?.tablet
          },
          font: {
            title: title?.font?.tablet,
            description: description?.font?.tablet
          }
        }}
        desktop={{
          position: position.desktop,
          color: {
            title: title?.color?.desktop,
            description: description?.color?.desktop
          },
          font: {
            title: title?.font?.desktop,
            description: description?.font?.desktop
          }
        }}
      >
        {responsive.isMobile ? <img className='background-event' src={background.mobile} /> : <img className='background-event' src={background.desktop} />}
        <div className='container'>
          <div className='block-1'>{!_.isEmpty(title?.text) && <div className='title'>{title?.text}</div>}</div>
          <div className='block-2'>{!_.isEmpty(description?.text) && <div className='description'>{description?.text}</div>}</div>
          <div className='block-3'>
            {!_.isEmpty(image?.link) && (
              <div className='image'>
                <img src={image?.link} width={image?.width} height={image?.height} />
              </div>
            )}
            {!_.isEmpty(video?.link) && (
              <div className='video'>
                <ReactPlayer url={video?.link} width={video?.width} height={video?.height} />
              </div>
            )}
          </div>
        </div>
      </EventWrapper>
    </>
  );
};

export default Event004;
const EventWrapper: any = styled.div<{
  desktop: any;
  tablet: any;
  mobile: any;
}>`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;

  .background-event {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
  }
  .container {
    position: relative;
    display: grid;
    padding: 50px 15px;
    grid-template-areas: ${({ desktop }) => (desktop?.position?.areas ? `${desktop?.position?.areas}` : '"block-1 block-2" "block-3 block-3"')};
    grid-template-rows: ${({ desktop }) => (desktop?.position?.rows ? `${desktop?.position?.rows}` : '1fr 2fr')};
    grid-template-columns: ${({ desktop }) => (desktop?.position?.columns ? `${desktop?.position?.columns}` : '1fr 1fr')};

    @media (max-width: 767px) {
      grid-template-areas: ${({ mobile }) => (mobile?.position?.areas ? `${mobile?.position?.areas}` : '"block-1 block-2" "block-3 block-3"')};
      grid-template-rows: ${({ mobile }) => (mobile?.position?.rows ? `${mobile?.position?.rows}` : '1fr 2fr')};
      grid-template-columns: ${({ mobile }) => (mobile?.position?.columns ? `${mobile?.position?.columns}` : '1fr 1fr')};
    }
    /* --------------------------------- BLOCK-1 -------------------------------- */
    .block-1 {
      grid-area: block-1;
      display: flex;
      justify-content: start;
      align-items: center;
      @media (max-width: 767px) {
        justify-content: center;
      }
    }
    /* --------------------------------- BLOCK-2 -------------------------------- */
    .block-2 {
      grid-area: block-2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* --------------------------------- BLOCK-3 -------------------------------- */
    .block-3 {
      grid-area: block-3;
      display: flex;
      justify-content: center;
      align-items: center;
      .video > div {
        max-width: 100%;
        width: 100%;
      }
      .video {
        padding: 15px;
        iframe {
          max-width: 100%;
          margin: auto;
          width: 100%;
          display: block;
        }
      }
      @media (max-width: 1024px) {
        .video > div {
          width: 700px !important;
          height: 400px !important;
          margin: auto;
        }
        .video {
          padding: 0px;
          iframe {
            max-width: 100%;
            margin: auto;
            width: 100%;
            display: block;
          }
        }
      }
      @media (max-width: 767px) {
        .video > div {
          max-width: 100% !important;
          width: 100% !important;
          height: 320px !important;
        }
        .video {
          padding: 0px;
          iframe {
            max-width: 100%;
            margin: auto;
            width: 100%;
            display: block;
          }
        }
      }
    }
  }

  .image img {
    display: block;
    margin: auto;
  }

  .title {
    display: block;
    text-align: start;
    font-weight: 900;
    line-height: 1.45;
    color: #fff;

    filter: drop-shadow(0px 1px 1px black);

    font-size: ${({ desktop }) => (desktop?.font?.title ? `${desktop?.font?.title}` : '70px')};
    @media (max-width: 1024px) {
      font-size: ${({ tablet }) => (tablet?.font?.title ? `${tablet?.font?.title}` : '48px')};
    }
    @media (max-width: 767px) {
      font-size: ${({ mobile }) => (mobile?.font?.title ? `${mobile?.font?.title}` : '38px')};
    }
  }

  .description {
    font-weight: 400;
    line-height: 1.65;
    color: #fff;
    max-width: 90%;
    margin: 15px auto;
    text-align: start;
    filter: drop-shadow(0px 1px 1px black);

    font-size: ${({ desktop }) => (desktop?.font?.description ? `${desktop?.font?.description}` : '20px')};
    @media (max-width: 1024px) {
      font-size: ${({ tablet }) => (tablet?.font?.description ? `${tablet?.font?.description}` : '18px')};
    }
    @media (max-width: 767px) {
      max-width: 100%;
      font-size: ${({ mobile }) => (mobile?.font?.description ? `${mobile?.font?.description}` : '16px')};
    }
  }
`;
