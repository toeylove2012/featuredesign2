import styled from '@emotion/styled';
import { memo, useEffect, useState } from 'react';

import { NextRouter, useRouter } from 'next/router';
import { DATALAYER_TYPE, sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import WidgetFollow from '../widget/widget-follow';
import { splitRote, timestamp } from 'utils/helper';
import { GET } from 'services';
import { IMenu, IPartner } from 'interface/layout';
import _ from 'lodash';
import { footerLogo } from 'utils/theme';
import { WEB_NAME } from 'constants/index';

const Footer = ({ data }: any) => {
  const [footer, setFooter] = useState<string>('');
  const [partners, setPartner] = useState<IPartner[]>([]);
  const router: NextRouter = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const resData: [string, IPartner[]] = await Promise.all([GET('/api/footer', false, false), GET('/api/v1.0/navigations/company-group', false, false)]);

        if (resData[0]) setFooter(resData[0]);
        if (resData[1]) setPartner(resData[1]);
      } catch (err: any) {
        console.error(`${timestamp()} ==========> MENU_ERROR : `, err.message);
      }
    })();
  }, []);
  const _listMenu: IMenu[] = data;
  const _listPartner: IPartner[] = partners;
  return (
    <FooterWrapper>
      <div className='footer-wrapper'>
        <div className='footer-list-area container'>
          <div className='block-1 '>
            <img src={footerLogo || `${splitRote(router)}/static/images/logo-than-footer.svg`} alt='logo' aria-label='logo' width='300' height='100%' />

            {WEB_NAME === 'thansettakij' && (
              <div className='footer-address'>
                <p className='footer-address-detail'>บริษัท ฐานเศรษฐกิจ มัลติมีเดีย จํากัด 1854 ชั้น 8 ถนนเทพรัตน แขวงบางนาใต้ เขตบางนา กรุงเทพฯ 10260 โทรศัพท์ 02-338-3750-1</p>
              </div>
            )}
            <WidgetFollow
              showtitle={false}
              // ! DATALAYER
              eventDataLayer={{
                type: DATALAYER_TYPE.TRACK_POSITION,
                router: router?.pathname,
                section: 'follow',
                position: 'on:footer',
                data: {
                  block: '1'
                }
              }}
            />
            <span className='truehit' id='truehits_div' />
          </div>
          {!_.isEmpty(_listMenu) && (
            <div className='block-2'>
              <div className='footer-heading'>หมวดหมู่ข่าว</div>
              <ul className='footer-list'>
                {_listMenu.map((item: IMenu, index: number) => (
                  <li key={index} className='list-text'>
                    <a
                      href={`/${item?.link}`}
                      title={item?.nameTh}
                      aria-label={item?.nameTh}
                      // ! DATALAYER
                      onClick={() =>
                        sendDataLayerGlobal({
                          type: DATALAYER_TYPE.TRACK_POSITION,
                          router: router?.pathname,
                          section: 'footer',
                          position: 'on:footer',
                          data: {
                            title: item?.nameTh,
                            heading: 'CATEGORY',
                            block: '2',
                            index: index + 1
                          }
                        })
                      }
                    >
                      {item?.nameTh}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!_.isEmpty(footer) && (
            <div className='block-3'>
              <p
                className='footer-content'
                dangerouslySetInnerHTML={{
                  __html: footer
                }}
              />
            </div>
          )}
          <div className='block-sonp'>
            <a href='http://www.sonp.or.th/' target='_blank' rel='noopener noreferrer'>
              <img src={`${splitRote(router)}/static/images/logo_sonp7.png`} alt='logo' className='footer-logo-sonp' width='100%' height='100%' />
            </a>
          </div>
        </div>
        {!_.isEmpty(_listPartner) && (
          <div className='block-partner container'>
            <ul className='footer-list'>
              {_listPartner.map((item: IPartner, index: number) => (
                <li key={index} className='list-text'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`${item?.link}`}
                    title={item?.nameEng}
                    aria-label={item?.nameEng}
                    // ! DATALAYER
                    onClick={() =>
                      sendDataLayerGlobal({
                        type: DATALAYER_TYPE.TRACK_POSITION,
                        router: router?.pathname,
                        section: 'footer',
                        position: 'on:footer',
                        data: {
                          title: item?.nameEng,
                          heading: `PARTNER`,
                          block: '3',
                          index: index + 1
                        }
                      })
                    }
                  >
                    {item?.nameEng}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='copyright-area'>
          <div className='container'>
            <div className='copyright-area-content'>
              <p>
                © 2021
                <a href='/' className='pl-1'>
                  {_.capitalize(WEB_NAME)}
                </a>
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default memo(Footer);

const FooterWrapper = styled.div`
  margin-top: 30px;
  .footer-wrapper {
    background-color: #383838;
    font-family: var(--front-secondary), sans-serif;
    .footer-list-area {
      padding: 50px 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'block1 block2 block2 block3'
        'block-sonp block-sonp block-sonp block-sonp';
      @media (max-width: 768px) {
        grid-template-areas:
          'block1 block1 block2 block2'
          'block3 block3 block3 block3'
          'block-sonp block-sonp block-sonp block-sonp';
      }
      @media (max-width: 690px) {
        grid-template-areas:
          'block1 block1 block1 block1'
          'block3 block3 block3 block3'
          'block2 block2 block2 block2'
          'block-sonp block-sonp block-sonp block-sonp';
      }
    }
    .block-1 {
      grid-area: block1;
      padding: 0 15px;
      img {
        margin: 30px 0;
        height: max-content;
      }
      .footer-address {
        margin-bottom: 30px;
        p {
          color: #fff;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.45;
        }
      }
    }
    .block-2 {
      grid-area: block2;
      padding: 0 15px;
      .footer-heading {
        width: max-content;
        border-bottom: 1px solid var(--tertiary-color);
        margin: 60px 0 30px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        @media (max-width: 690px) {
          margin: 30px 0 30px;
        }
      }
      .footer-list {
        column-count: 3;
        column-gap: 10px;
        @media (max-width: 690px) {
          column-count: 2;
        }

        .list-text {
          margin: 10px 0;
          a {
            color: #fff;
            padding: 20px 0;
            line-height: 1.45;
          }
        }
      }
    }
    .block-3 {
      grid-area: block3;
      padding: 0 15px;
      margin: 60px 0 30px;
      color: #fff;
      line-height: 1.45;
      @media (max-width: 690px) {
        margin: 30px 0 30px;
      }
      .footer-content {
        font-size: 16px;
        p {
          font-weight: 300;
        }
      }
    }
    .block-sonp {
      grid-area: block-sonp;
      text-align: center;
      .footer-logo-sonp {
        width: 200px;
      }
    }
    .block-partner {
      ul {
        border-top: 1px solid #717171;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 10px 0;
        li {
          font-size: 16px;
          font-weight: 200;
          line-height: 1.45;
          display: inline-block;
          a {
            color: #fff;
            text-transform: capitalize;
          }
        }
      }
    }
  }
  .copyright-area {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #242424;
    border-top: 1px solid #292929;
    margin: 0;

    .copyright-area-content {
      text-align: center;

      p {
        font-weight: 200;
        color: #fff;
        font-size: 12px;
        letter-spacing: 1px;
        margin: 0;
        a {
          display: inline-block;
          font-weight: 500;
          color: var(--tertiary-color);
          margin: 0 4px;

          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
`;
