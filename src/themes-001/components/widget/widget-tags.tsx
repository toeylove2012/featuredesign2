import _ from 'lodash';
import { memo } from 'react';
import { ITags } from 'interface/service';
import { NextPage } from 'next';
import { IDataLayerGlobal } from 'interface/data-layer';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import styled from '@emotion/styled';

import { NextRouter, useRouter } from 'next/router';
import { splitRote } from 'utils/helper';

type Props = {
  color?: string;
  data?: string[] | ITags[];
  title: string;
  desc?: string;
  tagsIndex?: string;
  eventDataLayer: IDataLayerGlobal;
  inPage?: string;
};
const WidgetTags: NextPage<Props> = ({ color, data = [], title, tagsIndex, eventDataLayer, inPage = 'default' }) => {
  if (_.isEmpty(data)) return null;
  const checkID = tagsIndex === 'index';
  const router: NextRouter = useRouter();

  // const themeWhite = _.includes(['category', 'tags', 'search'], inPage);
  // const themeBackground = _.includes(['content'], inPage);
  return (
    <>
      <WidgetWrapper className='widget-tags'>
        {inPage === 'content' && (
          <TagDefault color={color || '#eb2227'} className='tag-content'>
            <ul className='tags-wrapper'>
              <li className='list-item --tag-title'>แท็กที่เกี่ยวข้อง</li>
              {data.map((item: any, i: number) => (
                <li
                  key={i}
                  className='list-item'
                  // ! DATALAYER
                  onClick={() =>
                    sendDataLayerGlobal({
                      ...eventDataLayer,
                      data: {
                        title: checkID ? item?.name : item,
                        index: i + 1,
                        ...eventDataLayer?.data
                      }
                    })
                  }
                >
                  <a href={`${splitRote(router)}/tags/${checkID ? item?.name : item}`} title={`${checkID ? item?.name : item || 'tag'}`} aria-label={`${checkID ? item?.name : item || 'tag'}`}>
                    {checkID ? item?.name : item}
                  </a>
                </li>
              ))}
            </ul>
          </TagDefault>
        )}
        {inPage === 'default' && (
          <TagDefault color={color || '#eb2227'}>
            <div className='text'>
              <div className='title'>{title}</div>
            </div>
            <div className='tags-wrapper'>
              {data.map((item: any, i: number) => (
                <a
                  key={i}
                  className='list-item'
                  href={`${splitRote(router)}/tags/${checkID ? item?.name : item}`}
                  title={`${checkID ? item?.name : item || 'tag'}`}
                  aria-label={`${checkID ? item?.name : item || 'tag'}`}
                  // ! DATALAYER
                  onClick={() =>
                    sendDataLayerGlobal({
                      ...eventDataLayer,
                      data: {
                        title: checkID ? item?.name : item,
                        index: i + 1,
                        ...eventDataLayer?.data
                      }
                    })
                  }
                >
                  {checkID ? item?.name : item}
                </a>
              ))}
            </div>
          </TagDefault>
        )}
      </WidgetWrapper>
    </>
  );
};

export default memo(WidgetTags);
const TagDefault = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  &.tag-content {
    .tags-wrapper {
      .list-item {
        a {
          color: #fff;
        }
        background: #888888;
        &:hover {
          border: 1px solid var(--primary-color);
          a {
            color: var(--primary-color);
          }
          background-color: #fff;
        }
        &.--tag-title {
          background: #2b2b2b;
          cursor: unset;
          color: #fff !important;
        }
      }
    }
  }
  .text {
    .title {
      position: relative;
      font-size: 20px;
      font-weight: 700;
      color: ${props => props.color};
      border-bottom: 2px solid #888888;
      margin-bottom: 20px;
      &::before {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 150px;
        max-width: 100%;
        height: 2px;
        background-color: var(--secondary-color);
      }
    }
  }
  .tags-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    gap: 10px 10px;
    .list-item {
      cursor: pointer;
      padding: 10px 10px 8px 10px;
      border: 1px solid #888888;
      width: max-content;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      color: #000;
      transition: all 300ms ease-in-out;
      text-transform: capitalize;
      &:hover {
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        background-color: #fff;
      }
    }
  }
`;
const WidgetWrapper = styled.div``;
