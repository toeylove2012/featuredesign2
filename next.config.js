/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache.js');
const withPlugins = require('next-compose-plugins');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webName = process.env.WEB_NAME || '';
const mapPrefix = {
  thansettakij: 'THAN',
  springnews: 'SPRING',
  posttoday: 'POST',
  bangkokbiznews: 'BANGKOK',
  komchadluek: 'KOM',
  nationthailand: 'NATION_TH',
  thepeople: 'THE_PEOPLE',
  nationtv: 'NATION_TV',
  tnews: 'TNEWS',
  khobsanam: 'KHOB',
  thainewsonline: 'THAINEWS'
};
const prefix = mapPrefix[webName] ? `${mapPrefix[webName]}_` : '';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env[`${prefix}ANALYZE`] === 'true'
});
const isProd = process.env[`${prefix}NODE_ENV`] === 'production' || process.env[`${prefix}NEXT_PUBLIC_APP_ENV`] === 'production';
const CDN_URL = process.env[`${prefix}NEXT_PUBLIC_CDN_URL`] || '';
const plugins = [[withBundleAnalyzer]];

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'off'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

const nextConfig = {
  webpack5: true,
  swcMinify: true,
  poweredByHeader: false,
  assetPrefix: isProd ? CDN_URL : '',

  images: {
    domains: [process.env[`${prefix}NEXT_PUBLIC_IMG_URL_NEXT`] || 'medias.posttoday.com'],
    formats: ['image/webp']
  },
  compiler: {
    styledComponents: true,
    experimentalDecorators: true,
    jsxImportSource: 'preact',
    removeConsole: isProd && {
      exclude: ['wran', 'error']
    }
  },
  serverRuntimeConfig: {
    NEXT_SERVER_RECAPTCHA_SECRET_KEY: process.env[`${prefix}NEXT_SERVER_RECAPTCHA_SECRET_KEY`] || ''
  },
  publicRuntimeConfig: {
    WEB_NAME: process.env.WEB_NAME || 'posttoday',
    NEXT_PUBLIC_APP_ENV: process.env[`${prefix}NEXT_PUBLIC_APP_ENV`] || 'production',
    NEXT_PUBLIC_APP_URL: process.env[`${prefix}NEXT_PUBLIC_APP_URL`] || 'https://www.posttoday.com',
    NEXT_PUBLIC_API_URL: process.env[`${prefix}NEXT_PUBLIC_API_URL`] || 'https://api.posttoday.com',
    NEXT_PUBLIC_IMG_URL: process.env[`${prefix}NEXT_PUBLIC_IMG_URL`] || 'https://image.posttoday.com',
    NEXT_PUBLIC_IMG_URL_NEXT: process.env[`${prefix}NEXT_PUBLIC_IMG_URL_NEXT`] || 'image.posttoday.com',

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env[`${prefix}NEXT_PUBLIC_RECAPTCHA_SITE_KEY`] || '',

    NEXT_PUBLIC_GOPT_ID: process.env[`${prefix}NEXT_PUBLIC_GOPT_ID`] || '',
    NEXT_PUBLIC_GTM_ID: process.env[`${prefix}NEXT_PUBLIC_GTM_ID`] || '',
    NEXT_PUBLIC_GSERVICE_URL: process.env[`${prefix}NEXT_PUBLIC_GSERVICE_URL`] || '',
    NEXT_PUBLIC_TRUE_HITS_URL: process.env[`${prefix}NEXT_PUBLIC_TRUE_HITS_URL`] || '',
    NEXT_PUBLIC_IZOOTO_URL: process.env[`${prefix}NEXT_PUBLIC_IZOOTO_URL`] || '',

    CHECK_ADS: process.env[`${prefix}CHECK_ADS`],
    DEFAULT_COUNT_VIEW: process.env[`${prefix}DEFAULT_COUNT_VIEW`]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://image.posttoday.com/uploads/ads.txt',
        basePath: false
      },
      {
        source: '/themes-001/lottery',
        destination: '/themes-001/lottery'
      },
      {
        source: '/themes-001/lottery/:id',
        destination: '/themes-001/lottery/:id'
      },
      {
        source: '/themes-001/live/:cid/:id',
        destination: '/themes-001/live/:cid/:id'
      },
      {
        source: '/themes-001/category/:cid/:sid',
        destination: '/themes-001/:cid?sub=:sid'
      },
      {
        source: '/themes-001/category/:cid',
        destination: '/themes-001/:cid'
      },
      {
        source: '/themes-001/tags/:id',
        destination: '/themes-001/tags/:id'
      },
      {
        source: '/themes-001/:cid/:id(\\d{1,})',
        destination: '/themes-001/:cid/:id'
      },
      {
        source: '/themes-001/:something*/:id(\\d{1,})',
        destination: '/themes-001/news/:id'
      }
    ];
  }
  // webpack(config, options) {
  //   if (config.mode === 'production') {
  //     if (Array.isArray(config.optimization.minimizer)) {
  //       config.optimization.minimizer.push(
  //         new OptimizeCSSAssetsPlugin({
  //           cssProcessorPluginOptions: {
  //             preset: ['default', { discardComments: { removeAll: true } }]
  //           }
  //         })
  //       );
  //     }
  //   }

  //   if (!options.isServer) {
  //     const cacheGroups = config.optimization.splitChunks.cacheGroups;

  //     delete cacheGroups.react;

  //     cacheGroups.default = false;

  //     cacheGroups.vendors = {
  //       name: 'vendors',
  //       test: /[\\/]node_modules[\\/](react|react-dom|scheduler|use-subscription)[\\/]/,
  //       enforce: true,
  //       priority: 20
  //     };

  //     cacheGroups.commons = {
  //       name: 'commons',
  //       minChunks: 2,
  //       priority: 10
  //     };
  //   }

  //   return config;
  // }
};
module.exports = withPlugins(plugins, nextConfig);
