import styled from '@emotion/styled';
import _ from 'lodash';

import { PSection } from 'interface/section';

import SectionFullTabs from 'themes-001/components/sections/section-full-tab';

type Props = {
  headerLatestNews: PSection['headerLatestNews'];
  block1: PSection['block1'];
  block2: PSection['block2'];
  block3: PSection['block3'];
};

const SectionTwo = ({ headerLatestNews, block1, block2, block3 }: Props) => {
  let cloneDataList = [
    !_.isEmpty(headerLatestNews) && { ...headerLatestNews },
    !_.isEmpty(block1?.data) && { ...block1 },
    !_.isEmpty(block2?.data) && { ...block2 },
    !_.isEmpty(block3?.data) && { ...block3 }
  ];
  cloneDataList = cloneDataList.filter(el => el !== false);

  if (_.isEmpty(cloneDataList)) return null;

  return (
    <>
      <SectionWrapper id='section-2' className='wrapper-1'>
        <SectionFullTabs data={cloneDataList} />
      </SectionWrapper>
    </>
  );
};

export default SectionTwo;

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px 0;
`;
