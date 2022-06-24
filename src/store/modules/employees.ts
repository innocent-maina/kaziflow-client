import axios from 'axios'

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
        const res = await axios.get('http://localhost:3000/api/v1/users/')
        commit('SET_EMPLOYEES', res.data?.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
