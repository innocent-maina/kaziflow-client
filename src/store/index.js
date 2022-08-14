import Vue from 'vue'
import Vuex from 'vuex'

import projects from './modules/projects.js'
import system from './modules/system.js'
import tasks from './modules/tasks.js'
import employees from './modules/employees.js'
import teams from './modules/teams.js'
import authentication from './modules/authentication.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    projects,
    system,
    teams,
    tasks,
    employees
  }
})
