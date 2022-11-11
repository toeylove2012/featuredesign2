import { useState } from 'react';
import { NextPage } from 'next';

import { HiMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { IExpandToggle, IMenu } from 'interface/layout';
import styled from '@emotion/styled';

type Props = {
  eventDataLayer: any;
  _data: IMenu[];
};

const NavMobile: NextPage<Props> = ({ eventDataLayer, _data }) => {
  const data: IMenu[] = _data;
  const [toggle, setToggle] = useState<boolean>(false);
  const [expand, setExpand] = useState<IExpandToggle>({ status: false, key: null });
  function handleToggle(_key: string, _index: number | null): void {
    switch (_key) {
      case 'close':
        setToggle(false);
        setExpand({ key: null, status: false });
        break;
      case 'open':
        setToggle(!toggle);
        break;
      case 'menu':
        setToggle(true);
        setExpand({
          key: _index,
          status: expand?.key === _index ? !expand.status : true
        });
        break;
      default:
        setToggle(false);
        break;
    }
  }

  return (
    <>
      <NavWrapper className='nav-mobile'>
        <div className='btn-menu'>
          {toggle || expand.status ? (
            <CgClose onClick={() => handleToggle('close', null)} />
          ) : (
            <HiMenu
              size={35}
              onClick={() => {
                handleToggle('open', null);
              }}
            />
          )}
        </div>
        {toggle && (
          <nav className={`nav-dropdown-mobile ${toggle ? 'visible' : 'invisible'}`}>
            <div className='nav-title'>
              <button onClick={() => handleToggle('close', null)} className='close-btn'>
                <CgClose />
              </button>
            </div>
            {/* ---------------------------------- MENU ---------------------------------- */}
            <ul className={'nav-menu'}>
              <li className='active-menu'>
                <div className='d-flex'>
                  <a
                    href='/'
                    title='หน้าแรก'
                    aria-label='หน้าแรก'
                    // ! DATALAYER
                    onClick={() =>
                      sendDataLayerGlobal({
                        ...eventDataLayer,
                        data: {
                          title: 'หน้าแรก',
                          heading: 'หน้าแรก',
                          index: 1
                        }
                      })
                    }
                  >
                    <span className='menu'>หน้าแรก</span>
                  </a>
                </div>
              </li>
              {(toggle || expand.status) &&
                Array.isArray(data) &&
                data.length > 0 &&
                data.map((menu, index) => (
                  <li key={index} className='active-menu'>
                    <div className='item-menu'>
                      <a
                        href={`/${menu?.link}`}
                        title={menu?.nameTh}
                        aria-label={menu?.nameTh}
                        // ! DATALAYER
                        onClick={() =>
                          sendDataLayerGlobal({
                            ...eventDataLayer,
                            data: {
                              title: menu?.nameTh,
                              heading: menu?.nameTh,
                              index: index + 2
                            }
                          })
                        }
                      >
                        <span className='menu'>{menu?.nameTh}</span>
                      </a>
                      <div className='drop-item' onClick={() => handleToggle('menu', index)}>
                        {/* ------------------------------- Icon Expand ------------------------------ */}
                        {Array.isArray(menu?.sub) && menu?.sub.length > 0 && (expand?.key === index && expand?.status ? <FaMinus /> : <FaPlus />)}
                      </div>
                    </div>
                    {/* --------------------------------- SUBMENU -------------------------------- */}
                    {expand?.key === index && expand?.status && Array.isArray(menu.sub) && (
                      <ul className='nav-sub-menu'>
                        {menu.sub.map((subMenu: any, i: any) => (
                          <li key={i} className='active-sub-menu'>
                            <a
                              href={subMenu?.link}
                              title={subMenu?.nameTh}
                              aria-label={subMenu?.nameTh}
                              // ! DATALAYER
                              onClick={() =>
                                sendDataLayerGlobal({
                                  ...eventDataLayer,
                                  data: {
                                    title: subMenu?.nameTh,
                                    heading: `${menu?.nameTh}:${subMenu?.nameTh}`,
                                    index: i + 1
                                  }
                                })
                              }
                            >
                              <div className='list-sub-menu'>
                                <span className='sub-menu'>{subMenu?.nameTh}</span>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
        )}
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  min-width: fit-content;
  /* start nav mobile */

  ul.nav-menu,
  ul.nav-sub-menu {
    list-style: none;
  }
  .invisible {
    visibility: hidden !important;
  }
  nav.nav-dropdown-mobile {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0);
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    background-color: #fff;
    z-index: 20;
    box-shadow: 1px 0px 10px 0px var(--tertiary-color);
    overflow-y: scroll;

    .nav-title {
      text-align: right;
      svg {
        font-size: 26px;
        color: var(--tertiary-color);
      }
    }
    /* ------------------------------- MOBILE : Navigation Menu -------------------------------- */

    .close-btn {
      background: none;
      top: 10px;
      right: 10px;
      border: none;
      padding: 8px 10px;
      font-size: 16px;
      cursor: pointer;
      svg {
        vertical-align: middle;
        color: var(--tertiary-color);
        font-size: 30px;
      }
    }

    .img-nav {
      margin: 50px auto 50px auto;
      img {
        width: 100px;
        max-width: 100%;
        height: auto;
      }
    }
    .nav-menu {
      display: flex;
      width: 100%;
      flex-flow: column nowrap;
      padding-inline-start: 0px;
      padding: 0px 15px;
      li {
        margin: 0px;
        border-top: 1px solid var(--tertiary-color);
        span {
          padding: 8px 0px;
          color: var(--tertiary-color);
          display: flex;

          font-size: 18px;
          font-weight: 600;
          width: 100%;
          overflow-x: hidden;
          justify-content: space-between;
          align-items: center;
          text-transform: capitalize;
          transition: all 0.5s ease-out 0s;
          &:hover {
            @media (min-width: 1023px) {
              color: #bbb;
            }
          }
        }
        .nav-sub-menu {
          width: 100%;
          padding-left: 8px;
          .list-sub-menu {
            padding-left: 10px;
            span {
              font-size: 16px;
              font-weight: 400;
            }
          }
        }
        &:nth-child(1) {
          border: none;
          padding-top: 0;
        }
      }
      .active-menu .item-menu a,
      .active-menu .d-flex a {
        font-weight: 600;
      }
      .item-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span {
          white-space: pre;
        }
        &:hover {
          a {
            width: 50%;
            display: inline-block;
            span {
              @media (min-width: 1023px) {
                color: #bbb;
              }
            }
          }
        }

        .drop-item {
          cursor: pointer;
          display: flex;
          width: 50%;
          justify-content: flex-end;
          svg {
            color: var(--tertiary-color);
          }
          &:hover {
            svg {
              @media (min-width: 1023px) {
                color: #bbb;
              }
            }
          }
        }
      }
    }
  }
  .logo-img {
    opacity: 0.6;
  }
  /* end nav mobile */
`;

export default NavMobile;
