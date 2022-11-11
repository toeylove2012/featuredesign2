import { ReactElement } from 'react';
import { ResponsiveObject } from 'react-slick';

interface ICarousel {
  focusOnSelect?: boolean;
  dots?: boolean;
  infinite?: boolean;
  vertical?: boolean;
  centerMode?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}
interface IArrows {
  nextArrow?: ReactElement;
  prevArrow?: ReactElement;
}
interface ISetting extends ICarousel, IArrows {
  className?: string;
  verticalSwiping?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  centerPadding?: string;
  speed?: number;
  responsive?: ResponsiveObject[];
  lazyLoad?: any;
}

export type { ICarousel, IArrows, ISetting };
