import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    tasks: [],
    tasksCount: ''

  },
  getters: {},
  mutations: {
    SET_TASKS (state, payload) {
      state.tasks = payload
    },
    SET_TASKS_COUNT (state, payload) {
      state.tasksCount = payload
    },
  },
  actions: {
    async getAllTasks ({ commit }) {
      try {
        const response = await $http.Api({
          method: 'GET',
          url: '/tasks'
        })
        commit('SET_TASKS', response.data?.data)
        commit('SET_TASKS_COUNT', response.data?.data.length)
      } catch (error) {
        console.error(error)
      }
    },
    async createTasks ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'POST',
          url: '/tasks',
          data: payload
        })
      } catch (error) {
        console.error(error)
      }
    },
    async updateTask ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'PUT',
          url: `/tasks/${payload.taskId}`,
          data: payload.task
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask ({ commit }, payload) {
      try {
        await $http.Api({
          method: 'DELETE',
          url: `/tasks/${payload.taskId}`,
          data: payload.task
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
