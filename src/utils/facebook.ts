import { WEB_NAME } from 'constants/index';
import { TReplaceType } from 'interface';
import { IWebList } from 'utils/theme';

const facebookList: TReplaceType<IWebList, string> = {
  thansettakij: ` 
    <iframe title="widget-fb" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fthansettakij%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=370391120231501" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
  `,
  springnews: ``,
  posttoday: `<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPosttoday&tabs=timeline&width=340&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1042570889711970" width="340" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
  bangkokbiznews: `
    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbangkokbiznews%2F&tabs=timeline&width=340&height=440&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1567470763341993" width="340" height="440" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
  `,
  komchadluek: ``,
  nationthailand: ` 
    <iframe title="fb-iframe" aria-label="fb-iframe" loading="lazy" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTheNationThailand%2F&tabs=timeline&width=340&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=457910038922239" width="400" height="350" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
  `,
  thepeople: ``,
  nationtv: ``,
  tnews: ``,
  khobsanam: ``,
  thainewsonline: ``,
  default: ``
};

export const facebook = facebookList[WEB_NAME];
