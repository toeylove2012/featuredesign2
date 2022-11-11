import _ from 'lodash';
import { memo } from 'react';
import { NextPage } from 'next';
import { IArticle } from 'interface/section';
import { IBreadcrumbData } from 'interface/widgets';
import styled from '@emotion/styled';
import { HiOutlineChevronRight } from 'react-icons/hi';

type Props = {
  color?: string;
  data: IArticle;
  router?: any;
};
const WidgetBreadcrumb: NextPage<Props> = ({ color = '#000', data, router = null }) => {
  if (_.isEmpty(data)) return null;

  const _data: IBreadcrumbData[] = [
    {
      icon: '',
      nameTh: 'หน้าแรก',
      nameEng: 'หน้าแรก',
      link: null
    },
    {
      icon: <HiOutlineChevronRight />,
      nameTh: router?.pathname !== '/galleries/[id]' ? `${data.section?.th}` || '' : 'แกลลอรี่',
      nameEng: data.section?.en || '',
      link: router?.pathname !== '/galleries/[id]' ? `/category/${data.section?.en || ''}` : ''
    },
    {
      icon: <HiOutlineChevronRight />,
      nameTh: router?.pathname !== '/galleries/[id]' ? data.subCategory?.th : data.title,
      nameEng: data.subCategory?.en || '',
      link: router?.pathname !== '/galleries/[id]' ? `/category/${data.section?.en || ''}/${data.subCategory?.en || ''}` : router.asPath
    }
  ];
  return (
    <WidgetWrapper id='widget-breadcrumb' color={color}>
      <div className='cat--title'>
        <p>{data.subCategory?.th ? data.subCategory?.th : data.section?.th}</p>
      </div>
      <nav aria-label='breadcrumb'>
        <ul className='breadcrumb'>
          {_data.map(
            (item: IBreadcrumbData, index: number) =>
              item.nameTh && (
                <li key={index} className='breadcrumb-item'>
                  {item.icon}
                  {item.link ? (
                    <a href={item.link} title={item.nameTh} aria-label={item.nameTh}>
                      หมวดหมู่: <span>"{item.nameTh}"</span>
                    </a>
                  ) : (
                    <a href='/' title={item.nameTh} aria-label={item.nameTh}>
                      {item.nameTh}
                    </a>
                  )}
                </li>
              )
          )}
          {data.title && (
            <li className='breadcrumb-item title'>
              <HiOutlineChevronRight />
              <span>{data.title}</span>
            </li>
          )}
        </ul>
      </nav>
    </WidgetWrapper>
  );
};

const WidgetWrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 1300px;
  margin: auto;
  padding-top: 30px;
  @media (max-width: 690px) {
    flex-direction: column;
  }
  .cat--title {
    position: relative;
    background: var(--primary-color);
    max-width: max-content;
    padding: 8px 16px;
    color: #fff;
    margin: 0 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    @media (max-width: 475px) {
      padding: 2px 8px;
      margin: 0 10px 0 0;
    }
    p {
      font-size: 16px;
      font-weight: 500;
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (max-width: 475px) {
        font-size: 12px;
      }
    }
  }
  ul.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 15px 0 15px;
    @media (max-width: 768px) {
      padding: 10px 0 10px;
    }
    @media (max-width: 475px) {
      padding: 5px 0 5px;
    }
    a {
      text-transform: capitalize;
      color: ${props => props.color};
      font-weight: 400;
      font-size: 14px;
      &:hover {
        color: #979797;
      }
    }
    svg {
      color: ${props => props.color};
      font-weight: 300;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.title {
        @media (max-width: 690px) {
          display: none;
        }
      }

      a {
        font-size: 16px;
        font-weight: 500;
        @media (max-width: 768px) {
          font-size: 14px;
        }
        @media (max-width: 475px) {
          font-size: 12px;
        }
        span {
          color: var(--primary-color);
        }
      }
      &:not(:last-child) {
        span {
          color: #aaaaaa;
        }
      }
      &:last-child {
        span {
          color: var(--primary-color);
        }
        a {
          color: #aaaaaa;
          pointer-events: none;
          user-select: none;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    ul.breadcrumb {
      a {
        font-size: 14px;
      }
    }
  }
`;

export default memo(WidgetBreadcrumb);
