import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import WidgetFollow from 'themes-001/components/widget/widget-follow';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import useResponsive from 'utils/devices';
import { Media } from 'interface/media';
import { IMenu } from 'interface/layout';
import { NextPage } from 'next';
import NavDesktop from './nav-desktop';
import WidgetSearchFullPage from '../widget/widget-search-full-page';
import NavMobile from './nav-mobile';
import { headerLogo } from 'utils/theme';
import { WEB_TITLE } from 'constants/layout';
import { WEB_NAME } from 'constants/index';
import { splitRote } from 'utils/helper';

type PCategory = {
  data: IMenu[];
};
const Header: NextPage<PCategory> = ({ data }) => {
  const _data: IMenu[] = data;
  const router = useRouter();
  const responsive: Media = useResponsive();
  return (
    <>
      <HeaderLogo className='container'>
        {router.asPath === `${splitRote(router)}` ? (
          <h1 className='text-header-logo'>
            <a
              href='/'
              title={WEB_TITLE}
              aria-label={WEB_TITLE}
              // ! DATALAYER
              onClick={() =>
                sendDataLayerGlobal({
                  type: DATALAYER_TYPE.TRACK_POSITION,
                  router: router?.pathname,
                  section: 'header',
                  position: 'on:header',
                  data: {
                    title: 'logo',
                    heading: 'logo'
                  }
                })
              }
            >
              <span>{WEB_TITLE}</span>
              <img className='logo-img' src={headerLogo || `${splitRote(router)}/static/images/logo.png`} title={WEB_NAME} alt={WEB_NAME} width={160} height='100%' loading='lazy' />
            </a>
          </h1>
        ) : (
          <a
            href='/'
            title={WEB_TITLE}
            aria-label={WEB_TITLE}
            // ! DATALAYER
            onClick={() =>
              sendDataLayerGlobal({
                type: DATALAYER_TYPE.TRACK_POSITION,
                router: router?.pathname,
                section: 'header',
                position: 'on:header',
                data: {
                  title: 'logo',
                  heading: 'logo'
                }
              })
            }
          >
            <img className='logo-img' src={headerLogo || `${splitRote(router)}/static/images/logo.png`} title={WEB_NAME} alt={WEB_NAME} width={160} height='100%' loading='lazy' />
          </a>
        )}
        <WidgetFollow
          showtitle={false}
          // ! DATALAYER
          eventDataLayer={{
            type: DATALAYER_TYPE.TRACK_POSITION,
            router: router?.pathname,
            position: 'on:header',
            section: 'header'
          }}
        />
      </HeaderLogo>
      {responsive.isTabletPro && (
        <HeaderMenu className='desktop'>
          <div className={`container header`}>
            <NavDesktop
              // sessionSevId={sessionSevId}
              _data={_data}
              // ! DATALAYER
              eventDataLayer={{
                type: DATALAYER_TYPE.TRACK_POSITION,
                router: router?.pathname,
                position: 'on:header',
                section: 'header'
              }}
            />

            {/* <AiOutlineSearch /> */}
          </div>
        </HeaderMenu>
      )}
      {responsive.isTabletMini && (
        <HeaderMenu className='mobile'>
          <div className={`container header`}>
            {/* <FaBars /> */}
            {/* <ul className='header-ul'>
              {_.map(mapArr, (item, index) => (
                <li className='header-li' key={index}>
                  <p>
                    <a href={`/${item.nameTh}`}>{item.nameTh}</a>
                  </p>
                </li>
              ))}
            </ul> */}
            <NavMobile
              _data={_data}
              // ! DATALAYER
              eventDataLayer={{
                type: DATALAYER_TYPE.TRACK_POSITION,
                router: router?.pathname,
                position: 'on:header',
                section: 'header'
              }}
            />
          </div>
          <WidgetSearchFullPage />
        </HeaderMenu>
      )}
    </>
  );
};

export default Header;

const HeaderLogo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90px;
  max-width: 100%;
  .text-header-logo {
    margin: 0;
    overflow: hidden;
    position: relative;

    span {
      text-indent: 1000em;
      white-space: nowrap;
      overflow: hidden;
      display: block;
      position: absolute;
      width: 100%;
    }
  }
  @media (max-width: 690px) {
    .logo-img {
      width: 130px;
    }
  }
  @media (max-width: 475px) {
    min-height: 68px;
    .logo-img {
      width: 100px;
    }
  }
  .logo-img {
    margin: 15px 0;
    max-width: 100%;
  }
`;

const HeaderMenu = styled.div`
  top: 0;
  position: sticky;
  min-height: 54px;
  background: var(--secondary-gradient);
  z-index: 5;
  &.desktop {
  }
  &.mobile {
    display: flex;
    align-items: center;
    min-height: 40px;
  }
  .header {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    svg {
      font-size: 26px;
      color: var(--text-color);
    }
  }
  .header-ul {
    display: flex;
    gap: 20px;
    .header-li {
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #fff;
        p {
          a {
            color: #000;
          }
        }
      }
      p {
        padding: 15px 5px;
        width: 100%;
        height: 100%;
        a {
          transition: all 0.3s ease-in-out;
          width: 100%;
          height: 100%;
          color: var(--text-color);
        }
      }
    }
  }
`;
