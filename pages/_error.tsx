const Error = ({ errorCode }: any) => {
  if (errorCode) {
    return <div> Error</div>;
  }
};

Error.getInitialProps = ({ res, err }: any) => {
  const errorCode = res ? res.errorCode : err ? err.errorCode : 404;
  return { errorCode };
};

export default Error;
