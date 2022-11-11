import Carousel from 'react-slick';
import { APP_IMG } from 'constants/index';
import _ from 'lodash';
import { NextPage } from 'next';
import { IAffiliate } from 'interface/service';

interface IProps {
  position: number;
  data: IAffiliate[];
}

const SectionAffiliate: NextPage<IProps> = ({ position, data }: IProps) => {
  if (_.isEmpty(data)) return null;
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
  };
  const _position: number = position;
  const data2: IAffiliate[] = data.filter((item: IAffiliate) => item.position === _position);
  if (_.isEmpty(data2)) return null;

  return (
    <>
      <div className='show-desktop'>
        {
          <Carousel {...settings}>
            {!_.isEmpty(data2) &&
              data2
                .filter(data => data?.image !== null)
                .map((item: IAffiliate, index: number) => (
                  <div key={index} className='banner-special'>
                    <a tabIndex={-1} href={!item?.link ? '#' : item.link} target={!item?.title ? '_self' : '_blank'} rel='noreferrer noopenner'>
                      <img src={`${APP_IMG}${item?.image}`} alt={item?.title} width='100%' height='100%' />
                    </a>
                  </div>
                ))}
          </Carousel>
        }
      </div>
      <div className='show-mobile'>
        {
          <Carousel {...settings}>
            {!_.isEmpty(data2) &&
              data2
                .filter((data: IAffiliate) => data?.image !== null)
                .map((item: IAffiliate, index: number) => (
                  <div key={index} className='banner-special'>
                    <a tabIndex={-1} href={!item?.link ? '#' : item?.link} target={!item?.title ? '_self' : '_blank'} rel='noreferrer noopenner'>
                      <img src={`${APP_IMG}${item?.image}`} alt={item?.title} width='100%' height='100%' />
                    </a>
                  </div>
                ))}
          </Carousel>
        }
      </div>
    </>
  );
};

export default SectionAffiliate;
