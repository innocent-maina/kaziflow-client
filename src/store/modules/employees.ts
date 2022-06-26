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
        // const response = await axios.post(
        //   'http://localhost:3000/api/v1/users',
        //   payload
        // )
        const response = $http.Api({
          method: 'POST',
          url: '/users',
          data: payload
        })
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
