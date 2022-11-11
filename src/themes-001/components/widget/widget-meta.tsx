import { memo } from 'react';
import { IMetaData } from 'interface/section';
import { NextPage } from 'next';
import styled from '@emotion/styled';

type Props = {
  data: IMetaData;
  showDescription?: boolean;
};
const WidgetMeta: NextPage<Props> = ({ data, showDescription = false }) => {
  return (
    <WidgetWrapper className='widget-meta'>
      <h1 className='meta-title'>
        {data?.heading && <div className='heading'>{data?.heading}</div>}
        <span> {data?.title}</span>
      </h1>
      <h2 className={`meta-description ${showDescription ? '--active' : '--inactive'}`}>{data?.description}</h2>
    </WidgetWrapper>
  );
};

const WidgetWrapper = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
  margin: auto;
  .meta-title {
    position: relative;
    color: var(--primary-color);
    font-size: 32px;
    font-weight: 600;
    line-height: 1.45;
    line-break: anywhere;
    text-align: justify;
    text-transform: capitalize;

    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;

    &:before {
      content: '';
      width: 100%;
      height: 5px;
      position: absolute;
      bottom: 0;
      background: var(--primary-color);
      background: linear-gradient(90deg, var(--primary-color) 50%, rgba(136, 136, 136, 0.6) 60%);
      @media (max-width: 900px) {
        height: 5px;
      }
    }
    .heading {
      color: #2e2e2e;
      font-size: 24px;
      margin-right: 20px;
      font-weight: 700;
      display: flex;
      align-items: flex-end;
      padding-bottom: 5px;
    }
    @media (max-width: 1024px) {
      .heading {
        font-size: 16px;
      }
    }

    @media (max-width: 475px) {
      display: block;
      font-size: 30px;
      .heading {
        font-size: 20px;
      }
    }
  }
  .meta-description {
    text-transform: capitalize;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
    /* padding-top: 15px; */
    color: var(--primary-color);
    opacity: 0.8;

    &.--active {
      display: block;
    }
    &.--inactive {
      display: none;
    }
  }
`;

export default memo(WidgetMeta);
