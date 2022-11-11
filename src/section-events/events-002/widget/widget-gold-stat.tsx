import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { CLIENT_GSERVICE_URL } from '../../../constants';
import { IResponseGold } from 'interface/widgets-response';
import styled from '@emotion/styled';

const WidgetGoldStat: NextPage = () => {
  const [dataGold, setDataGold] = useState<IResponseGold | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res: Response = await fetch(`${CLIENT_GSERVICE_URL}/gold`);
        const resJson: IResponseGold = await res.json();
        if (!resJson) throw new TypeError();
        setDataGold(resJson);
      } catch (err) {
        console.error('==========> WIDGET_GOLD ERROR :', err);
      }
    })();
  }, []);

  if (dataGold === null) return null;
  const dataUpdate: string = dayjs(dataGold?.datetime).locale('th').format('DD MMM YYYY');

  return (
    <WidgetWrapper>
      <div className='widget-gold-stat'>
        <h2>ราคาทองคำ</h2>
        <div className='widget-gold-stat-box'>
          <ul>
            <li>95.5%</li>
            <li>รับซื้อ (บาท)</li>
            <li>ขายออก (บาท)</li>
          </ul>
          <ul>
            <li>ทองคำแท่ง</li>
            <li>{dataGold?.lblBLBuy}</li>
            <li>{dataGold?.lblBLSell}</li>
          </ul>
          <ul>
            <li>ทองรูปพรรณ</li>
            <li>{dataGold?.lblOMBuy}</li>
            <li>{dataGold?.lblOMSell}</li>
          </ul>
        </div>
        <p className='date-update-widget'>อัพเดท {dataUpdate}</p>
      </div>
    </WidgetWrapper>
  );
};

export default WidgetGoldStat;

const WidgetWrapper = styled.div`
  padding: 30px 15px;
  .widget-gold-stat {
    h2 {
      font-size: 25px;
      font-weight: 500;
      margin-bottom: 18px;
    }

    .widget-gold-stat-box {
      ul {
        list-style: none;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
        padding: 6px 20px;
        margin: 5px auto;

        background: rgb(252, 252, 252);
        background: linear-gradient(90deg, rgb(248, 248, 248) 10%, rgba(255, 255, 255, 1) 100%);
        border-radius: 15px;
        box-shadow: 3px 3px 9px rgba(65, 65, 65, 0.1);
        text-align: center;

        &:nth-child(1) {
          padding: 10px 15px;
          background: none;
          box-shadow: none;
          margin: 0 auto;
          color: var(--tertiary-color);
          border-radius: 0;
          border-bottom: 1px solid var(--tertiary-color);

          li {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: -5px;
          }
        }

        li {
          width: 105px;
          font-size: 13px;
        }

        @media (max-width: 475px) {
          padding: 6px 0;
        }
      }
    }
  }
  .date-update-widget {
    font-size: 12px;
    text-align: right;
    margin-top: 5px;
  }
`;
