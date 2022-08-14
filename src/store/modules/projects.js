// import axios from 'axios'
import $http from '@/plugins/axios'
// import { reject } from 'lodash'

export default {
  namespaced: true,

  state: {
    projects: [],
    projectsCount: 0

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
    SET_PROJECTS_COUNT (state, payload) {
      state.projectsCount = payload
    }
  },
  actions: {
    async getAllProjects ({ commit }) {
      const response = await $http.Api({
        method: 'GET',
        url: '/projects'
      })
      commit('SET_PROJECTS', response.data?.data)
      commit('SET_PROJECTS_COUNT', response.data?.data.length)
      return response
    },
    async createProject ({ commit }, payload) {
      const response = await $http.Api({
        method: 'POST',
        url: '/projects',
        data: payload
      })
      return response
    },
    async updateProject ({ commit }, payload) {
      const response = await $http.Api({
        method: 'PUT',
        url: `/projects/${payload.projectId}`,
        data: payload.project
      })
      return response
    },
    async deleteProject ({ commit }, payload) {
      const response = await $http.Api({
        method: 'DELETE',
        url: `/projects/${payload}`
      })
      return response
    }
  }
}
