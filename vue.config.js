module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/kaziflow/'
    : '/',

  pwa: {
    name: 'Kaziflow',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
