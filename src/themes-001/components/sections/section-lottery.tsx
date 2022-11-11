import styled from '@emotion/styled';
import _ from 'lodash';
import { NextPage } from 'next';
import { useState } from 'react';
import WidgetLotteryCheck from '../widget/widget-lottery-check';
import WidgetLotteryResult from '../widget/widget-lottery-result';
import { color } from 'utils/theme';
import { splitRote } from 'utils/helper';
import { NextRouter, useRouter } from 'next/router';

type Props = {
  lottery?: any;
};
const SectionLottery: NextPage<Props> = ({ lottery }) => {
  const router: NextRouter = useRouter();
  if (_.isEmpty(lottery)) return null;
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  return (
    <SectionWrapper className='container' router={router}>
      <div className='block1'>
        <div className='widget-lottery-title--block1'>
          <h2>ผลสลากกินแบ่งรัฐบาล</h2>
          <p>งวดประจำวันที่ {lottery?.datePeriod} </p>
        </div>
        <div className='widget-lottery'>
          <div className='widget-lottery-area-reward --1'>
            <div className='widget-lottery-reward'>
              <p>
                <strong>{lottery?.firstAward}</strong>
              </p>
            </div>
            <div className='widget-lottery-title'>
              <h3>รางวัลที่ 1</h3>
              <h4>รางวัลละ 6,000,000 บาท</h4>
            </div>
          </div>
          <div className='widget-lottery-area-reward --2'>
            <div className='widget-lottery-reward'>
              <p>
                <strong>{lottery.lastTwoNumber}</strong>
              </p>
            </div>
            <div className='widget-lottery-title'>
              <h3>เลขท้าย 2 ตัว</h3>
              <h4>รางวัลละ 2,000 บาท</h4>
            </div>
          </div>
          <div className='widget-lottery-area-reward  --3'>
            <div className='widget-lottery-reward'>
              <p>
                <strong>
                  {lottery.frontThreeNumber.map((item: any, i: any) => (
                    <span key={i}>{item}</span>
                  ))}
                </strong>
              </p>
            </div>
            <div className='widget-lottery-title'>
              <h3>เลขหน้า 3 ตัว</h3>
              <h4>รางวัลละ 4,000 บาท</h4>
            </div>
          </div>
          <div className='widget-lottery-area-reward  --4'>
            <div className='widget-lottery-reward'>
              <p>
                <strong>
                  {lottery.behindThreeNumber.map((item: any, i: any) => (
                    <span key={i}>{item}</span>
                  ))}
                </strong>
              </p>
            </div>
            <div className='widget-lottery-title'>
              <h3>เลขท้าย 3 ตัว</h3>
              <h4>รางวัลละ 4,000 บาท</h4>
            </div>
          </div>
        </div>
      </div>
      <div className='block2'>
        <div className='widget-lottery-title--block2'>
          <div>{!toggle ? <WidgetLotteryCheck inPage='index' setToggle={setToggle} toggle={toggle} /> : <WidgetLotteryResult inPage='index' setToggle={setToggle} toggle={toggle} />}</div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SectionLottery;

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'block1 block1 block1 block2 block2';
  background: ${({ router }: any) => `linear-gradient(180deg, ${color.lottery} 14.21%, rgba(74, 36, 10, 0) 100%), url(${splitRote(router)}/images/image-lottery.jpg) fixed`};
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    grid-template-areas:
      'block1 block1 block1 block1 block1'
      'block2 block2 block2 block2 block2';
  }

  .block1 {
    grid-area: block1;
    .widget-lottery-title {
      h4 {
        margin: 0;
        font-weight: 300;
        font-size: 14px;
      }
      &--block1 {
        text-align: center;
        margin-bottom: 20px;
        color: #fff;
        h2 {
          font-weight: 700;
          font-size: 48px;
          @media (max-width: 1024px) {
            font-size: 38px;
          }
          @media (max-width: 768px) {
            font-size: 28px;
          }
        }
      }
    }
    .widget-lottery {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      @media (max-width: 475px) {
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
      }
    }
    .widget-lottery-area-reward {
      display: flex;
      flex-direction: column;

      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 15px;
      padding: 20px 15px;
      text-align: center;
      width: 100%;
      max-width: 100%;

      &.--1,
      &.--2 {
        .widget-lottery-reward {
          p {
            text-align: center;
            font-weight: 700;
            font-size: 48px;
            color: var(--tertiary-color);
            @media (max-width: 1024px) {
              font-size: 38px;
            }
          }
        }
      }
      &.--3,
      &.--4 {
        .widget-lottery-reward {
          p {
            text-align: center;
            font-weight: 700;
            font-size: 32px;
            color: #000;
            strong {
              display: flex;
              gap: 20px;
              flex-direction: row;
              justify-content: center;
            }
          }
        }
      }
    }
  }
  .block2 {
    grid-area: block2;
    border-left: 1px solid #fff;
    margin: auto 0 0 30px;
    padding-left: 30px;
    @media (max-width: 768px) {
      border-left: unset;
      margin: 30px 0 0 0;
      padding-left: 0;
    }
    .widget-lottery-title {
      &--block2 {
        text-align: center;
        color: #fff;
        h2 {
          font-weight: 600;
          font-size: 24px;
        }
      }
    }
  }
`;
