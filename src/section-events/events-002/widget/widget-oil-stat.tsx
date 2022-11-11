import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { CLIENT_GSERVICE_URL } from '../../../constants';
import { IResponseOil } from 'interface/widgets-response';
import styled from '@emotion/styled';

const WidgetOilStat: NextPage = () => {
  const [dataOil, setDataOil] = useState<IResponseOil | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res: Response = await fetch(`${CLIENT_GSERVICE_URL}/oil`);
        const resJson: IResponseOil = await res.json();
        if (!resJson) throw new TypeError();
        setDataOil(resJson);
      } catch (err) {
        console.error('==========> WIDGET_OIL ERROR :', err);
      }
    })();
  }, []);

  if (dataOil === null) return null;
  const dataUpdate: string = dayjs(dataOil?.datetime).locale('th').format('DD MMM YYYY');

  return (
    <WidgetWrapper>
      <div className='widget-oil-stat'>
        <h2>ราคาน้ำมัน</h2>
        <div className='widget-oil-stat-box'>
          <div className='widget-oil-stat-list --head'>
            <p>ชนิด</p>
            <p>บาท/ลิตร</p>
          </div>
          <div className='widget-oil-stat-list'>
            <p>ดีเซล</p>
            <p>
              <strong>{dataOil.Diesel}</strong>
            </p>
          </div>
          <div className='widget-oil-stat-list'>
            <p>ดีเซล B10</p>
            <p>
              <strong>{dataOil.DieselB10}</strong>
            </p>
          </div>
          <div className='widget-oil-stat-list'>
            <p>แก๊สโซฮอล์ 91</p>
            <p>
              <strong>{dataOil.Gasohol91}</strong>
            </p>
          </div>
          <div className='widget-oil-stat-list'>
            <p>แก๊สโซฮอล์ 95</p>
            <p>
              <strong>{dataOil.Gasohol95}</strong>
            </p>
          </div>
          <div className='widget-oil-stat-list'>
            <p>แก๊สโซฮอล์ E20</p>
            <p>
              <strong>{dataOil.GasoholE20}</strong>
            </p>
          </div>
        </div>
        <p className='date-update-widget'>อัพเดท {dataUpdate}</p>
      </div>
    </WidgetWrapper>
  );
};

export default WidgetOilStat;

const WidgetWrapper = styled.div`
  padding: 30px 15px;
  p {
    margin: 0;
  }
  .widget-oil-stat {
    h2 {
      font-size: 25px;
      font-weight: 500;
      margin-bottom: 18px;
      @media (max-width: 475px) {
        margin-bottom: 10px;
      }
    }

    .widget-oil-stat-box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .widget-oil-stat-list {
        width: 100%;
        background: rgb(252, 252, 252);
        background: linear-gradient(90deg, rgb(248, 248, 248) 10%, rgba(255, 255, 255, 1) 100%);
        padding: 9.5px 25px;
        border-radius: 15px;
        box-shadow: 3px 3px 9px rgba(65, 65, 65, 0.1);
        margin: 4px auto;
        display: flex;
        justify-content: space-between;

        &.--head {
          background: none;
          box-shadow: none;
          padding: 6px 25px;
          border-radius: 0;
          border-bottom: 1px solid var(--tertiary-color);
          p {
            color: var(--tertiary-color);
          }
        }

        p {
          font-weight: 500;
          font-size: 14px;
          span,
          strong {
            color: #2f2f2f;
            font-weight: 400;
            font-size: 13px;
          }

          span {
            margin-left: 3px;
            color: #777;
          }
        }

        @media (max-width: 475px) {
          width: 100%;
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
