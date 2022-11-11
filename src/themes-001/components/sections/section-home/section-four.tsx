import styled from '@emotion/styled';
import { Media } from 'interface/media';
import { PSection } from 'interface/section';
import _ from 'lodash';
import CardV from 'themes-001/components/cards/card-v';
import Carousels from 'themes-001/components/carousels';
import useResponsive from 'utils/devices';
import SectionHeader from '../section-header';

type Props = {
  block1?: PSection['block1'];
  block2?: PSection['block2'];
  block3?: PSection['block3'];
};
const SectionFour = ({ block1, block2, block3 }: Props) => {
  let cloneData = _.filter([{ ...block1 }, { ...block2 }, { ...block3 }], n => !_.isEmpty(n.data));
  const responsive: Media = useResponsive();

  return (
    <>
      {_.map(cloneData, (itemlist, index) => (
        <SectionWrapper key={index} id={`section-${index + 7}`} className={`container wrapper-${index + 5}`}>
          <SectionHeader color='var(--primary-color);' data={itemlist?.title} link={itemlist?.link} />
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
      ))}
    </>
  );
};

export default SectionFour;

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
