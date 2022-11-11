import { NextPage } from 'next';
import LazyLoad from 'react-lazyload';
import { APP_IMG } from '../../../constants';

type TImageSize = {
  XS: 'xs';
  MD: 'md';
  MD_WEBP: 'md-webp';
  LG: 'lg';
  LG_WEBP: 'lg-webp';
  XL: 'xl';
};
export const IMAGE_SIZE: TImageSize = {
  XS: 'xs',
  MD: 'md',
  MD_WEBP: 'md-webp',
  LG: 'lg',
  LG_WEBP: 'lg-webp',
  XL: 'xl'
};

type PImage = {
  image?: string;
  title?: string;
  size?: TImageSize[keyof TImageSize];
  external?: boolean;
};
const Image: NextPage<PImage> = ({ image = '', title, external = false, size }) => {
  const imgUrl: string = external ? image : `${APP_IMG}${image}`;
  const source: string = `${imgUrl}?x-image-process=style/${size || 'lg'}`;
  const images = (
    <picture className='resolution-image'>
      <source srcSet={`${source}-webp`} media={'(max-width: 1440px)'} type='image/webp' />
      <source srcSet={`${imgUrl}?x-image-process=style/md-webp`} media={'(max-width: 690px)'} type='image/webp' />
      <source srcSet={source} media={'(max-width: 1440px)'} type='image/jpeg' />
      <source srcSet={`${imgUrl}?x-image-process=style/md`} media={'(max-width: 690px)'} type='image/jpeg' />
      <img src={source} alt={title} title={title || 'image'} width='100%' height='100%' loading='lazy' />
    </picture>
  );

  return (
    <LazyLoad offset={150} once={true}>
      {images}
    </LazyLoad>
  );
};

export default Image;
