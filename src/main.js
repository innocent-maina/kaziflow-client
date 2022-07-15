/* Styles */
import '@/assets/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'
import './registerServiceWorker'

/* Router & Store */
import router from './router'
import store from './store/index'

/* Vue. Main component */
import App from './App.vue'

/* Fetch sample data */
// store.dispatch('system/fetch')

/* Default title tag */
const defaultDocumentTitle = 'Kaziflow'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach((to) => {
  store.commit('system/asideMobileStateToggle', false)
  store.dispatch('system/asideDesktopOnlyToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
