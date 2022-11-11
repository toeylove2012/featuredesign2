import styled from '@emotion/styled';
import { Media } from 'interface/media';
import { IArticle } from 'interface/section';
import _ from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import CardFull from 'themes-001/components/cards/card-full';
import useResponsive from 'utils/devices';
import SectionHeader from './section-header';

type Props = {
  data: IArticle & IArticle[];
};
const SectionFullTabs = ({ data }: Props) => {
  if (_.isEmpty(data)) return null;
  const [dataItem, setDataItem]: [any, Dispatch<SetStateAction<IArticle>>] = useState(data[0]);
  const [active, setActive] = useState({
    key: 0,
    status: true
  });

  const responsive: Media = useResponsive();

  return (
    <>
      <SectionWrapper className='container'>
        <SectionHeader tabs={true} data={data} setDataItem={setDataItem} setActive={setActive} dataItem={dataItem} active={active} />
        {responsive.isLaptop && (
          <div className='grid-areas desktop'>
            {_.map(dataItem?.data.slice(0, 6), (element, index) => (
              <CardFull key={index} data={element} showBlurb={false} showFooter={true} />
            ))}
          </div>
        )}
        {responsive.isMobile && (
          <div className='grid-areas mobile'>
            {_.map(dataItem?.data.slice(0, 2), (element, index) => (
              <CardFull key={index} data={element} showBlurb={false} showFooter={true} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default SectionFullTabs;

const SectionWrapper = styled.section`
  .grid-areas {
    &.desktop {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      @media (max-width: 690px) {
        display: none;
      }
    }
    &.mobile {
      display: none;
      @media (max-width: 690px) {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
      }
    }
  }
`;
