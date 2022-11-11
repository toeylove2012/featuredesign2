import dynamic from 'next/dynamic';
import Layout from 'themes-001/components/layout';

const SectionOne = dynamic(import('themes-001/components/sections/section-home/section-one'), { ssr: true });
const SectionTwo = dynamic(import('themes-001/components/sections/section-home/section-two'), { ssr: true });
const SectionThree = dynamic(import('themes-001/components/sections/section-home/section-three'), { ssr: true });
const SectionFour = dynamic(import('themes-001/components/sections/section-home/section-four'), { ssr: true });
const SectionFive = dynamic(import('themes-001/components/sections/section-home/section-five'), { ssr: true });
const SectionSix = dynamic(import('themes-001/components/sections/section-home/section-six'), { ssr: true });
const SectionEventOne = dynamic(import('section-events/events-001'), { ssr: true });
const SectionEventTwo = dynamic(import('section-events/events-002/events-002'), { ssr: true });

type Props = {};

const IndexPage = (props: Props) => {
  return (
    <>
      <Layout>
        {/* <SectionOne />
        <SectionEventOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionEventTwo />
        <SectionFive />
        <SectionSix /> */}
      </Layout>
    </>
  );
};

export default IndexPage;
