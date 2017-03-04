// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../public/index.html'),
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,

    github: {
      GITHUB_CODE_ENDPOINT: 'https://github.com/login/oauth/authorize',
      GITHUB_TOKEN_ENDPOINT: 'https://github.com/login/oauth/access_token',
      GITHUB_CLIENT_ID: '571c999335478c6742dd',
      // netlify github provider
      GITHUB_CALLBACK: 'https://api.netlify.com/auth/done', //https://scheduler-rebecca-55066.netlify.com/'
      GITHUB_API: 'https://api.github.com' 
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,

    github: {
      GITHUB_CODE_ENDPOINT: 'https://github.com/login/oauth/authorize',
      GITHUB_TOKEN_ENDPOINT: 'https://github.com/login/oauth/access_token',
      GITHUB_CLIENT_ID: '910abf65a44b51f93318',
      GITHUB_CALLBACK: 'http://localhost:8080/',
      GITHUB_SECRET: '96b030297ff16c36783876f1a909da591fdbc7d0',
      GITHUB_TOKEN: process.env.TOKEN,
      GITHUB_API: 'https://api.github.com' 
    }
  }
}
