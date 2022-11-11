import _ from 'lodash';
// import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { CHECK_ADS } from 'constants/index';
import { NextPage } from 'next';
import { IAds } from 'interface/service';
import { TKeyAdsPage, TKeyAdsPosition } from 'interface/ads';
import useResponsive from '../devices';
import { Media } from 'interface/media';
import styled from '@emotion/styled';
// ? TODO:  <DynamicAds position={KEY_ADS_POSITION.BILLBOARD} page={KEY_ADS_PAGE.CONTENT} />

/* -------------------------------- KEY_TYPE -------------------------------- */

export const KEY_ADS_POSITION: TKeyAdsPosition = {
  BILLBOARD: 'billboard',
  STICKY_1: 'sticky-1',
  STICKY_2: 'sticky-2',
  STICKY_3: 'sticky-3',
  INARTICLE_1: 'inarticle-1',
  INARTICLE_2: 'inarticle-2',
  INARTICLE_3: 'inarticle-3',
  POSTARTICLE: 'postarticle',
  AD1X1: 'ad1x1'
};

export const KEY_ADS_PAGE: TKeyAdsPage = {
  HOMEPAGE: 'homepage',
  CATEGORY: 'category',
  CONTENT: 'content',
  TAG: 'tag',
  SEARCH: 'search'
};

export const Ads = ({ slotId = '', sizeMobile = [], sizeDesktop = [], slotDefine = '', className = '' }: IAds): ReactElement | null => {
  // sizeMaps = ''
  if (_.isEmpty(slotId) || _.isEmpty(slotDefine)) return null;
  const responsive: Media = useResponsive();
  const slotSize = responsive.isDesktop ? sizeDesktop : sizeMobile;

  useEffect(() => {
    window.googletag?.cmd.push(() => {
      window.googletag.defineSlot(slotDefine, slotSize, slotId).addService(window.googletag.pubads()).setCollapseEmptyDiv(true, true);
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();

      window.googletag.cmd.push(function () {
        window.googletag.display(slotId);
      });
    });
  }, []);
  return (
    <AdsWrapper className={className}>
      {CHECK_ADS === 'true' && className}
      <div id={slotId} />
    </AdsWrapper>
  );
};

const AdsWrapper = styled.div`
  &.ads-billboard {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    min-height: 300px;
    iframe {
      margin: auto;
    }
  }
  &.ads-ad1x1 {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &.ads-sticky-1,
  &.ads-sticky-2,
  &.ads-sticky-3 {
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 15px 0;
  }
  &.ads-postarticle {
    position: sticky;
    bottom: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  &.ads-inarticle-1,
  &.ads-inarticle-2,
  &.ads-inarticle-3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 30px auto;
    overflow: hidden;
    img,
    iframe {
      max-width: 100%;
      display: block;
      margin: auto;
    }
  }
`;

type Props = {
  position?: TKeyAdsPosition[keyof TKeyAdsPosition];
  data?: IAds[];
};
const DynamicAds: NextPage<Props> = ({ position = '', data = [] }) => {
  // console.log('DynamicAds', data);
  // console.log('page', page);
  // console.log('position', position);
  const _adsArray: IAds[] = !_.isEmpty(data) ? data : [];

  // data.filter((_data) => _data?.section === ModifyAdsSection(page, _data))
  // console.log('_adsArray', page, position, _adsArray[0]);
  // เช็คตำแหน่ง ADS
  const _adsSlot: IAds | undefined = _adsArray.find((_data: IAds) => _data?.position === position);
  if (!_.isEmpty(_adsSlot)) {
    return (
      <>
        <Ads className={`ads-${position}`} slotDefine={_adsSlot?.slotDefine} slotId={_adsSlot?.slotId} sizeDesktop={_adsSlot?.sizeDesktop} sizeMobile={_adsSlot?.sizeMobile} />
      </>
    );
  }
  return null;
};
export default DynamicAds;
