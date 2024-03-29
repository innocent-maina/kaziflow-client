import Vue from 'vue'
import Vuex from 'vuex'

import projects from './modules/projects.ts'
import system from './modules/system.ts'
import tasks from './modules/tasks.ts'
import employees from './modules/employees.ts'
import teams from './modules/teams.ts'
import authentication from './modules/authentication.ts'

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
