import _ from 'lodash';
import Head from 'next/head';
import styled from '@emotion/styled';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';

import { GET } from 'services';
import { timestamp } from 'utils/helper';
import { APP_URL } from 'constants/index';
import { convertDatasets } from 'utils/datasets';
import Event003 from 'section-events/events-003';
import Event004 from 'section-events/events-004';
import Event005 from 'section-events/events-005';
import EventDefault from 'section-events/events-default';

function renderEvent(id: string, data: any) {
  switch (id) {
    case 'event-001': // for datasets thepeople
      return <Event003 id={id} data={data} />;
    case 'event-002': // for datasets thepeople
      return <Event004 id={id} data={data} />;
    case 'event-003': // for datasets thepeople
      return <Event005 id={id} data={data} />;
    default:
      return <EventDefault id={id} data={data} />;
  }
}

const OpenhousePage = ({ topic, data }: any) => {
  if (_.isEmpty(data)) return null;
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={convertDatasets(data[0], 'หัวข้อ', true) || 'THE PEOPLE OPEN HOUSE 2022 - The People'}
        description={convertDatasets(data[0], 'รายละเอียด', true) || 'งานเปิดบ้าน The People 9 November 2022 09:00-18:00'}
      />
      <Head>
        <link rel='canonical' href={`${APP_URL}/open-house`} />
        {/* --------------------------------- Truehit -------------------------------- */}
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
                __th_page="open-house";
              `
          }}
        />
      </Head>
      <>
        {data.map((item: any, index: number) => {
          return (
            <SectionWrapper key={index} id={`${topic}-${index + 1}`}>
              {renderEvent(`${convertDatasets(item, 'รูปแบบ', true)}`, item)}
            </SectionWrapper>
          );
        })}
      </>
    </>
  );
};

const SectionWrapper: any = styled.section<{
  size: any;
  background: any;
}>`
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;

  background-color: #000;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const initProps: any = {
    statusCode: 200,
    errMessage: null,
    data: [],
    topic: '',
    navBar: []
  };

  try {
    /* ---------------------------------- MENU ---------------------------------- */
    const fetchMenuNav = await GET('/api/v1.0/navigations/menu-nav');
    if (!_.isEmpty(fetchMenuNav)) {
      initProps.navBar = fetchMenuNav;
    }
    /* --------------------------------- DATASET -------------------------------- */
    const fetchDataSet = await GET('/api/datasets?gberth');
    const topic = 'open-house';
    if (!_.isEmpty(fetchDataSet)) {
      const dataOpenhouse = convertDatasets(fetchDataSet?.reverse(), topic, false);
      // console.log(dataOpenhouse);
      if (!_.isEmpty(dataOpenhouse)) {
        initProps.data = dataOpenhouse;
        initProps.topic = topic;
      }
    }
  } catch (err: any) {
    console.error(`${timestamp()} ==========> OPEN_HOUSE ERROR : `, err.message);
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }

  return {
    props: initProps
  };
};

export default OpenhousePage;
