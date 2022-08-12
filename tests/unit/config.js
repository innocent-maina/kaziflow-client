import { config } from '@vue/test-utils'

// import translations from '../../src/locales/en.json'

config.mocks.$notify = message => {
  return message
}

// config.mocks.$t = key => {
//   const values = key.split('.')
//   let search = ''
//   // eslint-disable-next-line array-callback-return
//   values.map(x => {
//     if (search === '') {
//       search = translations[x]
//     } else {
//       search = search[x]
//     }
//   })
//   return search
// }
