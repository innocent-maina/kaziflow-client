import axios from 'axios'

export default {
  namespaced: true,

  state: {
    projects: []

  },
  getters: {
  },
  mutations: {
    SET_PROJECTS (state, payload) {
      state.projects = payload
    }
  },
  actions: {
    async getAllProjects ({ commit }, state) {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/projects/')
        commit('SET_PROJECTS', res.data?.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
