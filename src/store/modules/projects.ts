import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    projects: [],
    projectsCount: ''

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
        commit('SET_PROJECTS_COUNT', response.data?.data.length)
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
    async updateProject ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'PUT',
          url: `/projects/${payload.projectId}`,
          data: payload.project
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
