import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    employees: [],
    employeesCount: ''

  },
  getters: {
  },
  mutations: {
    SET_EMPLOYEES (state, payload) {
      state.employees = payload
    },
    SET_EMPLOYEES_COUNT (state, payload) {
      state.employeesCount = payload
    },
  },
  actions: {
    async getAllEmployees ({ commit }, state) {
      try {
        const response = await $http.Api({
          method: 'GET',
          url: '/users'
        })
        commit('SET_EMPLOYEES', response.data?.data)
        commit('SET_EMPLOYEES_COUNT', response.data?.data.length)
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
    async updateEmployee ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'PUT',
          url: `/users/${payload.userId}`,
          data: payload.user
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
