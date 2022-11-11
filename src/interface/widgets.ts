import { ReactElement } from 'react';

interface IBreadcrumbData {
  icon: string | ReactElement;
  nameTh?: string;
  nameEng?: string;
  link: string | null;
}
interface ISocialList {
  id: number;
  icon: ReactElement;
  link: string;
  name: string;
  className: string;
}
interface ISearchParams {
  q: string;
}

export type { IBreadcrumbData, ISocialList, ISearchParams };
