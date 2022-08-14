// import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    userId: localStorage.getItem('userId') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    role: localStorage.getItem('role') || '',
    email: localStorage.getItem('email') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    password: localStorage.getItem('password') || ''
  },

  getters: {},

  mutations: {
    SET_USER_ID (state, payload) {
      localStorage.setItem('userId', payload)
      state.userId = payload
    },
    SET_FIRST_NAME (state, payload) {
      localStorage.setItem('firstName', payload)
      state.firstName = payload
    },
    SET_PHONE_NUMBER (state, payload) {
      localStorage.setItem('phoneNumber', payload)
      state.phoneNumber = payload
    },
    SET_LAST_NAME (state, payload) {
      localStorage.setItem('lastName', payload)
      state.lastName = payload
    },
    SET_EMAIL (state, payload) {
      localStorage.setItem('email', payload)
      state.email = payload
    },
    SET_ROLE (state, payload) {
      localStorage.setItem('role', payload)
      state.role = payload
    },
    SET_ACCESS_TOKEN (state, payload) {
      localStorage.setItem('accessToken', payload)
      state.accessToken = payload
    },
    SET_PASSWORD (state, payload) {
      localStorage.setItem('password', payload)
      state.password = payload
    }
  },
  actions: {
    async register ({ commit }, payload) {
      try {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          await $http.Authentication({
            method: 'POST',
            url: '/register',
            data: payload
          }).then((response) => {
            resolve(response)
          }).catch((error) => {
            reject(error)
          })
        })
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },

    async logout ({ commit }) {
      try {
        localStorage.clear()
        window.localStorage.clear()
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_USER_ID', '')
        commit('SET_FIRST_NAME', '')
        commit('SET_PHONE_NUMBER', '')
        commit('SET_LAST_NAME', '')
        commit('SET_EMAIL', '')
        commit('SET_ROLE', '')
        commit('SET_PASSWORD', '')
      } catch (error) {
        console.error(error)
      }
    },

    async login ({ commit }, payload, state) {
      try {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          const returnValue = await $http.Authentication({
            method: 'POST',
            url: '/login',
            data: payload
          })

          // console.log(returnValue.data)
          // const { _id, firstName, lastName, phoneNumber, email, role } =
          //   returnValue.data
          commit('SET_ACCESS_TOKEN', returnValue.data.authToken)
          commit('SET_USER_ID', returnValue.data.data._id)
          commit('SET_FIRST_NAME', returnValue.data.data.firstName)
          commit('SET_PHONE_NUMBER', returnValue.data.data.phoneNumber)
          commit('SET_LAST_NAME', returnValue.data.data.lastName)
          commit('SET_EMAIL', returnValue.data.data.email)
          commit('SET_ROLE', returnValue.data.data.role)
          commit('SET_PASSWORD', returnValue.data.data.password)
            .then((response) => {
              resolve(response)
            }).catch((error) => {
              reject(error)
            })
        })
      } catch (error) {
        console.error(error)
      }
    },
    async forgotPassword ({ commit }, payload, state) {
      try {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          await $http.Authentication({
            method: 'POST',
            url: '/forgot-password',
            data: payload
          })
            .then((response) => {
              resolve(response)
            }).catch((error) => {
              reject(error)
            })
        })
      } catch (error) {
        console.error(error)
      }
    },
    async resetPassword ({ commit }, payload) {
      try {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          await $http.Authentication({
            method: 'POST',
            url: '/reset-password',
            data: payload
          }).then((response) => {
            console.log(response)
            resolve(response)
          }).catch((error) => {
            reject(error)
          })
        })
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
