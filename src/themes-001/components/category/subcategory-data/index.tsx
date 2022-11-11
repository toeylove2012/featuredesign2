import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import CardH from 'themes-001/components/cards/card-h';
import { IMAGE_SIZE } from 'themes-001/components/cards/image';
import CardFull from 'themes-001/components/cards/card-full';
import CardV from 'themes-001/components/cards/card-v';
import DynamicAds, { KEY_ADS_POSITION } from 'utils/ads/dynamic-ads';
import { IAds } from 'interface/service';
import styled from '@emotion/styled';
import Carousels from 'themes-001/components/carousels';
import useResponsive from 'utils/devices';
import { Media } from 'interface/media';

const SectionHeader = dynamic(import('themes-001/components/sections/section-header'));

type Props = {
  ads?: IAds[];
  navSubMenu?: any;
};
const SubDataCategory = ({ navSubMenu, ads }: Props) => {
  const responsive: Media = useResponsive();
  return (
    <>
      {!_.isEmpty(navSubMenu) && (
        <CategoryWrapper id='section-2' className='section-2 catsub--data'>
          {navSubMenu[0]?.sub?.slice(0, 1).map((item: any, i: any) => (
            <Fragment key={i}>
              <div className={`catsub--slot block-${i + 1}`}>
                <div className='container'>
                  <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' />
                  {!_.isEmpty(item.data) && (
                    <div className='card-list'>
                      {item.data.slice(0, 3).map((element: any, index: any) => (
                        <div className='card-item' key={index}>
                          <CardH
                            color='#000'
                            size={IMAGE_SIZE.MD}
                            data={element}
                            showBlurb={false}
                            showBadge={false}
                            showByline={true}
                            showPublishDate={true}
                            showCountView={false}
                            showFooter={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------- ADS - PPN : INARTICLE_1 ------------------------- */}
            </Fragment>
          ))}
          {navSubMenu[0]?.sub?.slice(1, 2).map((item: any, i: any) => (
            <Fragment key={i}>
              <div className={`catsub--slot block-${i + 2}`}>
                <div className='container'>
                  <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' />
                  {!_.isEmpty(item.data) && (
                    <div className='card-list'>
                      {item.data.slice(0, 1).map((element: any, index: any) => (
                        <div className={`card-item --item-${index + 1}`} key={index}>
                          <CardFull data={element} showPublishDate={true} showCountView={false} showFooter={false} />
                        </div>
                      ))}
                      {item.data.slice(1, 4).map((element: any, index: any) => (
                        <div className={`card-item --item-${index + 2}`} key={index}>
                          <CardH size={IMAGE_SIZE.MD} color='#fff' showBadge={false} data={element} showByline={true} showPublishDate={true} showCountView={false} showFooter={true} />
                        </div>
                      ))}
                      {item.data.slice(4, 5).map((element: any, index: any) => (
                        <div className={`card-item --item-${index + 5}`} key={index}>
                          <CardFull data={element} showPublishDate={true} showCountView={false} showFooter={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------- ADS - PPN : INARTICLE_1 ------------------------- */}
            </Fragment>
          ))}
          {navSubMenu[0]?.sub?.slice(2, 4).map((item: any, i: any) => (
            <Fragment key={i}>
              <div className={`catsub--slot block-${i + 3}`}>
                <div className='container'>
                  <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' />
                  {!_.isEmpty(item.data) && (
                    <>
                      {responsive.isLaptop && (
                        <div className='card-list desktop'>
                          {item.data.slice(0, 3).map((element: any, index: any) => (
                            <div className='card-item' key={index}>
                              <CardV
                                size={IMAGE_SIZE.MD}
                                className={'background-transparent'}
                                data={element}
                                showBlurb={false}
                                showBadge={true}
                                showCenter={true}
                                showByline={true}
                                showPublishDate={true}
                                showCountView={true}
                                showFooter={false}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {responsive.isMobile && (
                        <div className='card-list mobile'>
                          <Carousels infinite={false} dots={true} mobileSlideShow={1} autoplay={false}>
                            {item.data.slice(0, 3).map((element: any, index: any) => (
                              <div className='card-item' key={index}>
                                <CardV
                                  size={IMAGE_SIZE.MD}
                                  className={'background-transparent'}
                                  data={element}
                                  showBlurb={false}
                                  showBadge={true}
                                  showCenter={true}
                                  showByline={true}
                                  showPublishDate={true}
                                  showCountView={true}
                                  showFooter={false}
                                />
                              </div>
                            ))}
                          </Carousels>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* -------------------------- ADS - PPN : INARTICLE_1 ------------------------- */}
            </Fragment>
          ))}
          {navSubMenu[0]?.sub?.slice(4, 5).map((item: any, i: any) => (
            <Fragment key={i}>
              <div className={`catsub--slot block-${i + 5}`}>
                <div className='container'>
                  <SectionHeader fontColor='#fff' bgColor='#2B2B2B' data={item?.nameTh} link={item?.link} className='sub-menu' />
                  {!_.isEmpty(item.data) && (
                    <div className='card-list'>
                      {item.data.slice(0, 2).map((element: any, index: any) => (
                        <div className={`card-item --item-${index + 1}`} key={index}>
                          <CardFull data={element} showPublishDate={true} showCountView={false} showFooter={false} />
                        </div>
                      ))}
                      {item.data.slice(2, 5).map((element: any, index: any) => (
                        <div className={`card-item --item-${index + 3}`} key={index}>
                          <CardH size={IMAGE_SIZE.MD} color='#fff' showBadge={false} data={element} showByline={true} showPublishDate={true} showCountView={false} showFooter={true} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------- ADS - PPN : INARTICLE_1 ------------------------- */}
            </Fragment>
          ))}
          {navSubMenu[0]?.sub?.slice(5, 6).map((item: any, i: any) => (
            <Fragment key={i}>
              <div className={`catsub--slot block-${i + 6}`}>
                <div className='container'>
                  <SectionHeader data={item?.nameTh} link={item?.link} className='sub-menu' />
                  {!_.isEmpty(item.data) && (
                    <div className='card-list'>
                      {item.data.slice(0, 3).map((element: any, index: any) => (
                        <div className='card-item' key={index}>
                          <CardH
                            color='#fff'
                            size={IMAGE_SIZE.MD}
                            data={element}
                            showBlurb={false}
                            showBadge={false}
                            showByline={true}
                            showPublishDate={true}
                            showCountView={false}
                            showFooter={true}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------- ADS - PPN : INARTICLE_1 ------------------------- */}
            </Fragment>
          ))}
          {!_.isEmpty(ads) && <DynamicAds position={KEY_ADS_POSITION.INARTICLE_1} data={ads} />}
        </CategoryWrapper>
      )}
    </>
  );
};

export default SubDataCategory;

const CategoryWrapper = styled.div`
  &.section-2 {
    /* padding: 30px; */
    &.catsub--data {
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
      .block-1,
      .block-6 {
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px;
          @media (max-width: 690px) {
            grid-template-columns: 1fr;
            grid-gap: 10px;
          }
        }
      }
      .block-2 {
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            '--item-1 --item-2 --item-5'
            '--item-1 --item-3 --item-5'
            '--item-1 --item-4 --item-5';
          grid-gap: 20px;
          @media (max-width: 690px) {
            grid-template-columns: 1fr;
            grid-gap: 10px;
            grid-template-areas:
              '--item-1 --item-1 --item-1'
              '--item-2 --item-2 --item-2'
              '--item-3 --item-3 --item-3'
              '--item-4 --item-4 --item-4'
              '--item-5 --item-5 --item-5';
          }
        }
      }
      .block-3,
      .block-4,
      .block-5 {
        .card-list {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px;
          @media (max-width: 690px) {
            grid-template-columns: 1fr;
            grid-gap: 10px;
          }
        }
      }
      .block-5 {
        .card-list {
          grid-template-areas:
            '--item-1 --item-2 --item-3'
            '--item-1 --item-2 --item-4'
            '--item-1 --item-2 --item-5';
          @media (max-width: 690px) {
            grid-template-areas:
              '--item-1 --item-1 --item-1'
              '--item-2 --item-2 --item-2'
              '--item-3 --item-3 --item-3'
              '--item-4 --item-4 --item-4'
              '--item-5 --item-5 --item-5';
          }
        }
      }
      .catsub--slot {
        .carousel-wrapper {
          overflow: hidden;
        }
        &.block-1 {
          padding: 30px 0;
        }
        &.block-2,
        &.block-6 {
          background: #2b2b2b;
          padding: 30px 0;
        }
        &.block-3,
        &.block-4 {
          .desktop {
            display: grid;
            @media (max-width: 690px) {
              display: none;
            }
          }
          .mobile {
            display: none;
            @media (max-width: 690px) {
              display: grid;
            }
          }
          padding: 30px 0;
        }
        &.block-5 {
          background: #c07745;
          padding: 30px 0;
        }
      }
    }
  }
`;
