import Vue from 'vue'
import Vuex from 'vuex'

import projects from './modules/projects.ts'
import system from './modules/system.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projects,
    system
  }
})
