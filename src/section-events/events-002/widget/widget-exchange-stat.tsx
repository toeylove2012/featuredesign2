import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CLIENT_GSERVICE_URL } from '../../../constants';
import { IResponseGold } from 'interface/widgets-response';
import styled from '@emotion/styled';

const WidgetExchangeStat = () => {
  const [dataExchange, setDataExchange]: any = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res: Response = await fetch(`${CLIENT_GSERVICE_URL}/exchange`);
        const resJson: IResponseGold = await res.json();
        if (!resJson) throw new TypeError();
        setDataExchange(resJson);
      } catch (err) {
        console.error('==========> WIDGET_GOLD ERROR :', err);
      }
    })();
  }, []);

  if (dataExchange === null) return null;
  const newData: any = Object.values(dataExchange).slice(0, 6);
  const dataUpdate = dayjs(dataExchange?.datetime).locale('th').format('DD MMM YYYY');

  return (
    <WidgetWrapper className='widget-exchange-stat'>
      <h2>อัตราแลกเปลี่ยน</h2>
      <div className='widget-exchange-stat-box'>
        {newData.map((data: any, i: number) => (
          <ul key={i}>
            {[...data].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
      <p className='date-update-widget'>อัพเดท {dataUpdate}</p>
    </WidgetWrapper>
  );
};

const WidgetWrapper = styled.div`
  padding: 30px 15px;
  h2 {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 18px;
    @media (max-width: 475px) {
      margin-bottom: 10px;
    }
  }
  .widget-exchange-stat-box {
    width: 100%;
    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 13px;
      text-align: center;

      background: rgb(252, 252, 252);
      background: linear-gradient(90deg, rgb(248, 248, 248) 10%, rgba(255, 255, 255, 1) 100%);
      padding: 11px 15px;
      border-radius: 15px;
      box-shadow: 3px 3px 9px rgba(65, 65, 65, 0.1);
      margin: 6px auto;

      &:nth-child(1) {
        font-size: 14px;
        font-weight: 500;
        color: var(--tertiary-color);
        border-radius: 0;
        background: none;
        box-shadow: none;
        padding: 8px 15px;
        margin: 0 auto;
        border-bottom: 1px solid var(--tertiary-color);

        li {
          border-radius: 0;
          background: none;
          box-shadow: none;
        }
      }

      &:nth-last-child(1) {
        border-bottom: none;
      }

      li {
        width: 105px;
      }

      @media (max-width: 767px) {
        padding: 11px 0;
      }
    }
  }
  .date-update-widget {
    font-size: 12px;
    text-align: right;
    margin-top: 5px;
  }
`;

export default WidgetExchangeStat;
