import axios from 'axios'
const $http = {
  Authentication: axios.create({
    baseURL: process.env.VUE_APP_AUTHENTICATION_URL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }),

  Api: axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}
export default $http
