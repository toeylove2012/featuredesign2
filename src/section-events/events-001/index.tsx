import { NextPage } from 'next';
import SectionNewTrend from 'section-events/events-001/section-newtrend';
import styled from '@emotion/styled';
import SectionEV from 'section-events/events-001/section-ev';
import { IArticle, ILanguage } from 'interface/section';
import _ from 'lodash';

export type TSectionNewTrendProps = {
  canabiz?: IArticle[];
  wealthtech?: IArticle[];
  wellbeing?: IArticle[];
  zerocarbon?: IArticle[];
  EV?: IArticle[];
};
type Props = {
  sectionEventOne: TSectionNewTrendProps;
};
const Index: NextPage<Props> = ({ sectionEventOne }) => {
  if (_.every(sectionEventOne, _.isEmpty)) return null;

  const { EV, ...newTrend } = sectionEventOne;

  return (
    <SectionWrapper>
      <div className='container'>
        <SectionNewTrend {...newTrend} />
        <SectionEV dataEV={EV} />
      </div>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 15px 0 30px;
  .container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 50px;

    .section-new-trend,
    .empty {
      grid-column: 1 / 9;
    }
    .section-ev {
      grid-column: 9 / 13;
    }
    @media (max-width: 1200px) {
      padding: 0 0.75rem;
      grid-gap: 10px;
    }
    @media (max-width: 991px) {
      .section-new-trend,
      .empty {
        grid-column: 1 / 13;
      }
      .section-ev {
        grid-column: 1 / 13;
      }
    }
  }

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    background: linear-gradient(334.49deg, #ffd6f2 -1.31%, #dfb9eb 19.6%, #8e71da 65.61%, #4933cc 103.25%);
  }

  .resolution-image {
    display: flex;
  }
`;

export default Index;
