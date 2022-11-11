import _ from 'lodash';
import styled from '@emotion/styled';
import useResponsive from 'utils/devices';
import { useRouter } from 'next/router';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { convertDatasets, convertDatasetsLists } from 'utils/datasets';

type Props = { id: string; data: any };

const Event005 = ({ id, data }: Props) => {
  if (_.isEmpty(data)) return null;

  const image = convertDatasetsLists(data, 'รูปภาพ');
  const topic = convertDatasetsLists(data, 'ชื่อเรื่อง');
  const description = convertDatasetsLists(data, 'ข้อความ');
  const link = convertDatasetsLists(data, 'ลิงค์');
  const responsive = useResponsive();

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
    details: [
      {
        image: image[0],
        title: {
          text: topic[0],
          font: {
            desktop: '20px',
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
          text: description[0],
          font: {
            desktop: '20px',
            tablet: '38px',
            mobile: '28px'
          },
          color: {
            desktop: '#FFF',
            tablet: '#FFF',
            mobile: '#FFF'
          }
        },
        link: link[0]
      },
      {
        image: image[1],
        title: {
          text: topic[1],
          font: {
            desktop: '20px',
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
          text: description[1],
          font: {
            desktop: '20px',
            tablet: '38px',
            mobile: '28px'
          },
          color: {
            desktop: '#FFF',
            tablet: '#FFF',
            mobile: '#FFF'
          }
        },
        link: link[1]
      },
      {
        image: image[2],
        title: {
          text: topic[2],
          font: {
            desktop: '20px',
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
          text: description[2],
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
        link: link[2]
      }
    ]
  };
  const { background, position, title, details } = dataAll;
  const router: any = useRouter();

  return (
    <>
      <EventWrapper
        id={id}
        mobile={{
          position: position.mobile,
          color: {
            title: title?.color?.mobile
          },
          font: {
            title: title?.font?.mobile
          }
        }}
        tablet={{
          color: {
            title: title?.color?.tablet
          },
          font: {
            title: title?.font?.tablet
          }
        }}
        desktop={{
          position: position.desktop,
          color: {
            title: title?.color?.desktop
          },
          font: {
            title: title?.font?.desktop
          }
        }}
      >
        {responsive.isMobile ? <img className='background-event' src={background.mobile} /> : <img className='background-event' src={background.desktop} />}
        <div className='container'>
          <div className='block-1'>{!_.isEmpty(title?.text) && <div className='title'>{title?.text}</div>}</div>
          <div className='block-2'>
            {!_.isEmpty(details) &&
              details.map((el, i) => {
                return (
                  <BlockItem
                    key={i}
                    className='block-item'
                    mobile={{
                      color: { title: el?.title?.color?.mobile }
                    }}
                  >
                    <div className='image'>
                      <img src={el.image} width={400} height={400} />
                    </div>
                    <div className='title'>{el.title?.text}</div>
                    {!_.isEmpty(el?.link) ? (
                      <a
                        className='button-link'
                        href={el?.link}
                        target='_blank'
                        rel='noreferrer noopener'
                        // ! DATALAYER
                        onClick={() =>
                          sendDataLayerGlobal({
                            type: DATALAYER_TYPE.TRACK,
                            router: router?.pathname,
                            section: el.title?.text,
                            data: {
                              title: el?.link,
                              heading: el.description?.text
                            }
                          })
                        }
                      >
                        <span>{el.description?.text}</span>
                      </a>
                    ) : (
                      <div className='description'>{el.description?.text}</div>
                    )}
                  </BlockItem>
                );
              })}
          </div>
        </div>
      </EventWrapper>
    </>
  );
};

export default Event005;

const BlockItem: any = styled.div<{
  desktop: any;
  tablet: any;
  mobile: any;
}>`
  &.block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin: auto;
    .title {
      display: block;
      text-align: center;
      font-weight: 400;

      color: ${({ desktop }) => (desktop?.color?.title ? `${desktop?.color?.title}` : '#fff')};
      font-size: ${({ desktop }) => (desktop?.font?.title ? `${desktop?.font?.title}` : '20px')};
      @media (max-width: 1024px) {
        color: ${({ tablet }) => (tablet?.color?.title ? `${tablet?.color?.title}` : '#fff')};
        font-size: ${({ tablet }) => (tablet?.font?.title ? `${tablet?.font?.title}` : '18px')};
      }
      @media (max-width: 767px) {
        color: ${({ mobile }) => (mobile?.color?.title ? `${mobile?.color?.title}` : '#fff')};
        font-size: ${({ mobile }) => (mobile?.font?.title ? `${mobile?.font?.title}` : '16px')};
      }
    }
    .button-link {
      cursor: pointer;
      &:hover {
        span {
          color: #ffffffa1;
        }
      }
    }

    .description,
    .button-link span {
      display: block;
      text-align: center;
      font-weight: 900;
      padding: 5px 0;

      color: ${({ desktop }) => (desktop?.color?.title ? `${desktop?.color?.title}` : '#ec532b')};
      font-size: ${({ desktop }) => (desktop?.font?.title ? `${desktop?.font?.title}` : '24px')};
      @media (max-width: 1024px) {
        color: ${({ tablet }) => (tablet?.color?.title ? `${tablet?.color?.title}` : '#ec532b')};
        font-size: ${({ tablet }) => (tablet?.font?.title ? `${tablet?.font?.title}` : '22px')};
      }
      @media (max-width: 767px) {
        color: ${({ mobile }) => (mobile?.color?.title ? `${mobile?.color?.title}` : '')};
        font-size: ${({ mobile }) => (mobile?.font?.title ? `${mobile?.font?.title}` : '20px')};
      }
    }
    .image img {
      display: block;
      width: 100%;
      max-width: 100%;
      object-fit: contain;

      margin: 0 auto;
      padding: 15px 0;
      @media (max-width: 1024px) {
        width: 300px;
        height: 300px;
      }
    }
  }
`;

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
    position: relative;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
    @media (max-width: 1024px) {
      height: 0;
    }
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    transform: translate(-50%, -50%);

    @media (max-width: 1024px) {
      position: relative;
      transform: translate(-50%, 0%);
      padding: 60px 15px;
    }

    @media (max-width: 767px) {
      position: relative;
      top: 0;
      bottom: 0;
      left: 0;
      transform: translate(0%, 0%);
      padding: 30px 15px;
    }
  }

  /* --------------------------------- BLOCK-1 -------------------------------- */

  .block-1 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  /* --------------------------------- BLOCK-2 -------------------------------- */

  .block-2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    @media (max-width: 1024px) {
      justify-content: space-around;
    }
    @media (max-width: 767px) {
      display: block;
    }
  }

  .title {
    display: block;
    text-align: start;
    font-weight: 900;
    line-height: 1.45;
    filter: drop-shadow(0px 1px 1px black);

    color: ${({ desktop }) => (desktop?.color?.title ? `${desktop?.color?.title}` : '#fff')};
    font-size: ${({ desktop }) => (desktop?.font?.title ? `${desktop?.font?.title}` : '70px')};
    @media (max-width: 1024px) {
      color: ${({ tablet }) => (tablet?.color?.title ? `${tablet?.color?.title}` : '#fff')};
      font-size: ${({ tablet }) => (tablet?.font?.title ? `${tablet?.font?.title}` : '48px')};
    }
    @media (max-width: 767px) {
      color: ${({ mobile }) => (mobile?.color?.title ? `${mobile?.color?.title}` : '#fff')};
      font-size: ${({ mobile }) => (mobile?.font?.title ? `${mobile?.font?.title}` : '38px')};
    }
  }
`;
