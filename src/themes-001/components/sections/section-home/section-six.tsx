import styled from '@emotion/styled';
import { Media } from 'interface/media';
import { PSection } from 'interface/section';
import _ from 'lodash';
import { Fragment } from 'react';
import CardV from 'themes-001/components/cards/card-v';
import Carousels from 'themes-001/components/carousels';
import useResponsive from 'utils/devices';
import SectionHeader from '../section-header';

type Props = {
  block1?: PSection['block1'];
  block2?: PSection['block2'];
  block3?: PSection['block3'];
  block4?: PSection['block4'];
  block5?: PSection['block5'];
  block6?: PSection['block6'];
  block7?: PSection['block7'];
  block8?: PSection['block8'];
  block9?: PSection['block9'];
  block10?: PSection['block10'];
};
const SectionSix = ({ block1, block2, block3, block4, block5, block6, block7, block8, block9, block10 }: Props) => {
  let cloneData = _.filter(
    [{ ...block1 }, { ...block2 }, { ...block3 }, { ...block4 }, { ...block5 }, { ...block6 }, { ...block7 }, { ...block8 }, { ...block9 }, { ...block10 }],
    n => !_.isEmpty(n.data)
  );
  const responsive: Media = useResponsive();
  return (
    <>
      {_.map(cloneData, (itemlist, index) => (
        <Fragment key={index}>
          {!_.isEmpty(itemlist?.data) && (
            <SectionWrapper id={`section-${index + 13}`} className={`container wrapper-${index + 11}`}>
              <SectionHeader data={itemlist?.title} link={itemlist?.link} />
              {responsive.isLaptop && (
                <div className='card-list desktop'>
                  {_.map(itemlist?.data, (item, i) => (
                    <div className='card-item' key={i}>
                      <CardV data={item} showBadge={true} showBlurb={false} showCountView={true} showCenter={true} showByline={true} showFooter={false} />
                    </div>
                  ))}
                </div>
              )}
              {responsive.isMobile && (
                <div className='card-list mobile'>
                  <Carousels infinite={false} dots={true} mobileSlideShow={1} autoplay={false}>
                    {_.map(itemlist?.data, (item, i) => (
                      <div className='card-item' key={i}>
                        <CardV data={item} showBadge={true} showBlurb={false} showCountView={true} showCenter={true} showByline={true} showFooter={false} />
                      </div>
                    ))}
                  </Carousels>
                </div>
              )}
            </SectionWrapper>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default SectionSix;
const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px 15px;
  .carousel-wrapper {
    overflow: hidden;
  }
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
`;
