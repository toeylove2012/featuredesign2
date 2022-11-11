import CardVEV from 'section-events/events-001/components/card-v-ev';
import { GrFormNextLink } from 'react-icons/gr';
import _ from 'lodash';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { IArticle } from 'interface/section';
import Image from 'section-events/events-001/components/image';

type Props = {
  dataEV?: IArticle[];
};
const SectionEV: NextPage<Props> = ({ dataEV = [] }) => {
  if (_.isEmpty(dataEV)) return null;
  const cloneData = [...dataEV];
  const dataShift = cloneData.shift();
  const dataSlice = cloneData.slice(0, 3);
  return (
    <SectionEVWrapper className='section-ev'>
      <div className='ev-logo'>
        <Image image='/images/property_inside/logo-EV.svg' title='ev-logo' ignoreLazy={false} external={false} specialNews={true} />
      </div>
      <div className='ev-list'>
        <CardVEV data={dataShift} path={dataShift?.link} />
        <ul>
          {dataSlice.map((item, index) => (
            <li key={index}>
              <a href={item.link}>
                <Image image='/images/property_inside/icon-playlist-1.svg' title='icon' ignoreLazy={false} external={false} specialNews={true} />
                <p>{item.title}</p>
              </a>
            </li>
          ))}
          <li className='read-more'>
            <a href='/tags/EV' className='read-more-ev'>
              <GrFormNextLink />
              <p>อ่านทั้งหมด</p>
            </a>
          </li>
        </ul>
      </div>
    </SectionEVWrapper>
  );
};

const SectionEVWrapper = styled.div`
  position: relative;
  background-color: #000;
  color: #fff;
  margin-top: 15px;
  .ev-logo {
    img {
      width: 100%;
      height: 70px;
      object-fit: cover;
      @media (max-width: 991px) {
        height: 100px;
      }
    }
  }
  .ev-list {
    position: relative;
    z-index: 2;
    padding: 0 15px;
    ul {
      list-style: none;
      padding: 0;

      li {
        border: 2px solid rgb(182, 182, 182);
        padding: 4px 6px;
        margin-bottom: 15px;
        &.read-more {
          border: none;
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
          .read-more-ev {
            color: #00ffff;
            justify-content: center;
          }
        }
        a {
          //task
          display: flex;
          text-decoration: none;
          align-items: center;
          color: #fff;
          transition: 0.5s;
          &:hover {
            color: var(--tertiary-color);
          }
        }
        img {
          width: 20px;
          height: auto;
        }
        p {
          padding-left: 10px;
          font-size: 16px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 992px) and (max-width: 1200px) {
          &:nth-child(3) {
            display: none;
          }
        }
      }
    }
  }
`;

export default SectionEV;
