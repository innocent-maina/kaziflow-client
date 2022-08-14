// import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    teams: [],
    teamsCount: ''
  },
  getters: {
    getTeamsCount: (state) => {
      return state.teamsCount
    }
  },
  mutations: {
    SET_TEAMS (state, payload) {
      state.teams = payload
    },
    SET_TEAMS_COUNT (state, payload) {
      state.teamsCount = payload
    }
  },
  actions: {
    async getAllTeams ({ commit }) {
      const response = await $http.Api({
        method: 'GET',
        url: '/teams'
      })
      commit('SET_TEAMS', response.data?.data)
      commit('SET_TEAMS_COUNT', response.data?.data.length)
      return response
    },
    async createTeam ({ commit }, payload) {
      const response = await $http.Api({
        method: 'POST',
        url: '/teams',
        data: payload
      })
      return response
    },
    async updateTeam ({ commit }, payload) {
      const response = await $http.Api({
        method: 'PUT',
        url: `/teams/${payload.teamId}`,
        data: payload.team
      })
      return response
    },
    async deleteTeam ({ commit }, payload) {
      const response = await $http.Api({
        method: 'DELETE',
        url: `/teams/${payload}`
      })
      return response
    }
  }
}
