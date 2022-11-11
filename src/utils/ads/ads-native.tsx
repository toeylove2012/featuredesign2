import _ from 'lodash';
import { NextPage } from 'next';
import Head from 'next/head';
import { IAdsNative } from 'src/interface/service';
import styled from 'styled-components';
// import { useDesktop } from 'src/uti u/devices';
import parse from 'html-react-parser';
import useResponsive from 'src/utils/devices';
import { Media } from 'src/interface/media';

// ? TODO:  <AdsNative data={Array} isShowAds={boolean} />

/* -------------------------------- KEY_TYPE -------------------------------- */
interface Props {
  data: IAdsNative | undefined;
  isShowAds: boolean;
}

const AdsNative: NextPage<Props> = ({ data, isShowAds }) => {
  const _adsArray: IAdsNative = !_.isEmpty(data) ? data : {};
  const responsive: Media = useResponsive();
  if (!_.isEmpty(_adsArray)) {
    return (
      <>
        <Head>
          {/* -------------------------------- ADS : Native (Mgid) ------------------------------- */}
          {isShowAds && (responsive.isDesktop && data?.header ? parse(data?.header || '') : responsive.isMobile && data?.mobile_header ? parse(data?.mobile_header || '') : '')}
        </Head>
        <AdsWrapper className='ads-native-wrapper'>
          {responsive.isDesktop ? (
            <>
              {data?.body ? (
                <div id='section-ads' className={`${data?.name}`}>
                  {data?.body && <div dangerouslySetInnerHTML={{ __html: data?.body }} />}
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              {data?.mobile_body ? (
                <div id='section-ads' className={`${data?.name}`}>
                  {data?.mobile_body && <div dangerouslySetInnerHTML={{ __html: data?.mobile_body }} />}
                </div>
              ) : (
                ''
              )}
            </>
          )}
        </AdsWrapper>
      </>
    );
  }
  return null;
};

const AdsWrapper = styled.div`
  #section-ads {
    max-width: 100%;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      @media (max-width: 767px) {
        width: 90%;
      }
    }
  }
  #contents {
    display: flex;
    width: 100%;
    max-width: 95%;
    margin: auto;
  }
`;
export default AdsNative;
