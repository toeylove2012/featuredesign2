import _ from 'lodash';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

import { APP_IMG } from 'constants/index';
import { IExpandToggle, IMenu } from 'interface/layout';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import styled from '@emotion/styled';
import { getWidthDimention, splitRote } from 'utils/helper';
import { FaAngleDown, FaGripHorizontal, FaTimes } from 'react-icons/fa';

const CardVNav = dynamic(import('themes-001/components/cards/card-v-nav'));
const WidgetSearchFullPage = dynamic(import('../widget/widget-search-full-page'));

type Props = {
  _data: IMenu[];
  // sessionSevId: any;
  eventDataLayer: any;
};
const NavDesktop: NextPage<Props> = ({ eventDataLayer, _data }) => {
  const moreMenuRef: any = useRef();
  const [moreMenu, setMoreMenu] = useState(true);
  // ---------- expand sub-menu ----------
  const [subToggleMoreMenu, setSubToggleMoreMenu] = useState<IExpandToggle>({
    status: false,
    key: null
  });

  const [subToggle, setSubToggle] = useState<IExpandToggle>({
    status: false,
    key: null
  });
  const [widthDimention, setWidthDimention] = useState(getWidthDimention());
  const router: NextRouter = useRouter();

  const cid: string = router.asPath;
  const queryCid: string | string[] | undefined = router.query.cid;
  const [articles, setArticles]: any = useState({
    key: null,
    data: null,
    link: null
  });

  let _results: any = [];

  if (widthDimention.width < 1200) {
    _data = [..._data];
    _results = _data.splice(0, 6);
  } else {
    _data = [..._data];
    _results = _data.splice(0, 8);
  }

  useEffect(() => {
    function handleResize() {
      setWidthDimention(getWidthDimention());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router.isReady]);

  return (
    <>
      <NavWrapper className='nav-desktop'>
        <SideBarWrapper id='side-bar'>
          <ul className='side-nav-menu' id='side-nav-menu'>
            <li className={`${cid === '/' ? '--active' : ''} listItem`}>
              <a
                href={`${splitRote(router)}/`}
                aria-label='nav-desktop'
                title='หน้าแรก'
                // ! DATALAYER
                onClick={() =>
                  sendDataLayerGlobal({
                    ...eventDataLayer,
                    data: {
                      title: 'หน้าแรก',
                      heading: 'หน้าแรก'
                    }
                  })
                }
              >
                <span> หน้าแรก </span>
              </a>
            </li>
            {!_.isEmpty(_results) &&
              _results?.map((element: any, index: any) => (
                <li
                  className={`${cid === `/${element?.link}` || queryCid === element?.nameEng ? '--active' : ''} listItem`}
                  key={index}
                  onMouseLeave={() => setSubToggle({ status: false, key: null })}
                >
                  <a
                    href={`${splitRote(router)}/${element?.link}`}
                    onMouseOver={() => {
                      setSubToggle({ status: true, key: index });
                      setArticles({
                        key: index,
                        data: element?.sub[0]?.data,
                        link: element?.sub[0]?.link
                      });
                    }}
                    onFocus={() => {}}
                    title={element?.nameTh}
                    aria-label={element?.nameTh}
                    // ! DATALAYER
                    onClick={() =>
                      sendDataLayerGlobal({
                        ...eventDataLayer,
                        data: {
                          title: element?.nameTh,
                          heading: element?.nameTh,
                          index: index + 2
                        }
                      })
                    }
                  >
                    <span>{element?.nameTh}</span>
                    {element.sub.length > 0 && <FaAngleDown size={14} />}
                  </a>
                  {subToggle?.key === index && subToggle?.status && element?.sub.length > 0 && (
                    <div
                      className='nav-sub-menu --left'
                      onMouseLeave={() => {
                        setSubToggle({ key: null, status: false });
                      }}
                    >
                      <CardSubMenuStyle>
                        <div className='card-sub-menu'>
                          <div className='block-1'>
                            <ul>
                              {!_.isEmpty(element?.sub) &&
                                element.sub.map((subMenu: any, i: any) => (
                                  <li
                                    key={i}
                                    aria-hidden='true'
                                    onMouseOver={() => {
                                      setArticles({
                                        key: i,
                                        data: subMenu?.data,
                                        link: subMenu?.link
                                      });
                                    }}
                                    onFocus={() => {}}
                                  >
                                    <a
                                      href={subMenu.link}
                                      title={subMenu.nameTh}
                                      // ! DATALAYER
                                      onClick={() =>
                                        sendDataLayerGlobal({
                                          ...eventDataLayer,
                                          position: 'ใน:menubar',
                                          data: {
                                            title: subMenu?.nameTh,
                                            heading: `${element?.nameTh}:${subMenu?.nameTh}`,
                                            index: i + 1
                                          }
                                        })
                                      }
                                    >
                                      {subMenu?.nameTh}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className='block-2'>
                            {!_.isEmpty(articles?.data) ? (
                              <>
                                <div className='card-list'>
                                  {articles.data.slice(0, 4).map((item: any, i: any) => (
                                    <div key={i} className={`item-${i + 1}`}>
                                      <CardVNav
                                        key={i}
                                        data={item}
                                        showBlurb={false}
                                        showBadge={false}
                                        // ! DATALAYER
                                        eventDataLayer={{
                                          ...eventDataLayer,
                                          position: 'ใน:menubar',
                                          data: {
                                            heading: `${element?.nameTh}:${element.sub[index]?.nameTh}`
                                          }
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div className='btn-readmore'>
                                  <a className='see-all' href={articles?.link} title='see all'>
                                    {`>>> ดูทั้งหมด`}
                                  </a>
                                </div>
                              </>
                            ) : (
                              <div className='empty'>
                                <img className='logo-img' src={`${APP_IMG}/default.jpg`} loading='lazy' alt='logo-mobile' title='logo-mobile' width='100px' height='100px' />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardSubMenuStyle>
                    </div>
                  )}
                </li>
              ))}
            {/* <WidgetLogin sessionSevId={sessionSevId} /> */}
          </ul>
          <div className='area-more-menu'>
            <WidgetSearchFullPage />
            {_data.length > 0 && (
              <>
                <ul className='more-menu'>
                  {_results.length > 0 &&
                    (moreMenu ? (
                      <li onClick={() => setMoreMenu(false)}>
                        <FaGripHorizontal size={18} />
                      </li>
                    ) : (
                      <li onClick={() => setMoreMenu(true)}>
                        <FaTimes size={18} />
                      </li>
                    ))}
                </ul>

                <div className={`expand-more-menu ${moreMenu ? '--hide' : ''}`} ref={moreMenuRef}>
                  <ul className='expand-nav-menu'>
                    {_data.map((element, i) => (
                      <li key={i} className={`${cid === `/${element?.link}` || queryCid === element?.nameEng ? '--active' : ''} listItem`}>
                        {element.sub.length > 0 ? (
                          <a
                            href={`/${element.link}`}
                            key={i}
                            onMouseOver={() => {
                              // setSubToggleMoreMenu({ status: true, key: i });
                              // setExpandToggle({ status: false, key: null });
                              setSubToggleMoreMenu({ status: true, key: i });
                              setArticles({
                                key: i,
                                data: element?.sub[0]?.data,
                                link: element?.sub[0]?.link
                              });
                            }}
                            onMouseLeave={() => setSubToggleMoreMenu({ key: null, status: false })}
                          >
                            {element.nameTh}
                            {element.sub.length > 0 && <FaAngleDown size={14} />}
                            {subToggleMoreMenu.status && subToggleMoreMenu.key === i && (
                              <div
                                className='nav-sub-menu --left'
                                onMouseLeave={() => {
                                  setSubToggle({ key: null, status: false });
                                }}
                              >
                                <CardSubMenuStyle>
                                  <div className='card-sub-menu'>
                                    <div className='block-1'>
                                      <ul>
                                        {!_.isEmpty(element?.sub) &&
                                          element.sub.map((subMenu: any, i: any) => (
                                            <li
                                              key={i}
                                              aria-hidden='true'
                                              onMouseOver={() => {
                                                setArticles({
                                                  key: i,
                                                  data: subMenu?.data,
                                                  link: subMenu?.link
                                                });
                                              }}
                                              onFocus={() => {}}
                                            >
                                              <a
                                                href={subMenu.link}
                                                title={subMenu.nameTh}
                                                // ! DATALAYER
                                                onClick={() =>
                                                  sendDataLayerGlobal({
                                                    ...eventDataLayer,
                                                    position: 'ใน:menubar',
                                                    data: {
                                                      title: subMenu?.nameTh,
                                                      heading: `${element?.nameTh}:${subMenu?.nameTh}`,
                                                      index: i + 1
                                                    }
                                                  })
                                                }
                                              >
                                                {subMenu?.nameTh}
                                              </a>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                    <div className='block-2'>
                                      {!_.isEmpty(articles?.data) ? (
                                        <>
                                          <div className='card-list'>
                                            {articles.data.slice(0, 4).map((item: any, index: any) => (
                                              <div key={i} className={`item-${i + 1}`}>
                                                <CardVNav
                                                  key={i}
                                                  data={item}
                                                  showBlurb={false}
                                                  showBadge={false}
                                                  // ! DATALAYER
                                                  eventDataLayer={{
                                                    ...eventDataLayer,
                                                    position: 'ใน:menubar',
                                                    data: {
                                                      heading: `${element?.nameTh}:${element.sub[index]?.nameTh}`
                                                    }
                                                  }}
                                                />
                                              </div>
                                            ))}
                                          </div>
                                          <div className='btn-readmore'>
                                            <a className='see-all' href={articles?.link} title='see all'>
                                              {`>>> ดูทั้งหมด`}
                                            </a>
                                          </div>
                                        </>
                                      ) : (
                                        <div className='empty'>
                                          <img className='logo-img' src={`${APP_IMG}/default.jpg`} loading='lazy' alt='logo-mobile' title='logo-mobile' width='100px' height='100px' />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardSubMenuStyle>
                              </div>
                            )}
                          </a>
                        ) : (
                          <a href={`/${element.link}`}>{element.nameTh}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </SideBarWrapper>
      </NavWrapper>
    </>
  );
};
const NavWrapper = styled.div`
  /* position: relative; */
  .area-more-menu {
    display: flex;
    align-items: center;
    .more-menu {
      svg {
        cursor: pointer;
      }
    }
  }
  .expand-more-menu {
    position: absolute;
    bottom: -34px;
    left: 0;
    width: 100%;
    background: var(--secondary-gradient);
    z-index: 6;

    .expand-nav-menu {
      a {
        color: var(--text-color);
        font-weight: 600;
        font-size: 16px;
        svg {
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      padding: 5px 0;
    }

    ul {
      max-width: 1240px;
      margin: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style-type: none;
      position: relative;
      gap: 20px;
      .card-sub-menu {
        .block-1 {
          li {
            cursor: pointer;
          }
          a {
            color: var(--primary-color);
          }
        }
      }
    }

    &.--hide {
      display: none;
    }
  }
`;
const CardSubMenuStyle = styled.div`
  position: relative;
  .card-sub-menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'block-1 block-2 block-2 block-2 block-2 block-2';
    grid-gap: 20px;
    padding: 20px;
    .block-1 {
      grid-area: block-1;
    }
    .block-2 {
      grid-area: block-2;
      .card-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
      }
      .btn-readmore {
        width: 100%;
        text-align: right;
        margin-top: 10px;
        a {
          color: #333335bb;
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
    ul {
      overflow: hidden scroll;
      height: 200px;
      list-style: none;
      padding: 0;
      display: block;
      &::-webkit-scrollbar {
        width: 4px;
        background-color: rgb(0, 0, 0, 0.2);
        border-radius: 15px;
      }

      &::-webkit-scrollbar-track {
        background-color: rgb(247, 247, 247, 0.2);
        border-radius: 15px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 15px;
        background-color: var(--primary-color);
      }

      li {
        padding: 5px;
        border-radius: 15px;
        margin-bottom: 16px;
        margin-left: 0;
        text-align: left;
        border: 2px;
        a {
          color: var(--primary-color);
          text-transform: capitalize;
          font-weight: 500;
          &:hover {
            padding-left: 16px;
            color: #333;
          }
        }

        i {
          float: right;
          color: transparent;
        }
        &:hover {
          color: var(--primary-color);
          border: unset;
          i {
            color: var(--primary-color);
          }
        }
      }
    }
  }
`;

const SideBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .side-nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .svg-tag {
      cursor: pointer;
      color: var(--primary-color);
      width: 30px;
      height: 30px;
      path {
        stroke: var(--primary-color);
      }
    }
  }
  .side-nav-menu {
    position: relative;
    list-style: none;
    display: flex;
    transition: opacity 1s ease-in-out;

    .listItem {
      /* position: relative;  */
      display: flex;
      align-items: center;
      padding: 0px 15px;
      height: 54px;
      .nav-sub-menu {
        position: absolute;
        top: 54px;
        overflow: visible;
      }

      &:hover {
        z-index: 7;
        span,
        svg {
          color: rgba(255, 255, 255);
        }
      }
      &.--active {
        span,
        svg {
          color: rgba(255, 255, 255);
        }
      }
      a {
        span {
          font-weight: 600;
          font-size: 16px;
          vertical-align: middle;
          text-transform: capitalize;
          color: var(--text-color);
          @media (max-width: 900px) {
            font-size: 12px;
          }
        }
        svg {
          vertical-align: middle;
          color: var(--text-color);
          margin-left: 5px;
        }
      }
    }
  }
  .nav-sub-menu {
    background: rgb(255, 255, 255);
    width: 1200px;
    position: absolute;
    visibility: visible;
    z-index: 5;
    padding: 0px;
    margin: 0px;
    opacity: 1;
    transition: all 0.3s ease-out;
    transform-origin: 0 0 0;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
    a {
      font-size: 15px;
      font-weight: 600;
      display: block;
      text-transform: uppercase;
      transition: all 0.5s ease-out;
    }
    &.--left {
      left: 0;
    }
  }
`;
export default NavDesktop;
