import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    employees: [],
    employeesCount: ''
  },
  getters: {},
  mutations: {
    SET_EMPLOYEES (state, payload) {
      state.employees = payload
    },
    SET_EMPLOYEES_COUNT (state, payload) {
      state.employeesCount = payload
    }
  },
  actions: {
    async getAllEmployees ({ commit }, state) {
      const response = await $http.Api({
        method: 'GET',
        url: '/users'
      })
      commit('SET_EMPLOYEES', response.data?.data)
      commit('SET_EMPLOYEES_COUNT', response.data?.data.length)
      return response
    },
    async createEmployee ({ commit }, payload) {
      const response = await $http.Api({
        method: 'POST',
        url: '/users',
        data: payload
      })
      return response
    },
    async updateEmployee ({ commit }, payload) {
      const response = await $http.Api({
        method: 'PUT',
        url: `/users/${payload.employeeId}`,
        data: payload.employee
      })
      return response
    },
    async deleteEmployee ({ commit }, payload) {
      const response = await $http.Api({
        method: 'DELETE',
        url: `/users/${payload}`
      })
      return response
    }
  }
}
