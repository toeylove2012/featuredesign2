import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getIndexPage, initPropsPageIndex, TInitPropsIndexPage } from 'services/article.service';
import Layout from 'themes-001/components/layout';
import SectionLottery from 'themes-001/components/sections/section-lottery';
import _ from 'lodash';
import { TSectionNewTrendProps } from 'section-events/events-001';
import { getTags } from 'services/tag.service';
import LazyLoad from 'react-lazyload';
import SectionSix from 'themes-001/components/sections/section-home/section-six';
import SectionTwo from 'themes-001/components/sections/section-home/section-two';
import SectionThree from 'themes-001/components/sections/section-home/section-three';
import SectionFour from 'themes-001/components/sections/section-home/section-four';
import SectionFive from 'themes-001/components/sections/section-home/section-five';
import SectionEventTwo from 'section-events/events-002/events-002';
import { WEB_DESC } from 'constants/layout';

const SectionOne = dynamic(import('themes-001/components/sections/section-home/section-one'), { ssr: true });
// const SectionTwo = dynamic(import('themes-001/components/sections/section-home/section-two'), { ssr: true });
// const SectionThree = dynamic(import('themes-001/components/sections/section-home/section-three'), { ssr: false });
// const SectionFour = dynamic(import('themes-001/components/sections/section-home/section-four'), { ssr: false });
// const SectionFive = dynamic(import('themes-001/components/sections/section-home/section-five'), { ssr: false });
// const SectionSix = dynamic(import('themes-001/components/sections/section-home/section-six'), { ssr: false });
const SectionEventOne = dynamic(import('section-events/events-001'), { ssr: true });
// const SectionEventTwo = dynamic(import('section-events/events-002/events-002'), { ssr: false });

type Props = TInitPropsIndexPage & {
  sectionEventOne: TSectionNewTrendProps;
};
const IndexPage: NextPage<Props> = props => {
  const { sectionOne, sectionTwo, sectionThree, sectionFour, sectionFive, sectionEventOne } = props;

  return (
    <>
      <Layout>
        <SectionOne highlight1={sectionOne.highlight1} highlight2={sectionOne.highlight2} />
        <SectionEventOne sectionEventOne={sectionEventOne} />
        <LazyLoad offset={100}>
          <SectionTwo headerLatestNews={sectionOne.headerLatestNews} block1={sectionOne.block1} block2={sectionOne.block2} block3={sectionOne.block3} />
          <SectionThree block1={sectionTwo?.block1} block2={sectionTwo?.block2} block3={sectionTwo?.block3} dataTags={sectionTwo?.tags} />
          <SectionEventTwo />
          <SectionFour block1={sectionThree?.block1} block2={sectionThree?.block2} block3={sectionThree?.block3} />
          <SectionFive block1={sectionFour?.block1} block2={sectionFour?.block2} block3={sectionFour?.block3} />
          <SectionSix
            block1={sectionFive?.block1}
            block2={sectionFive?.block2}
            block3={sectionFive?.block3}
            block4={sectionFive?.block4}
            block5={sectionFive?.block5}
            block6={sectionFive?.block6}
            block7={sectionFive?.block7}
            block8={sectionFive?.block8}
            block9={sectionFive?.block9}
            block10={sectionFive?.block10}
          />
          <SectionLottery lottery={sectionFive?.lottery?.data} />
        </LazyLoad>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (req: any) => {
  let initProps: Props = {
    ..._.cloneDeep(initPropsPageIndex),
    sectionEventOne: {}
  };
  try {
    const initPropsIndexPage = await getIndexPage(req);

    const dataTags = await getTags([
      { name: 'canabiz', limit: 1 },
      { name: 'wealthtech', limit: 1 },
      { name: 'wellbeing', limit: 1 },
      { name: 'zerocarbon', limit: 1 },
      { name: 'EV', limit: 4 }
    ]);
    initProps = {
      ...initProps,
      ...initPropsIndexPage,
      sectionEventOne: {
        ...initProps.sectionEventOne,
        ...dataTags
      }
    };
  } catch (err: any) {
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }
  return {
    props: initProps
  };
};
export default IndexPage;
