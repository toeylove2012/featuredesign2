import LazyLoad from 'react-lazyload';
// import ContentLoader from 'src/components/content-loader';
import { APP_IMG } from 'constants/index';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
const ContentLoader = (_props: any) => <></>;
type Props = {
  title?: string;
  image?: string;
  ignoreLazy?: boolean;
  horizontal?: boolean;
  crossDomain?: boolean;
  specialNews?: boolean;
  external?: boolean;
  onError?: Function;
};
const Image: NextPage<Props> = ({ title, image, ignoreLazy, horizontal = false, crossDomain = false, specialNews = false, external = false, onError }) => {
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    setImgError(false);
  }, [image]);

  let elem = (
    <picture className='resolution-image'>
      <img src={`${APP_IMG}/default.jpg`} alt={title} loading='lazy' />
    </picture>
  );
  if (image) {
    const imgUrl = imgError ? `${APP_IMG}/default.jpg` : crossDomain ? `https://media2.nationthailand.com${image}` : external ? image : `${APP_IMG}${image}`;
    elem = (
      <picture className='resolution-image'>
        <source srcSet={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/xs-webp`} media={'(max-width: 425px)'} type='image/webp' />
        <source srcSet={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/xs`} media={'(max-width: 425px)'} type='image/jpeg' />
        <source srcSet={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/md-webp`} media={'(max-width: 727px)'} type='image/webp' />
        <source srcSet={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/md`} media={'(max-width: 727px)'} type='image/jpeg' />
        <source srcSet={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/lg-webp`} type='image/webp' />
        <img
          src={specialNews ? imgUrl : `${imgUrl}?x-image-process=style/lg`}
          alt={title}
          loading='lazy'
          width='100%'
          height='100%'
          onError={() => {
            if (onError) onError(true);
            setImgError(true);
          }}
        />
      </picture>
    );
  }

  if (ignoreLazy) return elem;
  return <LazyLoad placeholder={<ContentLoader hasText={false} horizontal={horizontal} />}>{elem}</LazyLoad>;
};

export default Image;
