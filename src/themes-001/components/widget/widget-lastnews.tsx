import _ from 'lodash';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { IArticle } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';
import { IMAGE_SIZE } from '../cards/image';
import styled from '@emotion/styled';
import CardHNoImage from '../cards/card-h-no-img';
import CardH from '../cards/card-h';
import Carousels from '../carousels';
import useResponsive from 'utils/devices';

const SectionHeader = dynamic(import('themes-001/components/sections/section-header'));

type Props = {
  lastNews?: IArticle[];
  heading?: string;
  eventDataLayer?: IDataLayerGlobal;
  path?: string;
  external?: boolean;
  size?: any;
  showImage?: boolean;
  carousel?: boolean;
};

const WidgetNews: NextPage<Props> = ({ lastNews, heading, eventDataLayer, external = false, showImage = false, carousel = false }) => {
  if (_.isEmpty(lastNews)) return null;

  const responsive = useResponsive();
  return (
    <WidgetWrapper>
      {responsive.isLaptop && (
        <div className='desktop'>
          <SectionHeader data={heading} showReadmore={false} />
          <div className='card-list'>
            {lastNews?.map((item: any, index: any) => (
              <div key={index} className='card-item'>
                {showImage && (
                  <CardH
                    className='card-lastnews'
                    data={item}
                    path={`/galleries/${item.id}`}
                    size={IMAGE_SIZE.MD}
                    showBlurb={false}
                    external={external}
                    // ! DATALAYER
                    eventDataLayer={{
                      ...eventDataLayer,
                      data: {
                        title: item?.title,
                        index: index + 1,
                        ...eventDataLayer?.data
                      }
                    }}
                  />
                )}
                {!showImage && (
                  <CardHNoImage
                    className='card-lastnews'
                    data={item}
                    path={`/galleries/${item.id}`}
                    size={IMAGE_SIZE.MD}
                    showBlurb={false}
                    external={external}
                    // ! DATALAYER
                    eventDataLayer={{
                      ...eventDataLayer,
                      data: {
                        title: item?.title,
                        index: index + 1,
                        ...eventDataLayer?.data
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {responsive.isMobile && (
        <>
          {' '}
          <div className='mobile'>
            {carousel ? (
              <>
                <SectionHeader data={heading} showReadmore={false} className='contnet' />
                <div className='card-list'>
                  <Carousels infinite={false} showArrow={true}>
                    {lastNews?.map((item: any, index: any) => (
                      <div key={index} className='card-item'>
                        {showImage && (
                          <CardH
                            className='card-lastnews'
                            data={item}
                            path={`/galleries/${item.id}`}
                            size={IMAGE_SIZE.MD}
                            showBlurb={false}
                            external={external}
                            // ! DATALAYER
                            eventDataLayer={{
                              ...eventDataLayer,
                              data: {
                                title: item?.title,
                                index: index + 1,
                                ...eventDataLayer?.data
                              }
                            }}
                          />
                        )}
                        {!showImage && (
                          <CardHNoImage
                            className='card-lastnews'
                            data={item}
                            path={`/galleries/${item.id}`}
                            size={IMAGE_SIZE.MD}
                            showBlurb={false}
                            external={external}
                            // ! DATALAYER
                            eventDataLayer={{
                              ...eventDataLayer,
                              data: {
                                title: item?.title,
                                index: index + 1,
                                ...eventDataLayer?.data
                              }
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </Carousels>
                </div>
              </>
            ) : (
              <>
                <SectionHeader data={heading} showReadmore={false} />
                <div className='card-list'>
                  {lastNews?.map((item: any, index: any) => (
                    <div key={index} className='card-item'>
                      {showImage && (
                        <CardH
                          className='card-lastnews'
                          data={item}
                          path={`/galleries/${item.id}`}
                          size={IMAGE_SIZE.MD}
                          showBlurb={false}
                          external={external}
                          // ! DATALAYER
                          eventDataLayer={{
                            ...eventDataLayer,
                            data: {
                              title: item?.title,
                              index: index + 1,
                              ...eventDataLayer?.data
                            }
                          }}
                        />
                      )}
                      {!showImage && (
                        <CardHNoImage
                          className='card-lastnews'
                          data={item}
                          path={`/galleries/${item.id}`}
                          size={IMAGE_SIZE.MD}
                          showBlurb={false}
                          external={external}
                          // ! DATALAYER
                          eventDataLayer={{
                            ...eventDataLayer,
                            data: {
                              title: item?.title,
                              index: index + 1,
                              ...eventDataLayer?.data
                            }
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </WidgetWrapper>
  );
};

export default WidgetNews;

const WidgetWrapper = styled.div`
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding-top: 30px;
  .card-list {
    display: grid;
    grid-gap: 20px;
    padding-top: 20px;
    @media (max-width: 690px) {
      display: block;
      .card-item {
        padding-bottom: 10px;
      }
    }
  }
  .section-header {
    margin-bottom: 0;
  }
  .card-item {
    .card-h-img {
      .header h3 {
        font-weight: 300;
        -webkit-line-clamp: 3;
      }
    }
  }
`;
