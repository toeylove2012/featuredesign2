import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { NextRouter, useRouter } from 'next/router';
import { NextPage } from 'next';

import { timestamp } from 'utils/helper';
import { APP_IMG } from 'constants/index';
import useResponsive from 'utils/devices';
import { GET } from 'services';
import { WEB_TITLE } from 'constants/layout';
import { DATALAYER_TYPE } from 'utils/datalayer/send-datalayer';
import { IArticle } from 'interface/section';
import { Media } from 'interface/media';
import styled from '@emotion/styled';

const Layout = dynamic(import('themes-001/components/layout'));
const Carousels = dynamic(import('themes-001/components/carousels'));
const CardV = dynamic(import('themes-001/components/cards/card-v'));

const PageError: NextPage = () => {
  const arr: IArticle[] = new Array(6).fill({ image: `/default.jpg` });
  const [dataLatestNews, setDataLatestNews] = useState<IArticle[]>(arr);
  const responsive: Media = useResponsive();
  const router: NextRouter = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const uri: string = '/api/v1.0/categories/latest-news';
        const data: IArticle[] = await GET(uri, false, false);
        if (!_.isEmpty(data)) {
          setDataLatestNews(data);
        }
      } catch (err: any) {
        console.error(`${timestamp()}==========> EMPTY_ARTICLE ERROR : ${err}`);
      }
    })();
  }, []);

  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo noindex={true} nofollow={true} title={WEB_TITLE} />
      <Layout>
        <PageWrapper className='empty-article'>
          <div className='container'>
            <div className='no-article'>
              <img src={`${APP_IMG}/default.jpg`} title='no-article' alt='no-article' width='100%' height='100%' loading='lazy' />
            </div>
          </div>
          {/* ----------------------------- LATEST_NEWS  --------------------------------- */}
          {_.isArray(dataLatestNews) && (
            <>
              <Carousels slideShow={responsive.isMobile ? 1 : 4}>
                {dataLatestNews.slice(0, 6).map((item, index) => (
                  <div key={index} className='card-item'>
                    <CardV
                      data={item}
                      showBlurb={false}
                      showBadge={false}
                      // ! DATALAYER
                      eventDataLayer={{
                        type: DATALAYER_TYPE.TRACK_INDEX,
                        router: router?.pathname,
                        section: 'section-1',
                        data: {
                          title: item?.title,
                          heading: 'ข่าวล่าสุด',
                          index: index + 1
                        }
                      }}
                    />
                  </div>
                ))}
              </Carousels>
            </>
          )}
        </PageWrapper>
      </Layout>
    </>
  );
};

const PageWrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  display: block;
  height: auto;
  padding: 40px 15px 0 15px;

  .no-article {
    display: block;
    max-width: 70%;
    margin: auto;
    img {
    }
    @media (max-width: 767px) {
      max-width: 100%;
    }
  }
`;
export default PageError;
