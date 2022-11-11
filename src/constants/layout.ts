import { APP_IMG, APP_URL, WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import _ from 'lodash';
import { IWebList } from 'utils/theme';
type TReplaceStr = TReplaceType<IWebList, string>;
const webTitle: TReplaceStr = {
  thansettakij: 'ข่าวเศรษฐกิจ ข่าววันนี้ ข่าวหุ้น ราคาทอง การเงิน ธุรกิจ อสังหาริมทรัพย์ การตลาด | ฐานเศรษฐกิจ',
  springnews: 'ข่าววันนี้ ข่าวดัง ข่าวจริง สปริงนิวส์ » Spring News',
  posttoday: 'ข่าวล่าสุด ข่าวด่วน ข่าววันนี้ สกุลเงินดิจิตัล -โพสต์ทูเดย์',
  bangkokbiznews: 'ข่าวด่วน ข่าวล่าสุด ข่าววันนี้ วิเคราะห์ข่าวเศรษฐกิจ โดยกรุงเทพธุรกิจ',
  komchadluek: 'ข่าวล่าสุด ข่าววันนี้ ข่าวด่วน สดทุกวัน คมชัดลึกออนไลน์',
  nationthailand: 'Nation Thailand news website, breaking news : Nation Thailand',
  thepeople: 'ThePeople - Everyone Has Their Own Story',
  nationtv: 'เกาะติดสถานการณ์ข่าว ข่าวด่วน ข่าววันนี้ เนชั่นทีวี | เนชั่นออนไลน์',
  tnews: 'ข่าววันนี้ ข่าวด่วน ข่าวล่าสุด สดลึกจริง โดยสำนักข่าวทีนิวส์',
  khobsanam: 'ขอบสนาม - ข่าวฟุตบอล บอลวันนี้ คลิปบอล ผลบอลสด บอลไทย พรีเมียร์ลีก',
  thainewsonline: 'ข่าวด่วน ข่าวล่าสุด ข่าววันนี้ ข่าวดัง ข่าวจริง » Thainews Online',
  default: ''
};
const webDes: TReplaceStr = {
  thansettakij: 'ข่าวเศรษฐกิจ อัพเดทข่าววันนี้ ราคาทอง น้ำมัน ข่าวตลาดหุ้น การเงิน ธุรกิจ อสังหาริมทรัพย์ การตลาด เจาะลึกแบบตรงประเด็น >>Thansettakij',
  springnews: 'สปริงนิวส์ สำนักข่าวออนไลน์ รายงานทุกข่าวด่วน ถ่ายทอดสด ทุกเหตุการณ์ Breaking News พร้อมมุมมองที่แตกต่าง ตรวจสอบข่าวจริง พิสูจน์ข่าวปลอมได้ที่นี่ www.springnews.co.th',
  posttoday:
    'เกาะติดข่าว ข่าวร้อน ข่าวเด่น ข่าววันนี้ ข่าวการเมือง ประเด็นการเมือง ข่าวเศรษฐกิจ ข่าวกีฬา ท่องเที่ยว บันเทิง ดูดวง สลากกินแบ่งรัฐบาล คลิปวีดีโอ ทันเหตุการณ์ทุกแง่มุม โดยทีมงานโพสต์ทูเดย์',
  bangkokbiznews: 'กรุงเทพธุรกิจออนไลน์ นำเสนอข่าววันนี้ ข่าวด่วน ข่าวล่าสุดทั้งหมด เกี่ยวกับข่าวธุรกิจ ข่าวการเงิน ข่าวการค้า วิเคราะห์ข่าวเศรษฐกิจ ข่าวการลงทุน เพื่อการตัดสินใจอย่างมืออาชีพ',
  komchadluek: 'ข่าวคมชัดลึกออนไลน์ : ข่าว ข่าวด่วน ข่าววันนี้ ข่าวการเมือง ข่าวบันเทิง ข่าวดารา ข่าวอาชญกรรม ข่าวเศรษฐกิจ ข่าวสังคม พระเครื่อง ดูดวง ละคร หวย สลากกินแบ่ง',
  nationthailand: "Thailand's most updated English news website, newspaper english,  breaking news : The Nation",
  thepeople: 'Everyone Has Their Own Story',
  nationtv: 'เนชั่นออนไลน์ เว็ปไซต์ข่าว ทันทุกสถานการณ์แบบนาทีต่อนาที เสนอครบทุกข่าว เจาะลึกวิเคราะห์ทุกประเด็น เพราะทุกสนามข่าวเราคือตัวจริง"',
  tnews:
    'สำนักข่าวทีนิวส์ รวบรวมข่าววันนี้ ข่าวด่วน ข่าวล่าสุดทั้งหมด เกี่ยวกับข่าวการเมือง ข่าวบันเทิง ข่าวสังคม ข่าวอาชญากรรม ข่าววาไรตี้ ข่าวภูมิภาค ข่าวต่างประเทศ ข่าวเศรษฐกิจ และข่าวกีฬา มาไว้ให้คุณ ที่นี่ที่เดียว',
  khobsanam: 'ขอบสนาม ผลบอล ข่าวบอล คลิปบอล ประวัตินักบอล รอบโลกกีฬา ฟุตบอลไทย ฟุตบอลโลก2018 ฟุตบอลต่างประเทศ ยูฟ่าแชมเปี้ยนลีก วิเคราะห์ฟุตบอล เบลล์ขอลสนาม',
  thainewsonline: 'สำนักข่าวออนไลน์ รายงานทุกข่าวด่วน ถ่ายทอดสด ทุกเหตุการณ์ Breaking news พร้อมมุมมองที่แตกต่าง',
  default: ''
};
const webKeyword: TReplaceStr = {
  thansettakij: 'วัคซีนโควิด, ซิโนเเวค, แอสตร้าเซนเนก้า, วัคซีนซิโนฟาร์ม, สละเงินเดือน, ล็อคดาวน์, ศบค., มติศบค., พล.อ.ประยุทธ์ จันทร์โอชา, เงินเดือนนายกรัฐมนตรี, เงินเดือนรัฐมนตรี, โควิดวันนี้',
  springnews: 'Spring News, สปริงนิวส์, ข่าว, ข่าวด่วน, ข่าวใหม่, ข่าวล่าสุด, ข่าววันนี้, ข่าวดัง, ข่าวจริง, Breaking News',
  posttoday:
    'โพสต์ทูเดย์, Posttoday, Post Today, ข่าว, ข่าววันนี้, วิเคราะห์, ข่าวด่วน, ข่าวเด่น, บันเทิง, ดูดวง, ดวงรายสัปดาห์, คลิปข่าว, วิดีโอ ,เศรษฐกิจ, ทอง, ราคาน้ำมัน, อัตราแลกเปลี่ยน, การเมือง, กีฬา, การเงิน, การตลาด,  ต่างประเทศ',
  bangkokbiznews: 'อ่านข่าวออนไลน์, กรุงเทพธุรกิจ, ข่าวเด่นประจำวัน, ข่าวโซเซียล, ข่าวธุรกิจ, การเงิน, เศรษฐกิจต่างประเทศ, คลิปข่าว, ข่าวบันเทิง',
  komchadluek:
    'ข่าว, ข่าววันนี้, ข่าววันนี้ ข่าวด่วน, การเมือง, บันเทิง, อาชญกรรม, เศรษฐกิจ, พระเครื่อง,ดูดวง, คนรักบ้าน-ยานยนต์, เกษตร, วิทยาศาสตร์, ไอที, คมคิดธุรกิจนิวเจน, ไลฟ์สไตล์, ข่าวการเมือง, ข่าวบันเทิง, ข่าวอาชญกรรม, เศรษฐกิจ,สุทธิชัย หยุ่น,เนชั่น,คมชัดลึก',
  nationthailand: 'thailand news, thai news, nation news thailand,king, king bhumibol, thai, the nation',
  thepeople: 'interview, culture, politics, business, environment, social, history, news',
  nationtv:
    'นชั่นทีวี, สื่่อดิจิตอล, ข่าววันนี้, Nation, NationTV, ข่าวด่วน, ข่าวยอดนิยม, ข่าวออนไลน์, ข่าวล่าสุด, nationtv22, เนชั่นออนไลน์, NationOnline, Live, เจาะประเด็นร้อน, สถานการณ์รายวัน, ข่าวเนชั่น, เนชั่นทีวีช่อง22, ถ่ายทอดสด',
  tnews: 'การเมือง,สังคม,บันเทิง,อาชญากรรม,วาไรตี้,ภูมิภาค,ต่างประเทศ,เศรษฐกิจ,กีฬา',
  khobsanam: 'ขอบสนาม ผลบอล ข่าวบอล คลิปบอล ประวัตินักบอล รอบโลกกีฬา ฟุตบอลไทย ฟุตบอลโลก2018 ฟุตบอลต่างประเทศ ยูฟ่าแชมเปี้ยนลีก วิเคราะห์ฟุตบอล เบลล์ขอลสนาม',
  thainewsonline: 'Thainews,ข่าว,ข่าวด่วน,ข่าวใหม่,ข่าวล่าสุด,ข่าววันนี้,ข่าวดัง,ข่าวจริง,Breaking News',
  default: ''
};
const webUrl: TReplaceType<IWebList, { WEB: string; FACEBOOK: string; TWITTER: string; INSTAGRAM: string; YOUTUBE: string; LINE: string; TIKTOK: string }> = {
  thansettakij: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/thansettakij/',
    TWITTER: 'https://twitter.com/thansettakij/',
    INSTAGRAM: '',
    YOUTUBE: 'https://www.youtube.com/channel/UCcTiVmhW5zC6mn71vYbDvpQ',
    LINE: 'https://page.line.me/thansettakij',
    TIKTOK: ''
  },
  springnews: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/SpringNewsonline',
    TWITTER: 'https://twitter.com/SPRiNGNEWS_TH',
    INSTAGRAM: 'https://www.instagram.com/springnews/',
    YOUTUBE: 'https://www.youtube.com/user/springnewsonline',
    LINE: 'https://line.me/R/ti/p/@springnews',
    TIKTOK: 'https://www.tiktok.com/@springonline'
  },
  posttoday: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/Posttoday',
    TWITTER: 'https://twitter.com/PostToday',
    INSTAGRAM: 'https://www.instagram.com/posttoday_online',
    YOUTUBE: 'https://www.youtube.com/channel/UCcaKwzuSJCmKfpxMonvPawQ',
    LINE: 'http://line.me/ti/p/@posttoday',
    TIKTOK: ''
  },
  bangkokbiznews: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/bangkokbiznews',
    TWITTER: 'https://twitter.com/ktnewsonline',
    INSTAGRAM: 'https://www.instagram.com/bangkokbiznews/',
    YOUTUBE: 'https://www.youtube.com/channel/UCwAoYpzi-LmKhRXlW4bMdBA',
    LINE: 'https://line.me/R/ti/p/%40rvb8351i',
    TIKTOK: ''
  },
  komchadluek: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/komchadluek/',
    TWITTER: 'https://twitter.com/kom_chad_luek',
    INSTAGRAM: 'https://www.instagram.com/komchadluek_online/?hl=en',
    YOUTUBE: 'https://www.youtube.com/user/KOMCHADLUEK',
    LINE: 'https://line.me/R/ti/p/%40pdr1047a',
    TIKTOK: 'https://www.tiktok.com/@komchadluekent'
  },
  nationthailand: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/TheNationThailand',
    TWITTER: 'https://twitter.com/Thenationth',
    INSTAGRAM: '',
    YOUTUBE: 'https://www.youtube.com/c/TheNationThailandonline',
    LINE: 'https://page.line.me/505rwupf',
    TIKTOK: ''
  },
  thepeople: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/thepeoplecoofficial/',
    TWITTER: 'https://twitter.com/thepeople_co',
    INSTAGRAM: 'https://www.instagram.com/thepeoplecoofficial/',
    YOUTUBE: 'https://www.youtube.com/c/THEPEOPLECoOfficial',
    LINE: '',
    TIKTOK: ''
  },
  nationtv: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/NationOnline',
    TWITTER: 'https://twitter.com/nationTV22',
    INSTAGRAM: 'https://www.instagram.com/nationtv22_/',
    YOUTUBE: 'https://www.youtube.com/channel/UCIoFfVIOrRRbI-WVdDhTTwg',
    LINE: 'https://line.me/ti/p/@zqq6283m',
    TIKTOK: ''
  },
  tnews: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/ThaiNews.co/',
    TWITTER: 'https://twitter.com/thainews_news',
    INSTAGRAM: 'https://www.instagram.com/thainews_online/',
    YOUTUBE: 'https://www.youtube.com/channel/UC0tGdIgAmZT-9P-I6vCJNFg',
    LINE: 'https://liff.line.me/1645278921-kWRPP32q/?accountId=hmx9435o',
    TIKTOK: ''
  },
  khobsanam: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/khobsanam/',
    TWITTER: '',
    INSTAGRAM: 'https://www.instagram.com/khobsanam/',
    YOUTUBE: 'https://www.youtube.com/channel/UCkN80VKrPiKYyz7ByBaRosQ',
    LINE: '',
    TIKTOK: ''
  },
  thainewsonline: {
    WEB: `${APP_URL}/`,
    FACEBOOK: 'https://www.facebook.com/ThaiNews.co/',
    TWITTER: 'https://twitter.com/Thainews_News',
    INSTAGRAM: 'https://www.instagram.com/thainews_online/',
    YOUTUBE: 'https://youtube.com/channel/UC0tGdIgAmZT-9P-I6vCJNFg',
    LINE: 'https://liff.line.me/1454988218-NjbXbq18/v2/publisher/102634?utm_source=copyshare',
    TIKTOK: ''
  },
  default: {
    WEB: '',
    FACEBOOK: '',
    TWITTER: '',
    INSTAGRAM: '',
    YOUTUBE: '',
    LINE: '',
    TIKTOK: ''
  }
};
const themeWeb: TReplaceStr = {
  thansettakij: '#ef8008',
  springnews: '#000000',
  posttoday: '#c80309',
  bangkokbiznews: '#000000',
  komchadluek: '#ed2024',
  nationthailand: '#ffffff',
  thepeople: '#000000',
  nationtv: '#27589d',
  tnews: '#0100ba',
  khobsanam: '#00ff57',
  thainewsonline: '#000000',
  default: ''
};
const themeTitle: TReplaceStr = {
  thansettakij: 'default',
  springnews: 'default',
  posttoday: 'default',
  bangkokbiznews: 'default',
  komchadluek: '#424242',
  nationthailand: 'default',
  thepeople: 'default',
  nationtv: 'default',
  tnews: 'default',
  khobsanam: 'default',
  thainewsonline: 'default',
  default: ''
};
const themeAppleBar: TReplaceStr = {
  thansettakij: 'default',
  springnews: 'black',
  posttoday: 'red',
  bangkokbiznews: 'default',
  komchadluek: '#424242',
  nationthailand: 'black',
  thepeople: 'black',
  nationtv: 'default',
  tnews: 'black',
  khobsanam: 'black',
  thainewsonline: 'default',
  default: ''
};
const addressOrg: TReplaceType<IWebList, { CONTENT: string; PROVINCE: string; REGION: string; POSTCODE: string; COUNTRY: string }> = {
  thansettakij: {
    CONTENT: 'บริษัท ฐานเศรษฐกิจ มัลติมีเดีย จํากัด 1854 ชั้น 8 ถนนเทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  springnews: {
    CONTENT: 'ชั้น 7 เลขที่ 1854 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  posttoday: {
    CONTENT: '1854 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพมหานคร',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  bangkokbiznews: {
    CONTENT: 'บริษัท กรุงเทพธุรกิจ มีเดีย จำกัด 1858/126 ชั้นที่ 30 ถนนเทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  komchadluek: {
    CONTENT: '1858/57-62 อาคารอินเตอร์ลิงค์ ทาวเวอร์ ชั้น 12A ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  nationthailand: {
    CONTENT: '1854 Debaratana Rd, Bang Na',
    PROVINCE: 'Bangkok',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  thepeople: {
    CONTENT: 'ชั้น 7 เลขที่ 1854 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  nationtv: {
    CONTENT: 'เลขที่ 1854 อาคารอินเตอร์ลิงก์ทาวเวอร์ ถนนเทพรัตน  แขวงบางนาใต้ เขตบางนา  กรุงเทพมหานคร 10260',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  tnews: {
    CONTENT: 'เลขที่ 1854 ชั้นที่ 7 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  khobsanam: {
    CONTENT: 'บริษัท ขอบสนาม จำกัด 388/72 โครงการ Biz Galleria ถ. นวลจันทร์ แขวง คลองกุ่ม เขต บึงกุ่ม',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10230',
    COUNTRY: 'THAILAND'
  },
  thainewsonline: {
    CONTENT: 'ชั้น 7 เลขที่ 1854 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา',
    PROVINCE: 'กรุงเทพฯ',
    REGION: 'TH',
    POSTCODE: '10260',
    COUNTRY: 'THAILAND'
  },
  default: {
    CONTENT: '',
    PROVINCE: '',
    REGION: '',
    POSTCODE: '',
    COUNTRY: ''
  }
};
const facebook: TReplaceType<IWebList, { ADMIN: string; APP_ID: string; PAGE: string }> = {
  thansettakij: {
    ADMIN: '',
    APP_ID: '',
    PAGE: '307513345840'
  },
  springnews: {
    ADMIN: '',
    APP_ID: '',
    PAGE: '380377805483443'
  },
  posttoday: {
    ADMIN: '',
    APP_ID: '467832686656783',
    PAGE: '119948869834'
  },
  bangkokbiznews: {
    ADMIN: '',
    APP_ID: '192332974272649',
    PAGE: '135182934814'
  },
  komchadluek: {
    ADMIN: '',
    APP_ID: '674613272705932',
    PAGE: '208428464667'
  },
  nationthailand: {
    ADMIN: '',
    APP_ID: '',
    PAGE: ''
  },
  thepeople: {
    ADMIN: '',
    APP_ID: '1023078414531349',
    PAGE: '1023078414531349'
  },
  nationtv: {
    ADMIN: '',
    APP_ID: '',
    PAGE: '307513345840'
  },
  tnews: {
    ADMIN: '100000775096710',
    APP_ID: '313270425990794',
    PAGE: '109027265795454'
  },
  khobsanam: {
    ADMIN: '',
    APP_ID: '',
    PAGE: '380377805483443'
  },
  thainewsonline: {
    ADMIN: '',
    APP_ID: '',
    PAGE: '104756591593130'
  },
  default: {
    ADMIN: '',
    APP_ID: '',
    PAGE: ''
  }
};
const twitter: TReplaceType<IWebList, { HANDLE?: string; CREATOR: string; SITE: string }> = {
  thansettakij: {
    CREATOR: '@Thansettakij',
    SITE: '@Thansettakij'
  },
  springnews: {
    HANDLE: 'Spring News',
    CREATOR: '@SPRiNGNEWS_TH',
    SITE: '@SPRiNGNEWS_TH'
  },
  posttoday: {
    CREATOR: '@Posttoday',
    SITE: '@Posttoday'
  },
  bangkokbiznews: {
    HANDLE: 'กรุงเทพธุรกิจ',
    CREATOR: '@ktnewsonline',
    SITE: '@ktnewsonline'
  },
  komchadluek: {
    HANDLE: 'คมชัดลึกออนไลน์',
    CREATOR: '@Kom_chad_luek',
    SITE: '@Kom_chad_luek'
  },
  nationthailand: {
    CREATOR: '@Thenationth',
    SITE: '@Thenationth'
  },
  thepeople: {
    HANDLE: 'The People',
    CREATOR: '@thepeople_co',
    SITE: '@thepeople_co'
  },
  nationtv: {
    CREATOR: '@NationTV22',
    SITE: '@NationTV22'
  },
  tnews: {
    HANDLE: 'ThaiNews – ไทยนิวส์',
    CREATOR: '@Thainews_News',
    SITE: '@Thainews_News'
  },
  khobsanam: {
    HANDLE: 'ขอบสนาม',
    CREATOR: '@Khobsanam',
    SITE: '@Khobsanam'
  },
  thainewsonline: {
    CREATOR: '',
    SITE: ''
  },
  default: {
    CREATOR: '',
    SITE: ''
  }
};

export const WEB_TITLE = webTitle[WEB_NAME];
export const WEB_DESC = webDes[WEB_NAME];
export const WEB_KEYWORD = webKeyword[WEB_NAME];
export const WEB_URL = webUrl[WEB_NAME];
export const WEB_URL_SAME_AS = _.join(
  _.reduce(WEB_URL, (res: string[], n: string) => (_.isEmpty(n) ? res : [...res, `"${n}"`]), []),
  ', '
);
export const WEB_LOGO = 'logo.svg';

export const THEME_WEB = themeWeb[WEB_NAME];
export const THEME_TITLE = themeTitle[WEB_NAME];
export const THEME_APPLE_BAR = themeAppleBar[WEB_NAME];

export const ADDRESS_ORG = addressOrg[WEB_NAME];

export const FACEBOOK = facebook[WEB_NAME];
export const TWITTER = twitter[WEB_NAME];

export const LOGO_192 = 'logo-192.svg';
export const LOGO_MARK = 'logo-mask.png';
export const LOGO_APPLE = 'logo-apple.png';
export const LOGO_FAVICON = 'favicon.ico';
export const IMAGE_DEFAULT = `${APP_IMG}/default.jpg`;
