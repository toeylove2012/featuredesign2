import styled from '@emotion/styled';
import dayjs from 'dayjs';
import _ from 'lodash';
import { NextRouter, useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { IoCloudDownloadSharp, IoCloseCircle } from 'react-icons/io5';

import { PSection } from 'interface/section';
import { ITags } from 'interface/service';
import { Media } from 'interface/media';

import CardFull from 'themes-001/components/cards/card-full';
import CardVOverlay from 'themes-001/components/cards/card-v-overlay';
import SectionHeader from '../section-header';
import { APP_IMG } from '../../../../constants';
import WidgetFacebook from 'themes-001/components/widget/widget-facebook';
import SectionTags from '../section-tags';
import CardV from 'themes-001/components/cards/card-v';
import WidgetFollow from 'themes-001/components/widget/widget-follow';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import useResponsive from 'utils/devices';
import { color } from 'utils/theme';
import { WEB_NAME } from 'constants/index';

type Props = {
  block1?: PSection['block1'];
  block2?: PSection['block2'];
  block3?: PSection['block3'];
  dataTags?: { data: ITags[] };
};

const SectionThree = ({ block1, block2, block3, dataTags }: Props) => {
  const router: NextRouter = useRouter();
  const boxRef: any = useRef();
  const responsive: Media = useResponsive();
  const [toggleNewsPaper, setToggleNewsPaper] = useState(false);
  const dateCache = dayjs().format('DD-MMM-YYYY');

  return (
    <>
      <SectionWrapper id={`section-3`} className={`container wrapper-1`}>
        <SectionHeader data={block1?.title} link={block1?.link} />
        {responsive.isLaptop && (
          <div className='card-list desktop'>
            {_.map(block1?.data, (item, i) => (
              <div className='card-item' key={i}>
                <CardVOverlay data={item} showBadge={true} showReadmore={true} showCountView={true} showCenter={true} showByline={true} />
              </div>
            ))}
          </div>
        )}
        {responsive.isMobile && (
          <div className='card-list mobile'>
            {_.map(block1?.data?.slice(0, 3), (item, i) => (
              <div className='card-item' key={i}>
                <CardVOverlay data={item} showBadge={true} showReadmore={true} showCountView={true} showCenter={true} showByline={true} />
              </div>
            ))}
          </div>
        )}

        <div className='load-more'>
          <a href={`${block1?.link}`}>
            <p>ดูเพิ่มเติม</p>
          </a>
        </div>
      </SectionWrapper>
      <SectionWrapper id={`section-4`} className={`container wrapper-2`}>
        <SectionHeader data={block2?.title} link={block2?.link} />
        {responsive.isLaptop && (
          <div className='card-list desktop'>
            {_.map(block2?.data, (item, i) => (
              <div className='card-item' key={i}>
                <CardFull data={item} showBlurb={false} showFooter={true} showCountView={true} />
              </div>
            ))}
          </div>
        )}
        {responsive.isMobile && (
          <div className='card-list mobile'>
            {_.map(block2?.data?.slice(0, 2), (item, i) => (
              <div className='card-item' key={i}>
                <CardFull data={item} showBlurb={false} showFooter={true} showCountView={true} />
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>
      <SectionWrapper id={`section-5`} className={`container wrapper-3`}>
        <div className='block-1'>
          <SectionTags
            tags={dataTags}
            title='แท็กยอดนิยม'
            color='#000'
            tagsIndex='index'
            // ! DATALAYER
            eventDataLayer={{
              type: DATALAYER_TYPE.TRACK_POSITION,
              router: router.pathname,
              section: 'แท็กยอดนิยม',
              position: 'ใต้:ข่าวน่าสนใจ',
              data: {
                heading: 'แท็กยอดนิยม'
              }
            }}
          />
          <div>
            <WidgetFollow
              title='ช่องทางการติดตาม'
              // ! DATALAYER
            />
          </div>
        </div>
        <div className='block-2'>
          <WidgetFacebook />
        </div>
        {WEB_NAME === 'thansettakij' && (
          <div className='section-newspaper block-3'>
            <img src={`${APP_IMG}/inews/newspaper_cover/Than_1.png?v=${dateCache}`} alt='Daily News Paper' onClick={() => setToggleNewsPaper(true)} />
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper id={`section-6`} className={`container wrapper-4`}>
        <SectionHeader data={block3?.title} link={block3?.link} />
        {responsive.isLaptop && (
          <div className='card-list desktop'>
            {_.map(block3?.data, (item, i) => (
              <div className='card-item' key={i}>
                <CardV data={item} showBadge={true} showBlurb={false} showCountView={true} showCenter={true} showByline={true} />
              </div>
            ))}
          </div>
        )}
        {responsive.isMobile && (
          <div className='card-list mobile'>
            {_.map(block3?.data?.slice(0, 2), (item, i) => (
              <div className='card-item' key={i}>
                <CardV data={item} showBadge={true} showBlurb={false} showCountView={true} showCenter={true} showByline={true} />
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {toggleNewsPaper && (
        <PopupBox className='popup-box'>
          <div className='image-box' ref={boxRef}>
            <div className='action-box'>
              <a className='btn-download' href='https://www.ookbee.com/Shop/Magazine/THANSETTAKIJ' target='_blank' rel='noreferrer'>
                ดาวน์โหลด <IoCloudDownloadSharp />
              </a>
              <button className='btn-close' onClick={() => setToggleNewsPaper(false)}>
                <IoCloseCircle size={28} color='red' />
              </button>
            </div>
            <img src={`${APP_IMG}/inews/newspaper_cover/Than_1.png?v=${dateCache}`} alt='Daily News Paper' />
          </div>
        </PopupBox>
      )}
    </>
  );
};

export default SectionThree;

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px 15px;
  .card-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 20px;
    &.desktop {
      display: grid;
      @media (max-width: 690px) {
        display: none;
      }
    }
    &.mobile {
      display: none;
      @media (max-width: 690px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
      }
    }
  }
  &.wrapper-1 {
    .card-list {
      .card-item {
        border-bottom: 2px solid var(--secondary-color);
      }
    }
    .load-more {
      background-color: var(--secondary-color);
      p {
        color: var(--text-color);
        text-align: center;
        margin-top: 15px;
        padding: 8px 0;
      }
    }
  }
  &.wrapper-2,
  &.wrapper-4 {
    .card-list {
      padding-bottom: 20px;
      border-bottom: 2px solid #888888;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 350px;
        max-width: 100%;
        height: 2px;
        background-color: var(--secondary-color);
        @media (max-width: 690px) {
          width: 150px;
        }
      }
    }
  }
  &.wrapper-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
    @media (max-width: 690px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
    .block-1 {
      #tags {
        padding: 0;
      }
    }
    .block-2 {
      margin: auto;
    }
    .section-newspaper {
      text-align: center;
      img {
        cursor: pointer;
        width: 100%;
        max-width: 380px;
        margin: auto;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
        transition: all 1s;

        &:hover {
          box-shadow: 2px 4px 10px ${color.newsPaperHover};
          transition: all 1s;
        }
      }
    }
  }
  &.wrapper-4 {
  }
`;

const PopupBox = styled.div`
  &.popup-box {
    position: fixed;
    width: 100% !important;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.8);

    .image-box {
      position: relative;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
      top: 50%;
      transform: translate(0, -50%);
      text-align: center;

      img {
        width: 768px;
        max-width: 100%;
        height: 100%;
        max-height: 95vh;
      }

      .action-box {
        position: relative;
        margin: auto;
        width: 768px;
        max-width: 100%;
        .btn-close {
          border: none;
          background: transparent;
          position: absolute;
          top: 5px;
          right: 0px;
        }

        .btn-download {
          position: absolute;
          top: 5px;
          left: 5px;
          background: ${color.newsPaper};
          color: #fff;
          padding: 3px 10px;
          border-radius: 5px;
        }
      }
    }
  }
`;
