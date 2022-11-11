import { FaFacebookF, FaInstagram, FaLine, FaTwitter, FaYoutube } from 'react-icons/fa';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { WEB_URL } from 'constants/layout';
import { ISocialList } from 'interface/widgets';
import { IDataLayerGlobal } from 'interface/data-layer';
import { sendDataLayerGlobal } from 'utils/datalayer/send-datalayer';
import { gradient } from 'utils/theme';

const SOCIAL_LIST: ISocialList[] = [
  {
    id: 1,
    icon: <FaFacebookF id='facebook' size={20} />,
    link: WEB_URL.FACEBOOK,
    name: 'facebook',
    className: 'icon-facebook'
  },
  {
    id: 2,
    icon: <FaTwitter id='twitter' size={20} />,
    link: WEB_URL.TWITTER,
    name: 'twitter',
    className: 'icon-twitter'
  },
  {
    id: 3,
    icon: <FaInstagram id='instagram' size={20} />,
    link: WEB_URL.INSTAGRAM,
    name: 'instagram',
    className: 'icon-instagram'
  },
  {
    id: 4,
    icon: <FaYoutube id='youtube' size={20} />,
    link: WEB_URL.YOUTUBE,
    name: 'youtube',
    className: 'icon-youtube'
  },
  {
    id: 5,
    icon: <FaLine id='line' size={20} />,
    link: WEB_URL.LINE,
    name: 'line',
    className: 'icon-line'
  }
];

type Props = {
  showtitle?: boolean;
  title?: string;
  eventDataLayer?: IDataLayerGlobal;
};
const WidgetFollow: NextPage<Props> = ({ showtitle = true, title, eventDataLayer }) => {
  return (
    <>
      <WidgetWrapper className='widget-follow'>
        {showtitle && (
          <div className='tags-title'>
            <p>{title}</p>
          </div>
        )}
        <div className='tags-items'>
          {SOCIAL_LIST.map((item: ISocialList, index: number) => (
            <a
              tabIndex={-1}
              target='_blank'
              key={index}
              href={item?.link}
              rel='noopener nopopopener'
              aria-label='social-share'
              title='social-share'
              // ! DATALAYER
              onClick={() =>
                sendDataLayerGlobal({
                  ...eventDataLayer,
                  data: {
                    title: item?.name,
                    heading: item?.name,
                    index: index + 1,
                    block: '',
                    carousel: '',
                    time: '',
                    ...eventDataLayer?.data
                  }
                })
              }
            >
              {item?.icon}
            </a>
          ))}
        </div>
      </WidgetWrapper>
    </>
  );
};

const WidgetWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .tags-title {
    margin-top: 30px;
    width: 100%;
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
  .tags-items {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
    a {
      svg {
        vertical-align: middle;
        height: 36px;
        width: 36px;
        padding: 7px;
        border-radius: 100%;
        background: var(--primary-gradient);
        background-blend-mode: overlay, normal;
        color: var(--text-color);
        transition: 0.1ms all ease-in-out;
        @media (max-width: 475px) {
          height: 30px;
          width: 30px;
          padding: 6px;
        }
      }
    }
  }
`;
export default WidgetFollow;
