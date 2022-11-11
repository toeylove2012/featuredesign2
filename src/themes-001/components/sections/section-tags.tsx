import _ from 'lodash';
import { memo } from 'react';
import { NextPage } from 'next';

import { PSection } from 'interface/section';
import { IDataLayerGlobal } from 'interface/data-layer';
import WidgetTags from 'themes-001/components/widget/widget-tags';
import { APP_IMG } from '../../../constants';
import styled from '@emotion/styled';

type Props = {
  color?: string;
  tags?: PSection['tags'];
  title?: string;
  tagsIndex?: string;
  inPage?: string;
  eventDataLayer?: IDataLayerGlobal;
  router?: any;
};
const SectionTags: NextPage<Props> = ({ color = '', tags, title, tagsIndex, inPage = 'default', eventDataLayer }) => {
  if (_.isEmpty(tags?.data)) return null;
  return (
    <SectionWrapper id='tags'>
      {/* ---------------------------------- TAGS ---------------------------------- */}
      {!_.isEmpty(tags?.data) && (
        <WidgetTags
          title={`${title ? title : 'แฮชแท็กยอดนิยม'}`}
          // desc='อัพเดตกันก่อนใคร กับแฮชแท็กยอดนิยท ที่รวมคำค้นหา วลีเด็ด ยอดนิยมประจำวัน'
          data={tags?.data}
          tagsIndex={`${tagsIndex}`}
          color={color || '#000'}
          inPage={inPage}
          // ! DATALAYER
          eventDataLayer={{
            ...eventDataLayer
          }}
        />
      )}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 30px 0;
  .bg-hastag {
    background-image: url(${APP_IMG}/images/bg-hastag.webp);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
export default memo(SectionTags);
