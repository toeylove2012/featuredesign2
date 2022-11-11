import _ from 'lodash';
import { APP_IMG } from 'constants/index';
import styled from '@emotion/styled';

export const getAffiliate = (_position: any, _data: any) => {
  if (_.isEmpty(_data) || !_data) return null;
  const item = Array.isArray(_data) && _data.filter(_item => _item.position === _position)[0];
  return (
    item && (
      <Affaliate className='content-detail text-align-center'>
        <a href={item?.link} title={item?.title} aria-label={item?.title} target='_blank' rel='noreferrer noopener'>
          {item.image ? (
            <img className='affaliate-image' src={`${APP_IMG}${item?.image}`} alt={item.title || `affaliate-${_position}`} title={item?.title} width='100%' height='100%' loading='lazy' />
          ) : (
            <div
              className='btn-affaliate my-3'
              style={{
                background: `${item?.bgColor}`,
                color: `${item?.textColor}`
              }}
            >
              {item?.title}
            </div>
          )}
        </a>
      </Affaliate>
    )
  );
};

const Affaliate = styled.div`
  .affaliate-image {
    width: 80% !important;
  }
`;
