import axios from 'axios'
import $http from '@/plugins/axios'

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
        const response = await $http.Api({
          method: 'GET',
          url: '/projects'
        })
        commit('SET_PROJECTS', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createProject ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'POST',
          url: '/projects',
          data: payload
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProject ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'DELETE',
          url: `/projects/${payload}`
        })
      } catch (error) {
        console.error(error)
      }
    },
  }
}
