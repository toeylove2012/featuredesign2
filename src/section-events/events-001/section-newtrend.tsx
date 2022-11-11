import _ from 'lodash';
import { APP_IMG } from 'constants/index';
import { GrFormNextLink } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { GET } from 'services';
import { convertObjPath, splitRote, timestamp } from 'utils/helper';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import CardH from 'section-events/events-001/components/card-h';
import { IArticle } from 'interface/section';
import { getTags } from 'services/tag.service';
import Image from 'section-events/events-001/components/image';
import { NextRouter, useRouter } from 'next/router';

const convertKey = (data: any, key: any): string => {
  if (_.isEmpty(data)) return '';
  const res = _.find(data, { key });
  return res?.value || '';
};

type Props = {
  canabiz?: IArticle[];
  wealthtech?: IArticle[];
  wellbeing?: IArticle[];
  zerocarbon?: IArticle[];
};
const SectionNewTrend: NextPage<Props> = ({ canabiz, wealthtech, wellbeing, zerocarbon }) => {
  const router: NextRouter = useRouter();
  if (_.isEmpty(canabiz) && _.isEmpty(wealthtech) && _.isEmpty(wellbeing) && _.isEmpty(zerocarbon))
    return (
      <SectionNewTrendWrapper className='empty'>
        <Image image={`${splitRote(router)}/static/images/Logo news trend test.png`} title='new-trend' ignoreLazy={false} external={false} />
      </SectionNewTrendWrapper>
    );
  const [propertyInsideImgError, setPropertyInsideImgError] = useState(false);
  const [dataLists, setDataLists] = useState<any[]>([]);
  const [tagName, setTagName] = useState<string>('');

  useEffect(() => {
    (async () => {
      const uri = `/api/datasets${convertObjPath({
        limit: 10
      })}`;
      try {
        const resData = await GET(uri);
        if (!_.isEmpty(resData)) {
          const data = _.find(resData, { topic: 'section-news-trend' }) || {};
          const currTagName = convertKey(data?.dataSet, 'tag-name');

          /* -------------------------------- DATA TAGS ------------------------------- */
          if (!_.isEmpty(currTagName)) {
            setTagName(currTagName);
            const resTag = await getTags([
              {
                name: currTagName,
                limit: 2
              }
            ]);
            setDataLists(resTag?.[currTagName] || []);
          }
          /* -------------------------------------------------------------------------- */
        }
      } catch (err: any) {
        console.error(`${timestamp()} ==========> SECTION_ELECTION ERROR : ${uri}`, err.message);
      }
    })();
  }, []);

  return (
    <SectionNewTrendWrapper className='section-new-trend'>
      {propertyInsideImgError && _.isEmpty(dataLists) ? null : (
        <div className='flex-header-property-inside'>
          <div className='img'>
            <Image image={`${splitRote(router)}/static/images/Logo news trend test.png`} title='new-trend' ignoreLazy={false} external={false} />
          </div>
          <div className='header-black'>
            {!_.isEmpty(dataLists) ? (
              <>
                <div className='picture-black'>
                  <Image image='/images/property_inside/property_inside.png' title='property-inside' ignoreLazy={false} external={false} />
                </div>
                <ul className='ul-black'>
                  {_.map(dataLists, (ele, ind) => (
                    <li key={ind}>
                      <CardH
                        data={ele}
                        showPublishDate={true}
                        showTimeAgo={false}
                        showBlurb={false}
                        showCountView={false}
                        // title={ele.title}
                        // path={ele.link}
                        // pageSection='section-2'
                        eventDataLayer={{
                          section: 'section-new-trend',
                          // name: ele?.title || '',
                          // link: ele?.link,
                          // page: 'section-new-trend',
                          position: `${ind + 1}`
                        }}
                      />
                    </li>
                  ))}
                  <li className='read-more'>
                    <a href={`/tags/${tagName}`}>
                      <p className='read-more-inline'>
                        <GrFormNextLink /> &nbsp; อ่านทั้งหมด
                      </p>
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <div className='full-picture-black'>
                <Image image='/images/property_inside/property_inside.png' title='new-trend' ignoreLazy={false} external={false} onError={setPropertyInsideImgError} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className='section-new-trend'>
        {zerocarbon?.[0] && (
          <div className='card card__zero-carbon'>
            <div className='header'>
              <span className='title line-clamp --1'>ZERO CARBON</span>
              <a href={`/tags/${tagName}`} className='read-more'>
                อ่านทั้งหมด
              </a>
            </div>
            <CardH
              data={zerocarbon?.[0]}
              showPublishDate={false}
              showTimeAgo={false}
              showBlurb={false}
              showCountView={false}
              eventDataLayer={{
                section: 'section-new-trend',
                position: '1'
              }}
            />
          </div>
        )}
        {wealthtech?.[0] && (
          <div className='card card__wealth-tech'>
            <div className='header'>
              <span className='title line-clamp --1'>WEALTH TECH</span>
              <a href={`/tags/${tagName}`} className='read-more'>
                อ่านทั้งหมด
              </a>
            </div>
            <CardH
              data={wealthtech?.[0]}
              showPublishDate={false}
              showTimeAgo={false}
              showBlurb={false}
              showCountView={false}
              eventDataLayer={{
                section: 'section-new-trend',
                position: '4'
              }}
            />
          </div>
        )}
        {wellbeing?.[0] && (
          <div className='card card__wellbeing'>
            <div className='header'>
              <span className='title line-clamp --1'>HEALTH & WELLBEING</span>
              <a href={`/tags/${tagName}`} className='read-more'>
                อ่านทั้งหมด
              </a>
            </div>
            <CardH
              data={wellbeing?.[0]}
              showPublishDate={false}
              showTimeAgo={false}
              showBlurb={false}
              showCountView={false}
              eventDataLayer={{
                section: 'section-new-trend',
                position: '3'
              }}
            />
          </div>
        )}
        {canabiz?.[0] && (
          <div className='card card__canabiz'>
            <div className='header'>
              <span className='title line-clamp --1'>CANABIZ เศรษฐกิจกัญชา</span>
              <a href={`/tags/${tagName}`} className='read-more'>
                อ่านทั้งหมด
              </a>
            </div>
            <CardH
              data={canabiz?.[0]}
              showPublishDate={false}
              showTimeAgo={false}
              showBlurb={false}
              showCountView={false}
              eventDataLayer={{
                section: 'section-new-trend',
                position: '4'
              }}
            />
          </div>
        )}
      </div>
    </SectionNewTrendWrapper>
  );
};

const SectionNewTrendWrapper = styled.div`
  &.empty {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .flex-header-property-inside {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    .img {
      width: 38%;
      height: auto;
      @media (max-width: 991px) {
        width: 100%;
        padding: 15px 60px;
      }
      @media (max-width: 475px) {
        padding: 10px 15px;
      }
    }
    .header-black {
      position: relative;
      align-self: flex-end;
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      gap: 10px;
      padding: 10px;
      margin-top: 15px;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        background: radial-gradient(circle, rgba(92, 82, 99, 1) 0%, rgba(35, 40, 80, 1) 100%);
      }

      .full-picture-black {
        position: relative;
        width: 100%;
        max-width: 320px;
        height: auto;
        margin: 35px 0;
        @media (max-width: 991px) {
          margin-top: 15px;
        }
      }
      .picture-black {
        position: relative;
        width: 35%;
        height: auto;
      }
      .ul-black {
        position: relative;
        width: 65%;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media (max-width: 991px) {
          width: 80%;
        }
        @media (max-width: 475px) {
          width: 90%;
        }
        li {
          border: 1px solid #00bbde;
          padding: 4px 16px;
          width: 100%;
          max-width: 100%;
          height: auto;
          &.read-more {
            border: none;
            padding: 0;
            text-align: end;
            .read-more-inline {
              color: #00ffff;
              padding: 0;
              height: 20px;
              svg {
                position: relative;
                path {
                  fill: #00ffff;
                  stroke: #00ffff;
                }
                animation: mymove 2.5s linear infinite;
                @keyframes mymove {
                  0% {
                    left: 0;
                  }
                  50% {
                    left: 10px;
                  }
                  100% {
                    left: 0;
                  }
                }
              }
            }
          }
          .card-h {
            .info {
              .title {
                color: white;
                font-size: 13px;
                @media (max-width: 991px) {
                  font-size: 15px;
                }
              }
              span {
                color: #a3a1a1;
              }
            }
            &:hover {
              .info {
                .title {
                  color: var(--tertiary-color);
                }
              }
            }
          }
        }
      }
      @media (max-width: 991px) {
        width: 100%;
      }
      @media (max-width: 767px) {
        flex-direction: column;
        align-self: center;
        gap: 20px;
        padding: 10px 0;
        .picture-black {
          margin-top: 15px;
        }
      }
    }
    @media (max-width: 991px) {
      flex-direction: column;
      gap: 0;
    }
  }
  .section-new-trend {
    margin: 16px 0 0 50px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 20px;
    .card {
      .header {
        position: relative;
        padding: 8px 8px 8px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          left: 2px;
          top: 4px;
          border-top: 15px solid transparent;
          border-left: 15px solid rgba(255, 255, 255, 0.4);
          border-bottom: 15px solid transparent;
        }
        .title {
          color: #ffff00;
          font-weight: 700;
          max-width: 80%;
        }
        .read-more {
          color: #fff;
          font-size: 11px;
          padding: 2px 6px;
          border: 1px solid #fff;
          transition: 0.5s;
          &:hover {
            color: #ffff00;
            border: 1px solid #ffff00;
          }
        }
      }
      .card-h {
        .thumb {
          width: 55%;
          aspect-ratio: 4 / 3;
          img {
            aspect-ratio: 4 / 3;
          }
        }
        .info {
          width: 45%;
          padding: 8px 8px 0 0;
          .title {
            color: #fff;
            -webkit-line-clamp: 5;
          }
        }
        &:hover {
          .info {
            .title {
              color: #ffff00;
            }
          }
        }
      }

      &__zero-carbon {
        grid-column: 1 / 7;
        background: #008fe2;
      }
      &__wealth-tech {
        grid-column: 7 / 13;
        background: #f15a24;
      }
      &__wellbeing {
        grid-column: 1 / 7;
        background: #6633cc;
      }
      &__canabiz {
        grid-column: 7 / 13;
        background: #339900;
      }
    }
    @media (max-width: 991px) {
      margin: 16px 0 0;
    }
    @media (max-width: 767px) {
      .card {
        &__zero-carbon,
        &__wealth-tech,
        &__wellbeing,
        &__canabiz {
          grid-column: 1 / 13;
        }
      }
    }
  }
`;

export default SectionNewTrend;
