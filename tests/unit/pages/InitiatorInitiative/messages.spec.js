import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import Messages from '@/pages/InitiatorInitiative/Messages.vue'
import PostNewMessage from '@/pages/InitiatorMessages/PostNewMessage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let store
let mockActions
let router
let deleteMessage

beforeEach(() => {
  mockActions = {
    deleteMessage: jest.fn()
  }

  router = new VueRouter({
    routes: [
      {
        path: '/initiatorpostnewmessage',
        name: 'initiatorpostnewmessage',
        component: PostNewMessage
      },
    ]
  })

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInitiatorMessages:  () => (initiative_id) => [{
        "initiative_id": "3",
        "message": "One Line Message, Short Message Test.",
        "message_date": "2021-06-28T00:00:00",
        "message_id": 52,
        "message_image_url": "https://s3.eu-central-1.amazonaws.com/uploads.dashboard.com/8dt4djeqtxncmz9mwxs0a8.png",
        "message_title": "Title",
        "message_uuid": "bnEzmVTTtVGpNlcH",
        "initiators": 9
    }],
      getSelectedInitiativeId: () => '',
    }
  })

  deleteMessage = jest.spyOn(Messages.methods, 'deleteMessage')

  wrapper = shallowMount(Messages,{
    store,
    localVue,
    router,
    stubs:['base-button'],
  })

  wrapper.setData({
    messageArray: [{
      message: 'new message',
      message_date: '2021-06-28',
      message_id: 48,
      message_image_url: 'url',
      message_title: 'title',
      message_uuid: '',
      initiators: 9
    }],
    initiativeId: '',
  })
})

describe('Initiator Messages', () => {
  it('has a new message button that calls postNewMessage method and redirects to /postnewmessage', async() => {
    const button = wrapper.find('.message-upload-container > base-button-stub')
    expect(button.exists()).toBe(true)
    const mockPostNewMessage = jest.spyOn(wrapper.vm, 'postNewMessage')
    await button.vm.$emit('click')
    expect(mockPostNewMessage).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toBe('/initiatorpostnewmessage')
  })

  it('has a message title container for title and date', () => {
    const title_container = wrapper.find('.message-title-container')
    expect(title_container.exists()).toBe(true)
  })


  it('has a button icon that calls deleteMessage method', async() => {
    const button = wrapper.find('button > font-awesome-icon')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(deleteMessage).toHaveBeenCalled()
    expect(mockActions.deleteMessage).toHaveBeenCalled()
  })

  it('has a message displayed', () => {
    const row = wrapper.find('.message-content-text')
    expect(row.exists()).toBe(true)
    expect(row.text()).toContain(wrapper.vm.$data.messageArray[0].message)
  })

  it('has a message image with the correct url displayed', () => {
    const image = wrapper.find('.message-content-image')
    expect(image.exists()).toBe(true)
    expect(image.attributes().src).toBe(wrapper.vm.$data.messageArray[0].message_image_url)
  })
})
