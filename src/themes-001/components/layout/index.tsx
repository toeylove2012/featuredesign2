import { IMenu } from 'interface/layout';
import _ from 'lodash';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { GET } from 'services';
import { timestamp } from 'utils/helper';
import { NextRouter, useRouter } from 'next/router';
import { NAV_DATA } from '../redux/navSlice';
import { useDispatch } from 'react-redux';
import SwitchThemes from 'services/switch-themes';

const Header = dynamic(import('themes-001/components/layout/herder'), { ssr: true });
const Footer = dynamic(import('themes-001/components/layout/footer'), { ssr: true });

const Layout: NextPage = ({ children }) => {
  const [navData, setNavData] = useState<IMenu[]>([]);
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res: IMenu[] = await GET('/api/v1.0/navigations/menu-nav?limit=5', false, false);
        !_.isEmpty(res) && setNavData(res);
        const find = res?.filter(i => i.nameEng === router?.query?.cid);
        if (!_.isEmpty(find)) {
          dispatch(NAV_DATA(find));
        }
      } catch (err: any) {
        console.error(`${timestamp()} ==========> MENU_ERROR : `, err.message);
      }
    })();
  }, []);
  return (
    <>
      <SwitchThemes />
      <Header data={navData} />
      {children}
      <Footer data={navData} />
    </>
  );
};
export default Layout;
