import React from 'react';
import { NextRouter, useRouter } from 'next/router';

type Props = {};

const IndexPage = (props: Props) => {
  const router: NextRouter = useRouter();

  return <div>{JSON.stringify(router, null, 4)}</div>;
};

export default IndexPage;
