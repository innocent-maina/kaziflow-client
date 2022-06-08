module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/kaziflow-vue-bulma-dashboard/'
    : '/'
}
