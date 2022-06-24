import axios from 'axios'

export default {
  namespaced: true,

  state: {
    userId: localStorage.getItem('userId') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    role: localStorage.getItem('role') || '',
    email: localStorage.getItem('email') || '',
    accessToken: localStorage.getItem('accessToken') || ''
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
  },
  actions: {
    async register ({ commit }, payload) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/register',
          payload
        )
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    },

    async login ({ commit }, payload, state) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/login',
          payload
        )
        // console.log(response.data)
        // const { _id, firstName, lastName, phoneNumber, email, role } =
        //   response.data
        commit('SET_ACCESS_TOKEN', response.data.authToken)
        commit('SET_USER_ID', response.data.data._id),
        commit('SET_FIRST_NAME', response.data.data.firstName),
        commit('SET_PHONE_NUMBER', response.data.data.phoneNumber),
        commit('SET_LAST_NAME', response.data.data.lastName),
        commit('SET_EMAIL', response.data.data.email),
        commit('SET_ROLE', response.data.data.role)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
