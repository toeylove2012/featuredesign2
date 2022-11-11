import styled from '@emotion/styled';
import { WEB_DESC } from 'constants/layout';
import { Media } from 'interface/media';

import { PSection } from 'interface/section';
import _ from 'lodash';
import CardFull from 'themes-001/components/cards/card-full';
import Carousels from 'themes-001/components/carousels';
import useResponsive from 'utils/devices';

type Props = {
  highlight1: PSection['highlight1'];
  highlight2: PSection['highlight2'];
};

const SectionOne = ({ highlight1, highlight2 }: Props) => {
  const responsive: Media = useResponsive();
  if (_.isEmpty(highlight1?.data)) return null;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const highlightAll: any = [...highlight1?.data, ...highlight2?.data];

  return (
    <SectionWrapper id='section-1'>
      <h2 className='seo-index-h2'>{WEB_DESC}</h2>
      {responsive.isLaptop && (
        <div className={`grid-sec-one container desktop`}>
          <div className='block-1'>
            <Carousels infinite={false} dots={false} showArrow={true} mobileSlideShow={1} slideShow={1}>
              {_.map(highlight1?.data.slice(0, 4), (element, index) => (
                <CardFull key={index} data={element} showFooter={false} showBlurb={false} />
              ))}
            </Carousels>
          </div>
          <div className='block-2'>
            {_.map(highlight1?.data?.slice(4, 5), (element, index) => (
              <CardFull key={index} data={element} showFooter={false} showBlurb={false} />
            ))}
          </div>
          <div className='block-3'>
            {_.map(highlight2?.data?.slice(0, 3), (element, index) => (
              <CardFull key={index} data={element} showFooter={false} showBlurb={false} />
            ))}
          </div>
        </div>
      )}

      {responsive.isMobile && (
        <div className={`grid-sec-one container mobile`}>
          <div className='block-1'>
            <Carousels infinite={false} dots={true} mobileSlideShow={1}>
              {_.map(highlightAll, (element, index) => (
                <CardFull key={index} data={element} showFooter={false} showBlurb={false} />
              ))}
            </Carousels>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default SectionOne;

const SectionWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 30px 0;
  .seo-index-h2 {
    position: absolute;
    opacity: 0;
  }
  .grid-sec-one {
    &.desktop {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
        'block-1 block-1 block-2'
        'block-3 block-3 block-3';
      grid-gap: 10px;
      .block-1 {
        .card-image {
          padding-top: 37.5%;
          img {
            object-position: top;
          }
        }
      }
      @media (max-width: 690px) {
        display: none;
      }
    }
    &.mobile {
      display: none;
      @media (max-width: 690px) {
        display: block !important;
        .block-1 {
          margin: 0 -15px;
          .card-image {
            padding-top: 100%;
          }
        }
      }
    }
    .block-1 {
      grid-area: block-1;
    }
    .block-2 {
      grid-area: block-2;
      .card-image {
        padding-top: 75%;
      }
    }
    .block-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
      grid-area: block-3;
      .card-image {
        padding-top: 75%;
      }
    }
  }
`;
