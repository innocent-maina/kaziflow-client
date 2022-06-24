import axios from 'axios'

export default {
  namespaced: true,

  state: {
    projects: []
  },
  getters: {},
  mutations: {
    SET_PROJECTS (state, payload) {
      state.projects = payload
    },
    NEW_PROJECT (state, payload) {
      state.projects.push(payload)
    },
    DELETE_PROJECT (state, payload) {
      state.projects.push(payload)
    },
  },
  actions: {
    async getAllProjects ({ commit }) {
      try {
        console.log('gotten all projects')
        const response = await axios.get(
          'http://localhost:3000/api/v1/projects/'
        )
        commit('SET_PROJECTS', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createProjects ({ commit }) {
      try {
        console.log('create project action has been called')
        const response = await axios.post(
          'http://localhost:3000/api/v1/projects/'
        )
        commit('NEW_PROJECT', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProject ({ commit }, _id) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/projects/${_id}`
        )
        commit('DELETE_PROJECT', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
