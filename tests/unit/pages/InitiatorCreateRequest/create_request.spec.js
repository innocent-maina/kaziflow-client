import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import CreateRequest from '@/pages/InitiatorCreateRequest/CreateRequest.vue'
import RequestTable from '@/pages/InitiatorRequest/RequestTable.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let store
let mockActions
let router

beforeEach(() => {
  mockActions = {
    resetCreateRequestState: jest.fn(),
    resetCreateInitiativeState: jest.fn(),
    setActiveSection: jest.fn(),
  }

  router = new VueRouter({
    routes: [
      {
        path: '/initiatorrequesttable',
        name: 'initiatorrequesttable',
        component: RequestTable
      },
    ]
  })

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getSelectedRequestId: () => '01',
      getSingleRequestData: () => (id) => {
        return {
          request_title: 'Edited Request Title'
        }
      },
    }
  })

  wrapper = shallowMount(CreateRequest, {
    store,
    localVue,
    router,
    stubs: ['GeneralSection', 'SummarySection', 'InformationSection'],
    data() {
      return {
        prevRoute: {name: 'initiatorrequesttable'},
      }
    }
  })
  
  CreateRequest.beforeRouteEnter.call(wrapper.vm, undefined, wrapper.vm.$router.options.routes[0], (c) => c(wrapper.vm));

})

describe('Create Request', () => {
  it('(if editing) dispatches action and gets data from getters from getter', () => {
    expect(mockActions.resetCreateRequestState).toHaveBeenCalled()
    expect(wrapper.vm.$data.title).toEqual('Edited Request Title')
    expect(wrapper.vm.$data.isEdit).toBe(true)
  })

  it('has a general section component', () => {
    const general_section = wrapper.find('GeneralSection-stub')
    expect(general_section.exists()).toBe(true)
  })

  it('has a summary section component', () => {
    const summary_section = wrapper.find('SummarySection-stub')
    expect(summary_section.exists()).toBe(true)
  })

  it('has an information section component', () => {
    const information_section = wrapper.find('InformationSection-stub')
    expect(information_section.exists()).toBe(true)
  })

})
