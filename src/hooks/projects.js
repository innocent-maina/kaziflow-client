import store from '../store/index'

export default function useProjects () {
  async function fetchProjects () {
    try {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        await store
          .dispatch('projects/getAllProjects')
          .then((response) => {
            console.log('responses:', response)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
            console.log('error:', error)
          })
          .finally(() => {
            console.log('final')
          })
      })
    } catch (error) {
      console.error(error)
    }
  }
  return {
    fetchProjects
  }
}
