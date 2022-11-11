import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import MetaThemes from 'utils/meta';
import NoScript from 'utils/meta/no-script';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): ReturnType<typeof Document.getInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style data-emotion-css={styles.ids.join(' ')} dangerouslySetInnerHTML={{ __html: styles.css }} />
        </>
      )
    };
  }
  render() {
    const { props, page } = this.props.__NEXT_DATA__;

    return (
      <Html lang='th' dir='ltr'>
        <Head>
          <MetaThemes data={props.pageProps} page={page} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <NoScript />
        </body>
      </Html>
    );
  }
}
