import styled from '@emotion/styled';
import { convertDatasets } from 'utils/datasets';
import useResponsive from 'utils/devices';

type Props = { id: string; data: any };

const EventDefault = ({ id, data }: Props) => {
  const background = {
    desktop: convertDatasets(data, 'background-desktop', true),
    mobile: convertDatasets(data, 'background-mobile', true)
  };
  const responsive = useResponsive();
  return (
    <>
      <EventWrapper id={id}>
        {responsive.isDesktop && <img className='background-event' src={background.desktop} />}
        {responsive.isMobile && <img className='background-event' src={background.mobile} />}
      </EventWrapper>
    </>
  );
};

export default EventDefault;

const EventWrapper: any = styled.div<{
  desktop: any;
  mobile: any;
}>`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;

  .background-event {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
  }
`;
