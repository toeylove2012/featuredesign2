import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { convertArrPathLottery, splitRote, timestamp } from 'utils/helper';
import { LOTTO_DATA } from 'themes-001/components/redux/navSlice';
import { useRouter } from 'next/router';
// import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { IDataLayerGlobal } from 'interface/data-layer';
import styled from '@emotion/styled';
import { GET } from 'services';
type Props = {
  toggle?: any;
  setToggle?: any;
  inPage?: string;
  eventDataLayer?: IDataLayerGlobal;
};
const WidgetLotteryCheck = ({ toggle, setToggle, inPage = '', eventDataLayer }: Props) => {
  const [duration, setDuration]: any = useState(null);
  const dispatch = useDispatch();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  }: any = useForm();
  const router = useRouter();
  const [selectdate, setSelectdate] = useState(null);

  useEffect(() => {
    (async () => {
      const uri = '/api/v1.0/lottory/selectdate';
      try {
        const data = await GET(uri);
        if (!_.isEmpty(data)) {
          if (data) setValue('date', data[0].key);
          return setDuration(data);
        }
      } catch (err: any) {
        console.error(`${timestamp()} ==========> SELETE_DATE ERROR : ${uri}`, err.message);
      }
    })();
  }, [router.isReady]);

  const handleSearch = async (_data: any) => {
    if (_.isEmpty(_data)) return null;
    const dateDefault = _data?.date || (duration && duration[0].value);
    const lottos = [_data?.lotto1, _data?.lotto2, _data?.lotto3].filter(check => check?.length === 6);
    const lottosCheck: any = convertArrPathLottery({ lottos: lottos });
    const uri = `/api/v1.0/lottory/${dateDefault}${lottosCheck}`;
    try {
      // ! DATALAYER
      // console.log(lottos, dateDefault, lottosCheck, uri);
      setSelectdate(dateDefault);

      if (!_.isEmpty(lottos)) {
        {
          router.asPath === `${splitRote(router)}` && setToggle(!toggle);
        }

        console.log(uri);
        const resData = await GET(uri, false, true);
        if (!_.isEmpty(resData)) {
          dispatch(LOTTO_DATA(resData));
        }
      }
    } catch (err: any) {
      console.error(`${timestamp()} ==========> LOTTERY_CHECK ERROR : ${uri}`, err.message);
    }
  };
  const structureList = [
    { id: 1, name: 'lotto1' },
    { id: 2, name: 'lotto2' },
    { id: 3, name: 'lotto3' }
  ];

  return (
    <LotteryWrapper className='lottery-wraper'>
      {inPage !== 'index' ? (
        <>
          <h2> ตรวจผลสลากกินแบ่งรัฐบาล </h2>
          <label>งวดประจำวันที่</label>
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className='form-group'>
              <select className='form-control mt-15' {...register('date')}>
                {!_.isEmpty(duration) &&
                  duration.map((item: any, index: any) => (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  ))}
              </select>
            </div>
            {structureList.map((item, index) => (
              <div className='form-group' key={index}>
                <input {...register(item?.name, { pattern: /[0-9]{6}/ })} className='form-control' defaultValue='' maxLength='6' placeholder={`กรอกเลขสลาก ใบที่ ${+index + 1}`} />
                {errors?.[item?.name] && <div className='error-message'> กรุณากรอกเป็นตัวเลข จำนวน 6 หลัก </div>}
              </div>
            ))}
            <button
              type='submit'
              className='custom-btn'
              aria-label='Lotto Submit'
              // ! DATALAYER
              // onClick={() => sendDataLayerGlobal({ ...eventDataLayer, data: { title: selectdate || '', heading: 'ตรวจสลากฯ ของคุณ' } })}
            >
              ตรวจสลากฯ ของคุณ
            </button>
          </form>
        </>
      ) : (
        <>
          <h2> ตรวจผลสลากกินแบ่งรัฐบาล </h2>
          <label>งวดประจำวันที่</label>
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className='form-group'>
              <select className='form-control mt-15' {...register('date')}>
                {!_.isEmpty(duration) &&
                  duration.map((item: any, index: any) => (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  ))}
              </select>
            </div>
            {structureList.map((item, index) => (
              <div className='form-group' key={index}>
                <input {...register(item?.name, { pattern: /[0-9]{6}/ })} className='form-control' defaultValue='' maxLength='6' placeholder={`กรอกเลขสลาก ใบที่ ${+index + 1}`} />
                {errors?.[item?.name] && <div className='error-message'> กรุณากรอกเป็นตัวเลข จำนวน 6 หลัก </div>}
              </div>
            ))}
            <button
              type='submit'
              className='custom-btn'
              aria-label='Lotto Submit'
              // ! DATALAYER
              // onClick={() => sendDataLayerGlobal({ ...eventDataLayer, data: { title: selectdate || '', heading: 'ตรวจสลากฯ ของคุณ' } })}
            >
              ตรวจสลากฯ ของคุณ
            </button>
          </form>
        </>
      )}
    </LotteryWrapper>
  );
};

export default WidgetLotteryCheck;

const LotteryWrapper = styled.div`
  max-width: 480px;
  margin: 0px auto 30px auto;
  text-align: center;

  h3 {
    font-size: 20px;
  }

  .error-message {
    color: #fff;
  }

  .custom-btn {
    color: var(--text-color);
    background-color: var(--quaternary-color);
    /* background: linear-gradient(89.91deg, #8b0c13 0.84%, #ea212d 99.93%); */
    /* border-color: #fff; */
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

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  }
  .form-group {
    margin: 1rem 0;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: 'Prompt', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;
