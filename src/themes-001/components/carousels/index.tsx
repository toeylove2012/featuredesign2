import Carousel from 'react-slick';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { IArrows, ICarousel, ISetting } from 'interface/carousels';
import styled from '@emotion/styled';

function NextArrow(props: any) {
  const { className, onClick, nextArrow } = props;
  return (
    <div onClick={onClick} className={className}>
      {nextArrow ? nextArrow : <FiChevronRight />}
    </div>
  );
}
function PrevArrow(props: any) {
  const { className, onClick, prevArrow } = props;
  return (
    <div className={className} onClick={onClick}>
      {prevArrow ? prevArrow : <FiChevronLeft />}
    </div>
  );
}

interface IProps extends ICarousel {
  children: ReactNode;
  slideShow?: number;
  mobileSlideShow?: number;
  showArrow?: boolean;
  prevArrow?: ReactNode;
  nextArrow?: ReactNode;
}
const Carousels: NextPage<IProps> = ({
  children,
  slideShow = 1,
  mobileSlideShow = 1,
  autoplay = true,
  pauseOnHover = true,
  dots = true,
  autoplaySpeed = 4000,
  focusOnSelect = false,
  vertical = false,
  infinite = true,
  showArrow = false,
  centerMode = false,
  prevArrow,
  nextArrow
}) => {
  const arrows: IArrows = showArrow
    ? {
        nextArrow: <NextArrow nextArrow={nextArrow} />,
        prevArrow: <PrevArrow prevArrow={prevArrow} />
      }
    : {};
  const settings: ISetting = {
    ...arrows,
    focusOnSelect: focusOnSelect,
    dots: dots,
    speed: 1000,
    infinite: infinite,
    vertical: vertical,
    className: 'center slide',
    centerMode: centerMode,
    verticalSwiping: vertical,
    slidesToShow: slideShow || 3,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: pauseOnHover,
    centerPadding: '250px', // for size 4k
    responsive: [
      {
        breakpoint: 1044,
        settings: {
          slidesToShow: slideShow || 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: slideShow || 2,
          slidesToScroll: 1,
          centerPadding: '100px' // for size 4k
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: mobileSlideShow || 2,
          slidesToScroll: 1,
          centerPadding: '100px' // for size 4k
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: mobileSlideShow || 1,
          slidesToScroll: 1
          // centerPadding: '70px' // for size 4k
        }
      }
    ]
  };
  return (
    <CarouselWrapper className='carousel-wrapper'>
      <Carousel {...settings}>{children}</Carousel>
    </CarouselWrapper>
  );
};
const CarouselWrapper = styled.div`
  .card-item {
    padding: 0 10px;
    @media (max-width: 690px) {
      padding: 0 5px;
    }
  }
  &.carousel-wrapper {
    /* overflow: hidden; */
  }
  /* ----------------------------------- Dot ---------------------------------- */
  .slick-dots {
    position: static;
    /* padding-top: 15px; */

    .slick-active {
      button:before {
        background-color: var(--primary-color);
      }
    }
    li {
      width: 30px;
      height: 8px;
      button {
        &:before {
          content: '';
          /* border: 2px solid var(--primary-color); */
          background-color: #aaaaaa;
          width: 32px;
          height: 9px;
        }
      }
    }
  }

  .slick-disabled {
    display: block !important;
    opacity: 0.3;
  }
  /* ---------------------------------- Arrow --------------------------------- */

  .slick-next,
  .slick-prev {
    z-index: 4;

    &:before {
      content: '';
    }
    svg {
      position: absolute;
      top: 0;
      transform: translate(0, -50%);

      width: 48px;
      height: 48px;
      padding: 8px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 38px;
      color: #fff;
      background-color: rgb(0 0 0 / 80%);
    }
  }
  .slick-prev {
    left: 0px;
    svg {
      left: 0;
      padding-left: 5px;
    }
  }
  .slick-next {
    right: 0px;
    svg {
      right: 0;
      padding-right: 5px;
    }
  }
  .slick-disabled {
    display: none;
  }
`;

export default Carousels;
