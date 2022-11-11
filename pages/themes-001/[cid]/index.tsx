import React, { useEffect, useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { getCategoryPage } from 'services/category.service';
import { GetServerSideProps, NextPage } from 'next';
import { IArticle, IMeta } from 'interface/section';
import { IAds, IAffiliate } from 'interface/service';
import Layout from 'themes-001/components/layout';
import styled from '@emotion/styled';
import { IMAGE_DEFAULT, WEB_DESC, WEB_KEYWORD, WEB_TITLE } from 'constants/layout';
import { useSelector } from 'react-redux';
import { dataAction } from 'themes-001/components/redux/data';
import { useAppDispatch, useAppSelector } from 'themes-001/components/redux/store';
import { NextSeo } from 'next-seo';
import { IS_NO_ROBOT_INDEX, WEB_NAME, APP_URL } from 'constants/index';
import useResponsive from 'utils/devices';
import SubCategoryWrapper from 'themes-001/components/category/sub-category';
import CategoryWrapper from 'themes-001/components/category/category';

type Props = {
  articles: IArticle[];
  dataTags: any;
  meta: IMeta;
  nextArticles: string;
  ads?: IAds[];
  lastNews?: IArticle[];
  affiliate?: IAffiliate[];
  sessionSevId: any;
};

const { clear, initialValue } = dataAction;

const CategoryPage: NextPage<Props> = (props: Props) => {
  const router: NextRouter = useRouter();
  const responsive = useResponsive();
  const dispatch = useAppDispatch();

  const { articles, dataTags, meta, nextArticles, ads, lastNews } = props;

  const _article = useMemo<IMeta>(() => ({ ...meta, title: meta?.title || WEB_TITLE, description: meta?.description || WEB_DESC, keyword: meta?.keyword || WEB_KEYWORD }), [meta]);
  const navSubMenu = useSelector((state: any) => state?.navData?.result);
  const { ids, entities } = useAppSelector(state => state.data);

  let baseUrlCategory: string = `${APP_URL}/category/${_article?.category?.en}`;
  // const articleDescriptionSeo: string = escapeChar(_article?.description) || WEB_DESC;

  // initial value
  useEffect(() => {
    /* -------------------------------- START : LOADMORE -------------------------------- */
    dispatch(
      initialValue({
        pageType: 'category',
        list: articles,
        router: router.pathname,
        nextLink: nextArticles
      })
    );
    return () => {
      dispatch(clear());
    };
  }, []);

  return (
    <>
      {/* -------------------------------- NEXT_SEO -------------------------------- */}
      <NextSeo
        noindex={IS_NO_ROBOT_INDEX}
        nofollow={IS_NO_ROBOT_INDEX}
        title={`ข่าวที่เกี่ยวข้อง ${_article?.title} หมวดหมู่ ${_article?.title}` || WEB_TITLE}
        description={_article?.description || WEB_DESC}
        openGraph={{
          type: 'article',
          locale: 'th',
          site_name: WEB_NAME,
          title: _article?.title || WEB_TITLE,
          description: _article?.description || WEB_DESC,
          url: baseUrlCategory,
          images: [
            {
              url: IMAGE_DEFAULT,
              width: 1920,
              height: 1080,
              alt: WEB_NAME
            }
          ]
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: _article?.keyword || WEB_KEYWORD
          }
        ]}
      />
      <Layout>
        <HeadSeo>
          <h1>{meta?.subCategory?.th ? `หมวดหมู่ที่เกี่ยวข้องกับ ${meta.subCategory.th}` : meta?.category?.th ? `หมวดหมู่ที่เกี่ยวข้องกับ ${meta.category.th}` : WEB_TITLE}</h1>
          <h2> {meta?.description ? meta.description : WEB_DESC}</h2>
        </HeadSeo>
        {router.query.cid && router.query.sub ? (
          <SubCategoryWrapper
            articles={articles}
            ads={ads}
            navSubMenu={navSubMenu}
            meta={meta}
            ids={ids}
            entities={entities}
            lastNews={lastNews}
            responsive={responsive}
            router={router}
            dataTags={dataTags}
          />
        ) : (
          <CategoryWrapper
            articles={articles}
            ads={ads}
            navSubMenu={navSubMenu}
            meta={meta}
            ids={ids}
            entities={entities}
            lastNews={lastNews}
            responsive={responsive}
            router={router}
            dataTags={dataTags}
          />
        )}
      </Layout>
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = getCategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  let initProps: any;
  try {
    const TInitPropsCategoryPage = await getCategoryPage({ req, res, query });
    initProps = {
      ...TInitPropsCategoryPage
    };
  } catch (err: any) {
    initProps.errMessage = err.message;
    initProps.statusCode = err?.response?.status || 500;
  }
  return {
    props: initProps
  };
};
export default CategoryPage;

const HeadSeo = styled.div`
  position: absolute;
  visibility: hidden;
  overflow: hidden;
`;
