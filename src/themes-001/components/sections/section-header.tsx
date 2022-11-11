import styled from '@emotion/styled';
import { Media } from 'interface/media';
import _ from 'lodash';
import { NextPage } from 'next';
import { FiChevronRight } from 'react-icons/fi';
import useResponsive from 'utils/devices';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import { useState } from 'react';
import { splitRote } from 'utils/helper';
import { NextRouter, useRouter } from 'next/router';

type Props = {
  fontColor?: string;
  bgColor?: string;
  data?: any;
  link?: string;
  tabs?: boolean;
  setDataItem?: any;
  setActive?: any;
  dataItem?: any;
  active?: any;
  className?: string;
  showReadmore?: boolean;
  style?: string;
};
const SectionHeader: NextPage<Props> = ({ fontColor = '', bgColor = '', data, link, tabs = false, setDataItem, setActive, dataItem, active, className = '', showReadmore = true, style = '' }) => {
  const responsive: Media = useResponsive();
  const router: NextRouter = useRouter();
  if (_.isEmpty(data)) return null;
  const [toggleBar, setToggleBar] = useState(false);
  const handleClick = () => {
    setToggleBar(!toggleBar);
  };

  return (
    <>
      <SectionWrapper fontColor={fontColor} bgColor={bgColor}>
        {style === '' && (
          <>
            {tabs && data ? (
              <div className='heading'>
                <div className='heading-active'>
                  <a href={`${splitRote(router)}${dataItem.link || '#'}`}>
                    <p className=''>{dataItem?.title || 'ข่าวล่าสุด'}</p>
                  </a>
                </div>
                {responsive.isLaptop && (
                  <ul className='heading-click desktop'>
                    {_.map(data, (item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setDataItem(data[index]);
                          setActive({ key: index, status: true });
                        }}
                      >
                        <p className={`${active.status && active.key === index ? 'current' : ''}`}>{item.title}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {responsive.isMobile && (
                  <div className='heading-bar'>
                    <div className='heading-bar--title'>
                      <p>{dataItem?.title || 'ข่าวล่าสุด'}</p>
                      {toggleBar ? <HiOutlineChevronDown onClick={() => handleClick()} /> : <HiOutlineChevronRight onClick={() => handleClick()} />}
                    </div>
                    {toggleBar && (
                      <ul className='heading-click--absolute mobile'>
                        {_.map(data, (item, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setDataItem(data[index]);
                              setActive({ key: index, status: true });
                            }}
                          >
                            <p className={`${active.status && active.key === index ? 'current' : ''}`}>{item.title}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={`heading ${className}`}>
                <div className='heading-active'>
                  <a href={`${splitRote(router)}${link || '#'}`}>
                    <p className=''>{data || 'ข่าวล่าสุด'}</p>
                  </a>
                </div>
                {showReadmore && (
                  <ul className='heading-click'>
                    <li>
                      <a href={`${splitRote(router)}${link || '#'}`}>
                        <p>
                          ดูทั้งหมด <FiChevronRight size={18} />
                        </p>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </>
        )}
        {style === 'default' && (
          <div className={`heading ${className} default`}>
            <div className='heading-active'>
              <a href={`${splitRote(router)}${link || '#'}`}>
                <p className=''>{data || 'ข่าวล่าสุด'}</p>
              </a>
            </div>
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default SectionHeader;

const SectionWrapper = styled.div<{ fontColor: string; bgColor: string }>`
  .heading {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2b2b2b;

    &.contnet {
      position: relative;
      background: #fff;
      border-bottom: 1px solid #aaa;
      &::before {
        content: '';
        position: absolute;
        bottom: -1px;
        background-color: var(--primary-color);
        height: 1px;
        width: 150px;
      }
      .heading-active {
        background-color: #fff;
        padding: 8px 16px 8px 0;
        a {
          color: #000;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
    &.default {
      border-bottom: unset !important;
      .heading-active {
        padding: 0;
        background-color: transparent;
        a {
          font-size: 28px;
          font-weight: 700;
          color: #000 !important;
          @media (max-width: 690px) {
            font-size: 18px;
            color: #000 !important;
          }
        }
      }
    }
    &.sub-menu {
      background: transparent;
      border-bottom: 1px solid #aaaaaa;
      .heading-click {
        li {
          a {
            p {
              color: ${props => props.fontColor || '#aaaaaa'};
              font-weight: 500;
              font-size: 14px;
            }
          }
        }
      }
    }
    .heading-active {
      background: ${props => props.bgColor || 'var(--primary-color)'};
      padding: 8px 16px;
      a {
        color: ${props => props.fontColor || 'var(--text-color)'};
      }
    }
    .heading-bar {
      .heading-bar--title {
        display: flex;
        align-items: center;
        color: #fff;
        svg {
          margin: 0 5px;
        }
      }
    }
    .heading-click {
      &--absolute {
        position: absolute;
        background-color: #fff;
        box-shadow: 0px 0px 6px 1px #00000031;
        z-index: 1;
        padding: 10px;
        right: 0;
        top: 40px;
        .current {
          color: var(--primary-color);
        }
      }
      &.desktop {
        display: flex;
        gap: 20px;
        margin-right: 20px;
        @media (max-width: 690px) {
          display: none;
        }
      }
      &.mobile {
        display: none;
        @media (max-width: 690px) {
          display: block;
        }
      }
      li {
        cursor: pointer;
        p {
          color: #fff;
          vertical-align: middle;
          display: flex;
          align-items: center;
          svg {
            margin-left: 5px;
          }
        }
        .current {
          color: var(--text-color);
          background: var(--primary-gradient);
          background-blend-mode: overlay, normal;
          border-radius: 15px;
          padding: 2px 14px;
        }
      }
    }
  }
`;
