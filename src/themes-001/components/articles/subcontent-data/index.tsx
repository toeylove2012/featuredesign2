import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import CardH from 'themes-001/components/cards/card-h';
import { IMAGE_SIZE } from 'themes-001/components/cards/image';
import styled from '@emotion/styled';
import useResponsive from 'utils/devices';
import { Media } from 'interface/media';
import CardV from 'themes-001/components/cards/card-v';

const SectionHeader = dynamic(import('themes-001/components/sections/section-header'));

type Props = {
  navSubMenu?: any;
};
const SubDataContnet = ({ navSubMenu }: Props) => {
  const responsive: Media = useResponsive();

  return (
    <>
      {!_.isEmpty(navSubMenu) && (
        <CategoryWrapper className='catsub--data'>
          {responsive.isLaptop && (
            <>
              {navSubMenu[0]?.sub?.slice(0, 4).map((item: any, i: any) => (
                <Fragment key={i}>
                  <div className={`catsub--slot --block-${i + 1} --desktop`}>
                    <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' style='default' />
                    {i === 1 ? (
                      <>
                        {!_.isEmpty(item.data) && (
                          <div className='card-list'>
                            {item.data.slice(0, 2).map((element: any, index: any) => (
                              <div className={`card-item --item-${index + 1}`} key={index}>
                                <CardH size={IMAGE_SIZE.MD} data={element} showBlurb={false} showBadge={false} showByline={true} showPublishDate={true} showCountView={false} showFooter={false} />
                              </div>
                            ))}
                            <div className='load-more'>
                              <a href={`${item?.link}`}>
                                <p>ดูเพิ่มเติม</p>
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {!_.isEmpty(item.data) && (
                          <div className='card-list'>
                            {item.data.slice(0, 5).map((element: any, index: any) => (
                              <div className={`card-item --item-${index + 1}`} key={index}>
                                <CardV size={IMAGE_SIZE.MD} data={element} showBlurb={false} showBadge={false} showByline={true} showPublishDate={true} showCountView={false} showFooter={false} />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Fragment>
              ))}
            </>
          )}
          {responsive.isMobile && (
            <>
              {navSubMenu[0]?.sub?.slice(0, 4).map((item: any, i: any) => (
                <Fragment key={i}>
                  <div className={`catsub--slot --block-${i + 1} --mobile`}>
                    <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' style='default' />
                    {i === 1 ? (
                      <>
                        {!_.isEmpty(item.data) && (
                          <div className='card-list'>
                            {item.data.slice(0, 2).map((element: any, index: any) => (
                              <div className={`card-item --item-${index + 1}`} key={index}>
                                <CardV size={IMAGE_SIZE.MD} data={element} showBlurb={false} showBadge={false} showByline={true} showPublishDate={true} showCountView={false} showFooter={false} />
                              </div>
                            ))}
                            <div className='load-more'>
                              <a href={`${item?.link}`}>
                                <p>ดูเพิ่มเติม</p>
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {!_.isEmpty(item.data) && (
                          <div className='card-list'>
                            {item.data.slice(0, 3).map((element: any, index: any) => (
                              <>
                                {index === 0 ? (
                                  <div className={`card-item --item-${index + 1}`} key={index}>
                                    <CardV size={IMAGE_SIZE.MD} data={element} showBlurb={false} showBadge={false} showByline={true} showPublishDate={true} showCountView={false} showFooter={false} />
                                  </div>
                                ) : (
                                  <div className={`card-item --item-${index + 1}`} key={index}>
                                    <CardH size={IMAGE_SIZE.MD} data={element} showBlurb={false} showBadge={false} showByline={true} showPublishDate={true} showCountView={false} showFooter={true} />
                                  </div>
                                )}
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Fragment>
              ))}
            </>
          )}
        </CategoryWrapper>
      )}
    </>
  );
};

export default SubDataContnet;

const CategoryWrapper = styled.div`
  .load-more {
    grid-area: load-more;
    background-color: var(--secondary-color);
    p {
      color: var(--text-color);
      text-align: center;
      padding: 8px 0;
    }
  }
  &.catsub--data {
    padding-top: 30px;
    .card-item {
      &.--item-1 {
        grid-area: --item-1;
      }
      &.--item-2 {
        grid-area: --item-2;
      }
      &.--item-3 {
        grid-area: --item-3;
      }
      &.--item-4 {
        grid-area: --item-4;
      }
      &.--item-5 {
        grid-area: --item-5;
        @media (max-width: 690px) {
          display: none;
        }
      }
    }
    .catsub--slot {
      position: relative;
      .carousel-wrapper {
        overflow: hidden;
      }
      &.--mobile {
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            '--item-1'
            '--item-2'
            '--item-3';
          grid-gap: 10px;
        }
      }
      &.--desktop {
        &.--block-1,
        &.--block-3,
        &.--block-4 {
          .card-item {
            &:nth-child(1) {
              .card-image {
                padding-top: 44%;
                background-position: top;
              }
            }
            &:nth-child(2) {
              .card-image {
                padding-top: 90%;
              }
            }
          }
        }
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            '--item-1 --item-1 --item-2'
            '--item-3 --item-4 --item-5';
          grid-gap: 20px;
          @media (max-width: 690px) {
            grid-template-columns: 1fr;
            grid-gap: 10px;
          }
        }
      }
      &.--block-1,
      &.--block-3,
      &.--block-4 {
        padding: 30px 0;
        border-top: 2px solid #aaa;
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          width: 350px;
          max-width: 100%;
          height: 2px;
          background-color: var(--secondary-color);
          @media (max-width: 690px) {
            width: 150px;
          }
        }
      }
      &.--block-2 {
        padding: 30px 0;
        border-top: 2px solid #aaa;
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          width: 350px;
          max-width: 100%;
          height: 2px;
          background-color: var(--secondary-color);
          @media (max-width: 690px) {
            width: 150px;
          }
        }
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            '--item-1 --item-2'
            'load-more load-more';
          grid-gap: 20px;
        }
      }
    }
  }
`;
