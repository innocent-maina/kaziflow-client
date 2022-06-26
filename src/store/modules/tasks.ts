import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    tasks: []

  },
  getters: {
  },
  mutations: {
    SET_TASKS (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async getAllTasks ({ commit }) {
      try {
        const response = await $http.Api({
          method: 'GET',
          url: '/tasks'
        })
        commit('SET_TASKS', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createTasks ({ commit }, payload) {
      try {
        // const response = await axios.post(
        //   'http://localhost:3000/api/v1/tasks',
        //   payload
        // )
        const response = $http.Api({
          method: 'POST',
          url: '/tasks',
          data: payload
        })
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
