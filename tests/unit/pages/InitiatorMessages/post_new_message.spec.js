import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import PostNewMessage from '@/pages/InitiatorMessages/PostNewMessage.vue'
import Messages from '@/pages/InitiatorInitiative/Messages.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let store
let mockActions
let wrapper
let router

beforeEach(() => {
  mockActions = {
    postNewMessage: jest.fn(),
  }

  router = new VueRouter({
    routes: [
      {
        path: '/initiatormessages',
        name: 'initiatormessages',
        component: Messages
      },
    ]
  })

  store = new Vuex.Store({
    state:{
      authentication:{ initiator_uuid:''}
    },
    actions:mockActions,
    getters: {
      getSelectedInitiativeId: () => '',
    },
  })


  wrapper = shallowMount(PostNewMessage, {
    store,
    localVue,
    router,
    stubs: ['base-image-uploader', 'base-button', 'base-checkbox','CKEditorComponent',],
  })
  wrapper.setData({
    messageData: { send_email_option: true },
    initiativeId: '',
    countRem: 1000,
  })
})

describe('Post New Message Fiels',() => {
  it('has an input for typing a message title', () => {
    const input = wrapper.findAll('input').at(0)
    expect(input.exists()).toBe(true)
  })

  it('has a ckeditor for typing a message', () => {
    const ckeditor = wrapper.find('CKEditorComponent-stub')
    expect(ckeditor.exists()).toBe(true)
  })

  it('has an image uploader', () => {
    const imageUploader = wrapper.find('base-image-uploader-stub')
    expect(imageUploader.exists()).toBe(true)
  })

  it('has a checkbox', async() => {
    const checkbox = wrapper.find('base-checkbox-stub')
    expect(checkbox.exists()).toBe(true)
  })

  it('calls postNewMessage method which calls action and then redirects to /initiatormessages on Post New button click', () => {
    const button = wrapper.find('base-button-stub')
    const mockPostNewMessage = jest.spyOn(wrapper.vm, 'postNewMessage')
    expect(button.exists()).toBe(true)

    button.vm.$emit('click')
    expect(mockPostNewMessage).toHaveBeenCalled()
    expect(mockActions.postNewMessage).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toBe('/initiatormessages')
  })
})
