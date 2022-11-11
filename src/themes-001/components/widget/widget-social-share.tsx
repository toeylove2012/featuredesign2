import _ from 'lodash';
import { FacebookIcon, FacebookShareButton, LineIcon, LineShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { NextPage } from 'next';
import { APP_URL } from 'constants/index';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { ISocialList } from 'interface/widgets';
import { IDataLayerGlobal } from 'interface/data-layer';
import styled from '@emotion/styled';

type Props = {
  title?: string;
  articleLink?: string;
  eventDataLayer?: IDataLayerGlobal;
};
const WidgetSocial: NextPage<Props> = ({ title = 'แชร์', articleLink, eventDataLayer = {} }) => {
  if (_.isEmpty(articleLink)) return null;
  const shareLink: string = `${APP_URL}${articleLink}`;
  const SOCIAL_LIST: ISocialList[] = [
    {
      id: 1,
      icon: (
        <FacebookShareButton url={shareLink}>
          <FacebookIcon size={20} round={true} />
        </FacebookShareButton>
      ),
      link: shareLink,
      name: 'facebook',
      className: 'icon-facebook'
    },
    {
      id: 2,
      icon: (
        <LineShareButton url={shareLink}>
          <LineIcon size={20} round={true} />
        </LineShareButton>
      ),
      link: shareLink,
      name: 'line',
      className: 'icon-line'
    },
    {
      id: 3,
      icon: (
        <TwitterShareButton url={shareLink}>
          <TwitterIcon size={20} round={true} />
        </TwitterShareButton>
      ),
      link: shareLink,
      name: 'twitter',
      className: 'icon-twitter'
    }
  ];
  return (
    <>
      <WidgetWrapper className='widget-social-share'>
        <div className='title'>{title}</div>
        <div className='list-items'>
          {SOCIAL_LIST.map((item: ISocialList, index: number) => (
            <p
              tabIndex={-1}
              // target='_blank'
              key={index}
              // rel='noopener nopopopener'
              // aria-label='social-share'
              title='social-share'
              className={`${item?.className}`}
              // ! DATALAYER
              onClick={() =>
                sendDataLayerGlobal({
                  ...eventDataLayer,
                  data: {
                    title: item?.name,
                    heading: item?.name,
                    index: index + 1
                  }
                })
              }
            >
              {item?.icon}
            </p>
          ))}
        </div>
      </WidgetWrapper>
    </>
  );
};

const WidgetWrapper = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  max-height: 100px;
  gap: 20px;
  /* margin: 10px 0; */
  .title {
    vertical-align: middle;
    font-weight: 700;
    font-size: 16px;
    padding: 0 10px;
    border-bottom: 2px solid var(--primary-color);
  }
  .list-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }

  .icon-facebook {
    background-color: #1877f2;
  }
  .icon-line {
    background-color: #00cf2e;
  }
  .icon-twitter {
    background-color: #24acff;
  }
  p {
    padding: 0px;
    margin: 0;
    border-radius: 100%;
    background-color: transparent;
    transition: 100ms all ease-in-out;

    svg {
      vertical-align: middle;
      height: 35px;
      width: 35px;
      @media (max-width: 475px) {
        height: 30px;
        width: 30px;
        padding: 0;
      }
    }
    svg circle {
      fill: transparent;
    }
    svg path {
      fill: #fff;
    }
    &:hover {
      background-color: var(--primary-color);
      svg path {
        fill: white;
      }
    }
  }
`;
export default WidgetSocial;
