import { Media } from 'interface/media';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export type TResponsive = Media;

const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: '690px'
  });

  const isTabletMini = useMediaQuery({
    maxWidth: '768px'
  });
  const isTabletPro = useMediaQuery({
    minWidth: '769px'
  });

  const isLaptop = useMediaQuery({
    minWidth: '691px'
  });

  const isDesktop = useMediaQuery({
    minWidth: '1024px'
  });

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isLaptop: isClient ? isLaptop : true,
    isTabletMini: isClient ? isTabletMini : false,
    isTabletPro: isClient ? isTabletPro : false,
    isMobile: isClient ? isMobile : false
  };
};

export default useResponsive;
