import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Navbar from '@/components/Navbar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let store
let mockActions
let router

beforeEach(() => {
  mockActions = {
    setSelectedInstallerInitiativeId: jest.fn(),
    setLoadingMode: jest.fn()
  }

  router = new VueRouter({
    routes: []
  })

  store = new Vuex.Store({
    state: {
      system: {
        isNavBarVisible: true,
        isAsideMobileExpanded: false,
      },
      authentication: {
        firstName: "wahome",
        lastName: "wahome",
        userEmail: "wahome@example.com",
      },
      isNavBarVisible: true,
    },
    actions: mockActions,
    getters: {
      getInstallerInitiatives: () => []
    }
  })

  wrapper = mount(Navbar, {
    store,
    localVue,
    router,
    stubs: [
      'base-button',
      'router-link',
      'initiative-title-image',
      'base-spinner',
      'font-awesome-icon'
    ]
  })

  wrapper.setData({
    active_filter: 'all'
  })
})

describe('Installer Initiative', () => {
  it('has a navbar-brand class', () => {
    const initiatives = wrapper.find('.navbar-brand')
    expect(initiatives.exists()).toBe(true)
  })
})
