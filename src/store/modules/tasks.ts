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
    async getAllTasks ({ commit }, state) {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/tasks/')
        commit('SET_TASKS', res.data?.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
