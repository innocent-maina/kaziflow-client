import axios from 'axios'

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
        const res = await axios.get('http://localhost:3000/api/v1/tasks/')
        commit('SET_TASKS', res.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createTasks ({ commit }, payload) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/tasks',
          payload
        )
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
