// import WidgetSettrade from 'src/components/widgets/widget-settrade';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import React from 'react';
import WidgetExchangeStat from './widget/widget-exchange-stat';
import WidgetGoldStat from './widget/widget-gold-stat';
import WidgetOilStat from './widget/widget-oil-stat';

// const WidgetGoldStat = dynamic(import('section-events/events-002/widget/widget-gold-stat'));
// const WidgetExchangeStat = dynamic(import('section-events/events-002/widget/widget-exchange-stat'));
// const WidgetOilStat = dynamic(import('section-events/events-002/widget/widget-oil-stat'));

const SectionEventTwo: NextPage = () => {
  return (
    <>
      <SectionWrapper>
        <div className='container section-settrade'>
          <div className='block-1'>
            <WidgetExchangeStat />
          </div>
          <div className='block-2'>
            <WidgetGoldStat />
          </div>
          <div className='block-3'>
            <WidgetOilStat />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

const SectionWrapper = styled.div`
  position: relative;
  overflow: hidden;
  .section-settrade {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'block-1 block-2 block-3';
    @media (max-width: 768px) {
      grid-gap: 10px;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'block-1 block-1'
        'block-2 block-3';
    }
    @media (max-width: 690px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'block-1'
        'block-2'
        'block-3';
    }
    .block-1 {
      grid-area: block-1;
    }
    .block-2 {
      grid-area: block-2;
    }
    .block-3 {
      grid-area: block-3;
    }
  }
`;

export default SectionEventTwo;
