import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { splitRote } from 'utils/helper';

const MetaHome = dynamic(import('utils/meta/page/home'), { ssr: true });
const MetaCategory = dynamic(import('utils/meta/page/category'), { ssr: true });
const MetaDetail = dynamic(import('utils/meta/page/detail'), { ssr: true });
const MetaTags = dynamic(import('utils/meta/page/tags'), { ssr: true });
const MetaSearch = dynamic(import('utils/meta/page/search'), { ssr: true });

type Props = {
  data?: any;
  page?: string;
};
const MetePage: NextPage<Props> = ({ data, page }) => {
  const themePage = splitRote({ route: page });
  switch (page) {
    case `${themePage || '/'}`:
      return <MetaHome metaTags={data?.metaTags} />;
    case `${themePage}/[cid]`:
      return <MetaCategory meta={data?.meta} />;
    case `${themePage}/[cid]/[id]`:
      return <MetaDetail article={data?.article} />;
    case `${themePage}/tags/[id]`:
      return <MetaTags meta={data?.meta} tagText={data?.tagText} />;
    case `${themePage}/search`:
      return <MetaSearch meta={data?.meta} searchText={data?.searchText} />;
    default:
      return null;
  }
};

export default MetePage;
