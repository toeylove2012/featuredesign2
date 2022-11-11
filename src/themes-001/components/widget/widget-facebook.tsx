import styled from '@emotion/styled';
import _ from 'lodash';
import { facebook } from 'utils/facebook';

const WidgetFacebook = () => {
  if (!facebook) return null;
  return (
    <WidgetWrapper
      className='widget-fb'
      dangerouslySetInnerHTML={{
        __html: facebook
      }}
    />
  );
};

export default WidgetFacebook;

const WidgetWrapper = styled.div`
  margin: auto;
`;
