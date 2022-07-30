import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Settings from '@/pages/Settings.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let stubs
let wrapper
let store
let mockActions
let mockGetters

beforeEach(() => {
  stubs = ['base-input', 'base-button']

  mockActions = {
    updatePassword: jest.fn(),
    installerUpdatePassword: jest.fn(),
  }
  mockGetters = {
    getInstallerEmail: () => '',
    getInitiatorEmail: () => '',
    getUserType: () => 'initiator'
  }

  store = new Vuex.Store({
    actions:mockActions,
    getters:mockGetters
  })

  wrapper = shallowMount(Settings, {
    localVue,
    stubs,
    store,
    computed: { // mock computed
      lang: () => "en"
    },
    mocks: {$notify: (message) => ''}
  })
  
})

describe('Settings',() => {
  it('has an input and button for changing email', () => {
    const email_input = wrapper.findAll("base-input-stub").at(0)
    const email_button = wrapper.findAll("base-button-stub").at(0)
    expect(email_input.exists()).toBe(true)
    expect(email_button.exists()).toBe(true)
  })
  
  it('has a change password button that shows one input', async () => {
    expect(wrapper.findAll("base-input-stub").length).toBe(1) //one input before clicking

    let mockShowChangePassword = jest.spyOn(wrapper.vm, 'showChangePassword')
    const change_password_button = wrapper.findAll("base-button-stub").at(1)
    change_password_button.vm.$emit('click')
    
    expect(mockShowChangePassword).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    
    //const current_password = wrapper.findAll("base-input-stub").at(1)
    const new_password = wrapper.findAll("base-input-stub").at(1)
    //expect(current_password.exists()).toBe(true)
    expect(new_password.exists()).toBe(true)
  })
  
  it('has save password button that calls saveNewPassword method and dispatches updatePassword', async() => {
    expect(wrapper.findAll("base-button-stub").length).toBe(2) //2 buttons before clicking
    let mockShowChangePassword = jest.spyOn(wrapper.vm, 'showChangePassword')
    let mockSaveNewPassword = jest.spyOn(wrapper.vm, 'saveNewPassword')

    wrapper.findAll("base-button-stub").at(1).vm.$emit('click') // click on change password
    expect(mockShowChangePassword).toHaveBeenCalled()
    await wrapper.vm.$nextTick()

    const save_new_password = wrapper.findAll("base-button-stub").at(2)
    save_new_password.vm.$emit('click')

    expect(mockSaveNewPassword).toHaveBeenCalled()
    expect(mockActions.updatePassword).toHaveBeenCalled()
  })

  it('has save password button that calls saveNewPassword method and dispatches updatePassword', async() => {
    mockGetters = {
      getInstallerEmail: () => '',
      getInitiatorEmail: () => '',
      getUserType: () => ''
    }
  
    store = new Vuex.Store({
      actions:mockActions,
      getters:mockGetters
    })
  
    wrapper = shallowMount(Settings, {
      localVue,
      stubs,
      store,
      computed: { // mock computed
        lang: () => "en"
      }
    })

    expect(wrapper.findAll("base-button-stub").length).toBe(2) //2 buttons before clicking
    let mockShowChangePassword = jest.spyOn(wrapper.vm, 'showChangePassword')
    let mockSaveNewPassword = jest.spyOn(wrapper.vm, 'saveNewPassword')

    wrapper.findAll("base-button-stub").at(1).vm.$emit('click') // click on change password
    expect(mockShowChangePassword).toHaveBeenCalled()
    await wrapper.vm.$nextTick()

    const save_new_password = wrapper.findAll("base-button-stub").at(2)
    save_new_password.vm.$emit('click')

    expect(mockSaveNewPassword).toHaveBeenCalled()
    expect(mockActions.installerUpdatePassword).toHaveBeenCalled()
  })

  it('has hide button that calls hideChangePassword method that dispatches update password for installer', async() => {
    expect(wrapper.findAll("base-button-stub").length).toBe(2) //2 buttons before clicking
    let mockShowChangePassword = jest.spyOn(wrapper.vm, 'showChangePassword')
    let mockHideChangePassword = jest.spyOn(wrapper.vm, 'hideChangePassword')

    wrapper.findAll("base-button-stub").at(1).vm.$emit('click') // click on change password
    expect(mockShowChangePassword).toHaveBeenCalled()
    await wrapper.vm.$nextTick()

    const hide_password = wrapper.findAll("base-button-stub").at(3)
    hide_password.vm.$emit('click')
    expect(mockHideChangePassword).toHaveBeenCalled()
  })



})