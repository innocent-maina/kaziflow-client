import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    employees: []

  },
  getters: {
  },
  mutations: {
    SET_EMPLOYEES (state, payload) {
      state.employees = payload
    }
  },
  actions: {
    async getAllEmployees ({ commit }, state) {
      try {
        const response = await $http.Api({
          method: 'GET',
          url: '/users'
        })
        commit('SET_EMPLOYEES', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createEmployee (payload) {
      try {
        await $http.Api({
          method: 'POST',
          url: '/users',
          data: payload
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteEmployee ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'DELETE',
          url: `/users/${payload}`
        })
      } catch (error) {
        console.error(error)
      }
    },
  }
}
