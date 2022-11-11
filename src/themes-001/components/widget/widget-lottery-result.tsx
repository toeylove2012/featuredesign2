import { useSelector } from 'react-redux';
import { FiFrown, FiSmile } from 'react-icons/fi';
import _ from 'lodash';
import numeral from 'numeral';
import styled from '@emotion/styled';

const WidgetLotteryResult = ({ toggle, setToggle, inPage = '' }: any) => {
  const lottoResult = useSelector((state: any) => state?.navData?.result);

  if (_.isEmpty(lottoResult?.results)) return null;
  return (
    <LotteryWrapper>
      {inPage !== 'index' ? (
        <>
          <h3>ผลสลากกินแบ่งรัฐบาล</h3>
          <p>{lottoResult.date}</p>
          {lottoResult.results.map((item: any, i: any) => (
            <div className='lottery-result-list --index' key={i}>
              <h4 className={`lottery-result-item --index ${item.award.length === 0 ? 'danger' : 'green'}`}>{item.lottoNo}</h4>
              {item.award.length === 0 ? (
                <h5 className='lottery-result-item --index danger'>
                  คุณไม่ถูกรางวัล
                  <FiFrown color={'red'} />
                </h5>
              ) : (
                item.award.map((data: any, i: any) => (
                  <h5 key={i} className={`lottery-result-item ${i + 1 > 1 ? '--full' : ''} --index`}>
                    คุณถูก{data.award} มูลค่า <span>{numeral(data.price).format('0,0')} บาท</span>
                    <FiSmile color={'green'} />
                  </h5>
                ))
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>ผลสลากกินแบ่งรัฐบาล</h3>
          <p>{lottoResult.date}</p>
          {lottoResult.results.map((item: any, i: any) => (
            <div className='lottery-result-list --index' key={i}>
              <h4 className={`lottery-result-item --index ${item.award.length === 0 ? 'danger' : 'green'}`}>{item.lottoNo}</h4>
              {item.award.length === 0 ? (
                <h5 className='lottery-result-item --index danger'>
                  คุณไม่ถูกรางวัล
                  <FiFrown color={'red'} />
                </h5>
              ) : (
                item.award.map((data: any, i: any) => (
                  <h5 key={i} className={`lottery-result-item ${i + 1 > 1 ? '--full' : ''} --index`}>
                    คุณถูก{data.award} มูลค่า <span>{numeral(data.price).format('0,0')} บาท</span>
                    <FiSmile color={'green'} />
                  </h5>
                ))
              )}
            </div>
          ))}
          <button
            type='submit'
            className='custom-btn'
            aria-label='Lotto Submit'
            onClick={() => setToggle(!toggle)}
            // ! DATALAYER
            // onClick={() => sendDataLayerGlobal({ ...eventDataLayer, data: { title: selectdate || '', heading: 'ตรวจสลากฯ ของคุณ' } })}
          >
            ตรวจสลากฯอีกครั้ง
          </button>
        </>
      )}
    </LotteryWrapper>
  );
};

const LotteryWrapper = styled.div`
  padding: 20px;
  /* margin-bottom: 20px; */
  background-color: #fff;
  border-radius: 15px;
  text-align: center;

  h3,
  h4,
  h5 {
    margin-bottom: 0px;
    color: #000;
  }
  h3 {
    color: #bb915b;
    font-size: 28px;
  }
  p {
    color: #bb915b;
    margin-top: 5px;
  }

  .lottery-result-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin: 20px auto;
    border-bottom: 1px solid #bfbfbf;
    padding: 10px;
    @media (max-width: 690px) {
      justify-content: flex-start;

      h4,
      h5 {
        text-align: left;
      }
    }

    h4 {
      margin-top: 0;
      font-size: 24px;
      color: #408302;
    }
    h5 {
      color: #408302;
      margin-top: 0;
      font-size: 14px;
      svg {
        /* font-size: 20px; */
        margin-left: 10px;
        vertical-align: sub;
      }
    }

    .lottery-result-item {
      &.--full {
        width: 100%;
        text-align: end;
      }
      &.danger {
        color: red;
      }
      &.green {
        color: #408302;
      }

      @media (max-width: 540px) {
        width: 100% !important;
        margin-bottom: 15px;
        &.--full {
          text-align: center;
        }
      }
    }
  }

  .custom-btn {
    color: #fff;
    background-color: var(--quaternary-color);
    border-radius: 10px;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: 'Prompt', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    border: 1px solid var(--quaternary-color);
    cursor: pointer;

    &:hover {
      color: #fff;
      transition: all 0.3s ease-out;
    }
  }
`;

export default WidgetLotteryResult;
