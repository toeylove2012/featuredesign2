import { NextRouter, useRouter } from 'next/router';

function index() {
  const router = useRouter();
  return <>{JSON.stringify(router, null, 4)}</>;
}

export default index;
