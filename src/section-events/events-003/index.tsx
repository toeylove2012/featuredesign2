import styled from '@emotion/styled';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { convertDatasets } from 'utils/datasets';
import useResponsive from 'utils/devices';

type Props = { id: string; data: any };

const Event003 = ({ id, data }: Props) => {
  if (_.isEmpty(data)) return null;
  const design = {
    desktop: {
      background: convertDatasets(data, 'background-desktop', true),
      position: {
        areas: convertDatasets(data, 'desktop-areas', true),
        rows: convertDatasets(data, 'desktop-rows', true),
        columns: convertDatasets(data, 'desktop-columns', true)
      },
      color: {
        title: convertDatasets(data, 'สีตัวอักษร', true),
        description: convertDatasets(data, 'สีตัวอักษร', true),
        topic: '#ec532b',
        text: '#fff'
      },
      font: {
        title: '68px',
        description: '28px',
        button: '20px',
        topic: '28px',
        text: '20px'
      }
    },
    tablet: {
      color: {
        title: convertDatasets(data, 'สีตัวอักษร', true),
        description: convertDatasets(data, 'สีตัวอักษร', true),
        topic: '#ec532b',
        text: '#fff'
      },
      font: {
        title: '38px',
        description: '20px',
        button: '16px',
        topic: '24px',
        text: '16px'
      }
    },
    mobile: {
      background: convertDatasets(data, 'background-mobile', true),
      position: {
        areas: convertDatasets(data, 'mobile-areas', true),
        rows: convertDatasets(data, 'mobile-rows', true),
        columns: convertDatasets(data, 'mobile-columns', true)
      },
      color: {
        title: convertDatasets(data, 'สีตัวอักษร', true),
        description: convertDatasets(data, 'สีตัวอักษร', true),
        topic: '#ec532b',
        text: '#fff'
      },
      font: {
        title: '38px',
        description: '16px',
        button: '12px',
        topic: '20px',
        text: '14px'
      }
    }
  };
  const dataAll = {
    block1: {
      image: {
        link: convertDatasets(data, 'รูปภาพด้านซ้าย', true),
        width: '100%',
        height: '100%'
      },
      logo: {
        link: convertDatasets(data, 'โลโก้ด้านซ้าย', true),
        width: 200,
        height: 100
      },
      button: {
        text: '',
        link: ''
      },
      title: convertDatasets(data, 'หัวข้อด้านซ้าย', true),
      description: convertDatasets(data, 'รายละเอียดด้านซ้าย', true),
      details: !_.isEmpty(convertDatasets(data, 'หัวข้อย่อย-1', true))
        ? [
            {
              title: convertDatasets(data, 'หัวข้อย่อย-1', true),
              description: convertDatasets(data, 'รายละเอียด-1', true)
            },
            {
              title: convertDatasets(data, 'หัวข้อย่อย-2', true),
              description: convertDatasets(data, 'รายละเอียด-2', true)
            }
          ]
        : []
    },
    block2: {
      image: {
        link: convertDatasets(data, 'รูปภาพด้านขวา', true),
        width: '100%',
        height: '100%'
      },
      logo: {
        link: convertDatasets(data, 'โลโก้ด้านขวา', true),
        width: 200,
        height: 100
      },
      button: {
        text: convertDatasets(data, 'ชื่อปุ่มด้านขวา', true),
        link: convertDatasets(data, 'ลิงค์ปุ่มด้านขวา', true)
      },
      title: convertDatasets(data, 'หัวข้อด้านขวา', true),
      description: convertDatasets(data, 'รายละเอียดด้านขวา', true),
      details: !_.isEmpty(convertDatasets(data, 'หัวข้อย่อย-1', true))
        ? [
            {
              title: convertDatasets(data, 'หัวข้อย่อย-1', true),
              description: convertDatasets(data, 'รายละเอียด-1', true)
            },
            {
              title: convertDatasets(data, 'หัวข้อย่อย-2', true),
              description: convertDatasets(data, 'รายละเอียด-2', true)
            }
          ]
        : []
    }
  };
  const responsive = useResponsive();
  const { desktop, mobile, tablet } = design;
  const { block1, block2 } = dataAll;
  const router: any = useRouter();

  return (
    <>
      <EventWrapper
        id={id}
        mobile={{
          position: mobile.position,
          color: mobile.color,
          font: mobile.font
        }}
        tablet={{
          color: tablet.color,
          font: tablet.font
        }}
        desktop={{
          position: desktop.position,
          color: desktop.color,
          font: desktop.font
        }}
      >
        {responsive.isMobile ? <img className='background-event' src={mobile.background} /> : <img className='background-event' src={desktop.background} />}
        <div className='container'>
          {/* --------------------------------- BLOCK-1 -------------------------------- */}
          <div className='block-1'>
            {!_.isEmpty(block1?.image?.link) ? (
              <div className='image-wrapper'>
                <img src={block1?.image?.link} width={block1?.image?.width} height={block1?.image?.height} />
              </div>
            ) : (
              <>
                {!_.isEmpty(block1?.logo?.link) && (
                  <div className='image-logo'>
                    <img src={block1?.logo?.link} width={block1?.logo?.width} height={block1?.logo?.height} />
                  </div>
                )}
                {!_.isEmpty(block1?.title) && <div className='title'>{block1?.title}</div>}
                {!_.isEmpty(block1?.description) && <div className='description'>{block1?.description}</div>}
                {!_.isEmpty(block1?.details) &&
                  block1?.details.map((el, i) => (
                    <div key={i} className='details'>
                      <div className='topic'>{el.title}</div>
                      <div className='text'>{el.description}</div>
                    </div>
                  ))}
              </>
            )}
          </div>
          {/* --------------------------------- BLOCK-2 -------------------------------- */}
          <div className='block-2'>
            {!_.isEmpty(block2?.image?.link) ? (
              <div className='image-wrapper'>
                <img src={block2?.image?.link} width={block2?.image?.width} height={block2?.image?.height} />
              </div>
            ) : (
              <>
                {!_.isEmpty(block2?.logo?.link) && (
                  <div className='image-logo'>
                    <img src={block2?.logo?.link} width={block2?.logo?.width} height={block2?.logo?.height} />
                  </div>
                )}
                {!_.isEmpty(block2?.title) && <div className='title'>{block2?.title}</div>}
                {!_.isEmpty(block2?.description) && <div className='description'>{block2?.description}</div>}
                {!_.isEmpty(block2?.button?.link) && (
                  <a
                    className='button-link'
                    href={block2?.button?.link}
                    target='_blank'
                    rel='noreferrer noopener'
                    // ! DATALAYER
                    onClick={() =>
                      sendDataLayerGlobal({
                        type: DATALAYER_TYPE.TRACK,
                        router: router?.pathname,
                        section: block2?.title,
                        data: {
                          title: block2?.button?.link,
                          heading: block2?.button?.text
                        }
                      })
                    }
                  >
                    <span>{block2?.button?.text}</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </EventWrapper>
    </>
  );
};

export default Event003;
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
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    object-fit: cover;
    transform: translate(-50%, -50%);

    display: grid;
    padding: 30px 15px;
    grid-template-areas: ${({ desktop }) => (desktop?.position?.areas ? `${desktop?.position?.areas}` : '"block-1 block-2"')};
    grid-template-rows: ${({ desktop }) => (desktop?.position?.rows ? `${desktop?.position?.rows}` : '1fr')};
    grid-template-columns: ${({ desktop }) => (desktop?.position?.columns ? `${desktop?.position?.columns}` : '1fr 1fr')};

    @media (max-width: 767px) {
      display: flex;
      align-items: center;
      flex-direction: column;
      /* height: 100%; */
    }
    /* --------------------------------- BLOCK-1 -------------------------------- */
    .block-1 {
      grid-area: block-1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      .title {
        text-align: start;
      }
      .description {
        text-align: start;
        margin: 0;
        max-width: 80%;
        padding-top: 20px;
      }
      /* @media (max-width: 1024px) {
        .title {
          text-align: center;
        }
      } */
      @media (max-width: 767px) {
        .description {
          max-width: 100%;
        }
      }
    }
    /* --------------------------------- BLOCK-2 -------------------------------- */
    .block-2 {
      grid-area: block-2;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .image-logo img {
      display: block;
      width: 100%;
      max-width: 100%;
      object-fit: contain;

      margin: 0 auto;
      padding: 15px 0;
      @media (max-width: 767px) {
        max-width: 70%;
      }
    }
    .image-wrapper img {
      display: block;
      width: 100%;
      max-width: 100%;
      object-fit: contain;

      margin: 0 auto;
      padding: 15px 0;
    }

    .title {
      display: block;
      text-align: center;
      font-weight: bolder;
      line-height: 1.25;

      filter: drop-shadow(0px 1px 1px black);

      color: ${({ desktop }) => (desktop?.color?.title ? `${desktop?.color?.title}` : '#fff')};
      font-size: ${({ desktop }) => (desktop?.font?.title ? `${desktop?.font?.title}` : '90px')};
      @media (max-width: 1024px) {
        color: ${({ tablet }) => (tablet?.color?.title ? `${tablet?.color?.title}` : '#fff')};
        font-size: ${({ tablet }) => (tablet?.font?.title ? `${tablet?.font?.title}` : '48px')};
      }
      @media (max-width: 767px) {
        color: ${({ mobile }) => (mobile?.color?.title ? `${mobile?.color?.title}` : '#fff')};
        font-size: ${({ mobile }) => (mobile?.font?.title ? `${mobile?.font?.title}` : '38px')};
      }
    }

    .description {
      display: block;
      text-align: center;
      width: 100%;
      max-width: 70%;
      margin: 20px auto;

      filter: drop-shadow(0px 1px 1px black);
      font-weight: 300;
      line-height: 1.45;

      font-size: ${({ desktop }) => (desktop?.font?.description ? `${desktop?.font?.description}` : '28px')};
      color: ${({ desktop }) => (desktop?.color?.description ? `${desktop?.color?.description}` : '#fff')};
      @media (max-width: 1024px) {
        font-size: ${({ tablet }) => (tablet?.font?.description ? `${tablet?.font?.description}` : '18px')};
        color: ${({ tablet }) => (tablet?.color?.description ? `${tablet?.color?.description}` : '#fff')};
      }
      @media (max-width: 767px) {
        font-size: ${({ mobile }) => (mobile?.font?.description ? `${mobile?.font?.description}` : '12px')};
        color: ${({ mobile }) => (mobile?.color?.description ? `${mobile?.color?.description}` : '#fff')};
      }
    }

    .details {
      .topic {
        display: block;
        text-align: start;
        font-weight: bolder;
        line-height: 1;
        padding: 40px 0 0;

        filter: drop-shadow(0px 2px 2px black);

        font-size: ${({ desktop }) => (desktop?.font?.topic ? `${desktop?.font?.topic}` : '28px')};
        color: ${({ desktop }) => (desktop?.color?.topic ? `${desktop?.color?.topic}` : '#ec532b')};

        @media (max-width: 1024px) {
          font-size: ${({ tablet }) => (tablet?.font?.topic ? `${tablet?.font?.topic}` : '18px')};
          color: ${({ tablet }) => (tablet?.color?.topic ? `${tablet?.color?.topic}` : '#ec532b')};
        }
        @media (max-width: 767px) {
          color: ${({ mobile }) => (mobile?.color?.topic ? `${mobile?.color?.topic}` : '16px')};
          font-size: ${({ mobile }) => (mobile?.font?.topic ? `${mobile?.font?.topic}` : '#ec532b')};
        }
      }
      .text {
        display: block;
        text-align: start;
        font-weight: 400;
        line-height: 1;
        padding: 15px 0 20px;
        filter: drop-shadow(0px 2px 2px black);

        font-size: ${({ desktop }) => (desktop?.font?.text ? `${desktop?.font?.text}` : '32px')};
        color: ${({ desktop }) => (desktop?.color?.text ? `${desktop?.color?.text}` : 'fff')};

        @media (max-width: 1024px) {
          font-size: ${({ tablet }) => (tablet?.font?.text ? `${tablet?.font?.text}` : '20px')};
          color: ${({ tablet }) => (tablet?.color?.text ? `${tablet?.color?.text}` : '#fff')};
        }
        @media (max-width: 767px) {
          color: ${({ mobile }) => (mobile?.color?.text ? `${mobile?.color?.text}` : '12px')};
          font-size: ${({ mobile }) => (mobile?.font?.text ? `${mobile?.font?.text}` : '#fff')};
        }
      }
    }

    .button-link {
      cursor: pointer;
      display: block;
      text-align: center;
      max-width: 100%;
      width: 180px;
      padding: 8px;
      border: 2px solid #ec532b;
      margin: auto;
      font-weight: 700;
      letter-spacing: 1.25px;

      margin: 20px auto;

      @media (max-width: 767px) {
        margin: 0 auto 15px;
        width: 100px;
        padding: 5px;
      }

      span {
        color: #fff;
        font-size: ${({ desktop }) => (desktop?.font?.button ? `${desktop?.font?.button}` : '32px')};

        @media (max-width: 1024px) {
          font-size: ${({ tablet }) => (tablet?.font?.button ? `${tablet?.font?.button}` : '20px')};
        }
        @media (max-width: 767px) {
          font-size: ${({ mobile }) => (mobile?.font?.button ? `${mobile?.font?.button}` : '12px')};
        }
      }
      &:hover {
        background: rgba(236, 83, 43, 0.8);
      }
    }
  }
`;
