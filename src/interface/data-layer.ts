interface IDataLayerGlobal {
  type?: string;
  router?: string;
  section?: string;
  position?: string;
  data?: {
    block?: string;
    title?: string;
    heading?: string;
    index?: string | number;
    carousel?: string | number;
    time?: string;
  };
}
interface IEventDefault {
  event: string;
  event_category: string;
  event_action?: string;
  event_label?: string;
}
interface IConvertCategory {
  router: string;
  section: string;
}
interface IConvertAction {
  heading: string;
  block: string;
}
interface IEventData extends IEventDefault {
  event_position?: string;
  event_index?: string;
  event_readtime?: string;
}

export type { IDataLayerGlobal, IEventDefault, IConvertCategory, IConvertAction, IEventData };
