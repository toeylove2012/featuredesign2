import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

import { FcBarChart } from 'react-icons/fc';
import { NextPage } from 'next';
import { usePageViews } from 'utils/helper';
dayjs.extend(buddhistEra);

type ViewerProps = {
  data: number;
};
export const Viewer: NextPage<ViewerProps> = ({ data }) => {
  const _data = _.toNumber(data);
  if (!_.isNumber(_data) || _.isNaN(_data) || _data < 1) return null;
  return (
    <>
      <div className='viewer'>
        <FcBarChart size={20} />
        <span> {usePageViews(_.floor(data, 2))} </span>
      </div>
    </>
  );
};
