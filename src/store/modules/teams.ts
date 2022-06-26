import axios from 'axios'
import $http from '@/plugins/axios'

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
        const response = await $http.Api({
          method: 'GET',
          url: '/teams'
        })
        commit('SET_TEAMS', response.data?.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createTeam (payload) {
      try {
        // const response = await axios.post(
        //   'http://localhost:3000/api/v1/teams',
        //   payload
        // )
        const response = $http.Api({
          method: 'POST',
          url: '/teams',
          data: payload
        })
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
