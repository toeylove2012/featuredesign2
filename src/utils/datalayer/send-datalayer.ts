import _ from 'lodash';
import { IConvertAction, IConvertCategory, IDataLayerGlobal, IEventData, IEventDefault } from 'interface/data-layer';
declare const window: any;

export const sendDataLayer = (data: IEventData): void => {
  const dataLayer: any[] = window.dataLayer || [];
  dataLayer.push({ ...data });
};

export const DATALAYER_TYPE = {
  TRACK: 'track_event',
  TRACK_SCROLL: 'track_event_scroll',
  TRACK_POSITION: 'track_event_position',
  TRACK_INDEX: 'track_event_index',
  TRACK_READTIME: 'track_event_readtime'
};

export const DATALAYER_PAGE = {
  INDEX: 'homepage',
  CATEGORY: 'category',
  TAGS: 'tags',
  SEARCH: 'search',
  CONTENT: 'content'
};

function convertAction({ heading, block }: IConvertAction): string {
  if (!_.isEmpty(block)) {
    return `click-${heading}:block-${block}`;
  }
  return heading ? `click-${heading}` : 'click';
}

function convertCategory({ router, section }: IConvertCategory): string {
  const _path = _.split(router, '/');
  const _data = {
    page: _path[1],
    category: _path[2],
    subcategory: _path[3],
    section: section
  };
  switch (router) {
    case '/':
      return `${DATALAYER_PAGE.INDEX}:${section}`;
    case '/[cid]':
      return `${DATALAYER_PAGE.CATEGORY}:${section}`;
    case '/[cid]/[id]':
      return `${DATALAYER_PAGE.CONTENT}:${section}`;
    case '/search':
      return `${DATALAYER_PAGE.SEARCH}:${section}`;
    case '/tags/[id]':
      return `${DATALAYER_PAGE.TAGS}:${section}`;
    default:
      return `${_data?.page}:${section}`;
  }
}

export function sendDataLayerGlobal({
  type = '',
  router = '',
  section = '',
  position = '',
  data = {
    block: '',
    title: '',
    heading: '',
    index: '',
    carousel: '',
    time: ''
  }
}: IDataLayerGlobal): void {
  const eventDefault: IEventDefault = {
    event: type,
    event_category: convertCategory({ router, section }),
    event_action: convertAction({
      heading: data.heading || '',
      block: data.block || ''
    }),
    event_label: data.title
  };
  switch (type) {
    case DATALAYER_TYPE.TRACK_POSITION:
      sendDataLayer({
        ...eventDefault,
        event_position: position,
        event_index: data.carousel ? `carousel-${data.carousel}` : `index-${data.index || 1}`
      });
      break;
    case DATALAYER_TYPE.TRACK_INDEX:
      sendDataLayer({
        ...eventDefault,
        event_index: data.carousel ? `carousel-${data.carousel}` : `index-${data.index || 1}`
      });
      break;
    case DATALAYER_TYPE.TRACK_READTIME:
      sendDataLayer({
        ...eventDefault,
        event_action: data.heading,
        event_label: `page-${data.title}`,
        event_readtime: data.time
      });
      break;
    case DATALAYER_TYPE.TRACK_SCROLL:
      sendDataLayer({
        ...eventDefault,
        event_action: data.heading,
        event_label: `page-${data.title}`
      });
      break;
    default:
      if (eventDefault?.event) {
        sendDataLayer({
          ...eventDefault,
          event: DATALAYER_TYPE.TRACK,
          event_category: convertCategory({
            router: router,
            section: section
          })
        });
      } else {
        console.error('ERROR', 'Data is Invalid', eventDefault);
      }
      break;
  }
}
