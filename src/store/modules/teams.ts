// import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    teams: [],
    teamsCount: ''

  },
  getters: {
    getTeamsCount: state => {
      return state.teamsCount
    },
  },
  mutations: {
    SET_TEAMS (state, payload) {
      state.teams = payload
    },
    SET_TEAMS_COUNT (state, payload) {
      state.teamsCount = payload
    },
  },
  actions: {
    async getAllTeams ({ commit }) {
      try {
        const response = await $http.Api({
          method: 'GET',
          url: '/teams'
        })
        commit('SET_TEAMS', response.data?.data)
        commit('SET_TEAMS_COUNT', response.data?.data.length)
      } catch (error) {
        console.error(error)
      }
    },
    async createTeam (payload) {
      try {
        await $http.Api({
          method: 'POST',
          url: '/teams',
          data: payload
        })
      } catch (error) {
        console.error(error)
      }
    },
    async updateTeam ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'PUT',
          url: `/teams/${payload.teamId}`,
          data: payload.team
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTeam ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'DELETE',
          url: `/teams/${payload}`
        })
      } catch (error) {
        console.error(error)
      }
    },
  }
}
