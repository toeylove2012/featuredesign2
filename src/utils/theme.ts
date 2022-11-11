import { APP_IMG, WEB_NAME } from 'constants/index';

interface ITheme {
  headerLogo: string;
  footerLogo: string;
  color: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    text: string;
    lottery: string;
    newsPaper: string;
    newsPaperHover: string;
  };
  front: {
    primary: string;
    secondary: string;
  };
  gradient: {
    primary: string;
    secondary: string;
  };
}

export interface IWebList {
  thansettakij: ITheme;
  springnews: ITheme;
  posttoday: ITheme;
  bangkokbiznews: ITheme;
  komchadluek: ITheme;
  nationthailand: ITheme;
  thepeople: ITheme;
  nationtv: ITheme;
  tnews: ITheme;
  khobsanam: ITheme;
  thainewsonline: ITheme;
  default: ITheme;
}

const imageLayout = { headerLogo: `${APP_IMG}/logo.png`, footerLogo: `${APP_IMG}/logo.png` };

const webList: IWebList = {
  thansettakij: {
    ...imageLayout,
    color: {
      primary: '#b05517',
      secondary: '#c07745',
      tertiary: '#ff661f',
      quaternary: '#e97c00',
      text: '#fff',
      lottery: '#4a240a',
      newsPaper: '#ff8500',
      newsPaperHover: 'rgba(242, 122, 53, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #b34c26',
      secondary: 'linear-gradient(90deg, #b05517 0%, #e97c00 60%, #d77007 63%, #c5630e 68%, #b95b13 74%, #b25616 82%, #b05517 100%)'
    }
  },
  springnews: {
    ...imageLayout,
    color: {
      primary: '#ffe600',
      secondary: '#ffe000',
      tertiary: '#ffdd00',
      quaternary: '#ffe600',
      text: '#000',
      lottery: '#94870f',
      newsPaper: '#ffe000',
      newsPaperHover: 'rgba(255, 230, 0, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #ffe600',
      secondary: 'linear-gradient(90deg, #ffdd00 0%, #ffdd00 60%, #ffe000 63%, #ffe600 68%, #ffe000 74%, #ffdd00 82%, #ffdd00 100%)'
    }
  },
  posttoday: {
    ...imageLayout,
    color: {
      primary: '#eb2227',
      secondary: '#ea212d',
      tertiary: '#ea212d',
      quaternary: '#eb2227',
      text: '#fff',
      lottery: '#851719',
      newsPaper: '#eb2227',
      newsPaperHover: 'rgba(235, 34, 39, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #eb2227',
      secondary: 'linear-gradient(90deg, #eb2227 0%, #eb2227 60%, #ea212d 63%, #ea212d 68%, #ea212d 74%, #eb2227 82%, #eb2227 100%)'
    }
  },
  bangkokbiznews: {
    ...imageLayout,
    color: {
      primary: '#01308b',
      secondary: '#004185',
      tertiary: '#023f87',
      quaternary: '#01308b',
      text: '#fff',
      lottery: '#0d214a',
      newsPaper: '#01308b',
      newsPaperHover: 'rgba(1, 48, 139, 0.5)'
    },
    front: {
      primary: 'Mitr',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #01308b',
      secondary: 'linear-gradient(90deg, #01308b 0%, #01308b 60%, #004185 63%, #023f87 68%, #004185 74%, #01308b 82%, #01308b 100%)'
    }
  },
  komchadluek: {
    ...imageLayout,
    color: {
      primary: '#da1d21',
      secondary: '#dd1f23',
      tertiary: '#EE2424',
      quaternary: '#da1d21',
      text: '#fff',
      lottery: '#851719',
      newsPaper: '#da1d21',
      newsPaperHover: 'rgba(218, 29, 33, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #da1d21',
      secondary: 'linear-gradient(90deg, #da1d21 0%, #dd1f23 60%, #dd1f23 63%, #EE2424 68%, #dd1f23 74%, #dd1f23 82%, #da1d21 100%)'
    }
  },
  nationthailand: {
    ...imageLayout,
    color: {
      primary: '#094b7c',
      secondary: '#275099',
      tertiary: '#EC2224',
      quaternary: '#054c7c',
      text: '#fff',
      lottery: '#0e2d45',
      newsPaper: '#094b7c',
      newsPaperHover: 'rgba(9, 75, 124, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #094b7c',
      secondary: 'linear-gradient(90deg, #094b7c 0%, #094b7c 60%, #054c7c 63%, #275099 68%, #054c7c 74%, #094b7c 82%, #094b7c 100%)'
    }
  },
  thepeople: {
    ...imageLayout,
    color: {
      primary: '#dc1535',
      secondary: '#ed1a3b',
      tertiary: '#ed1a3b',
      quaternary: '#dc1535',
      text: '#fff',
      lottery: '#701826',
      newsPaper: '#dc1535',
      newsPaperHover: 'rgba(220, 21, 53, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #dc1535',
      secondary: 'linear-gradient(90deg, #dc1535 0%, #dc1535 60%, #ed1a3b 63%, #dc1535 68%, #ed1a3b 74%, #dc1535 82%, #dc1535 100%)'
    }
  },
  nationtv: {
    ...imageLayout,
    color: {
      primary: '#0111c2',
      secondary: '#0d6efd',
      tertiary: '#f8b01d',
      quaternary: '#0111c2',
      text: '#fff',
      lottery: '#121a6b',
      newsPaper: '#0111c2',
      newsPaperHover: 'rgba(1, 17, 194, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #0111c2',
      secondary: 'linear-gradient(90deg, #0111c2 0%, #0111c2 60%, #0111c2 63%, #0111c2 68%, #0111c2 74%, #0111c2 82%, #0111c2 100%)'
    }
  },
  tnews: {
    ...imageLayout,
    color: {
      primary: '#000060',
      secondary: '#000089',
      tertiary: '#bd2226',
      quaternary: '#000060',
      text: '#fff',
      lottery: '#09093b',
      newsPaper: '#000060',
      newsPaperHover: 'rgba(0, 0, 96, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #000060',
      secondary: 'linear-gradient(90deg, #000060 0%, #000060 60%, #000089 63%, #000089 68%, #000089 74%, #000060 82%, #000060 100%)'
    }
  },
  khobsanam: {
    ...imageLayout,
    color: {
      primary: '#00ff55',
      secondary: '#00ff57',
      tertiary: '#00aa2c',
      quaternary: '#00ff55',
      text: '#000',
      lottery: '#127834',
      newsPaper: '#00ff55',
      newsPaperHover: 'rgba(0, 255, 85, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #00ff55',
      secondary: 'linear-gradient(90deg, #00ff55 0%, #00ff55 60%, #00ff57 63%, #00ff55 68%, #00ff57 74%, #00ff55 82%, #00ff55 100%)'
    }
  },
  thainewsonline: {
    ...imageLayout,
    color: {
      primary: '#000063',
      secondary: '#BD2226',
      tertiary: '#007bff',
      quaternary: '#000063',
      text: '#fff',
      lottery: '#0a0a42',
      newsPaper: '#000063',
      newsPaperHover: 'rgba(0, 0, 99, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #000063',
      secondary: 'linear-gradient(90deg, #000063 0%, #000063 60%, #000063 63%, #000063 68%, #000063 74%, #000063 82%, #000063 100%)'
    }
  },
  default: {
    ...imageLayout,
    color: {
      primary: '#000063',
      secondary: '#BD2226',
      tertiary: '#007bff',
      quaternary: '#000063',
      text: '#fff',
      lottery: '#0a0a42',
      newsPaper: '#000063',
      newsPaperHover: 'rgba(0, 0, 99, 0.5)'
    },
    front: {
      primary: 'Prompt',
      secondary: 'Sarabun'
    },
    gradient: {
      primary: 'linear-gradient(278.21deg, rgba(255, 255, 255, 0.1) -141.86%, #f8eb30 -24.95%, rgba(255, 244, 233, 0) 87.38%), #000063',
      secondary: 'linear-gradient(90deg, #000063 0%, #000063 60%, #000063 63%, #000063 68%, #000063 74%, #000063 82%, #000063 100%)'
    }
  }
};
const { headerLogo, footerLogo, front, color, gradient } = webList[WEB_NAME] ? webList[WEB_NAME] : webList['default'];

const setStyleAttribute = () => {
  document.documentElement.style.setProperty('--primary-color', color.primary);
  document.documentElement.style.setProperty('--secondary-color', color.secondary);
  document.documentElement.style.setProperty('--tertiary-color', color.tertiary);
  document.documentElement.style.setProperty('--quaternary-color', color.quaternary);
  document.documentElement.style.setProperty('--front-primary', front.primary);
  document.documentElement.style.setProperty('--front-secondary', front.secondary);
  document.documentElement.style.setProperty('--text-color', color.text);
  document.documentElement.style.setProperty('--primary-gradient', gradient.primary);
  document.documentElement.style.setProperty('--secondary-gradient', gradient.secondary);
};

export { headerLogo, footerLogo, color, gradient, setStyleAttribute };
