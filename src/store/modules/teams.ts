import axios from 'axios'

export default {
  namespaced: true,

  state: {
    teams: []

  },
  getters: {
  },
  mutations: {
    SET_TEAMS (state, payload) {
      state.teams = payload
    }
  },
  actions: {
    async getAllTeams ({ commit }, state) {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/teams/')
        commit('SET_TEAMS', res.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createTeam (payload) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/teams',
          payload
        )
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
