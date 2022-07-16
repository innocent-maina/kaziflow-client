import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import RequestResponse from '@/pages/InitiatorRequest/RequestResponse.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let mockActions

beforeEach(() => {
  mockActions = {
    deleteRequest: jest.fn(),
  }

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getSelectedRequestId: () => '01',
      getRequestResponseData: () => (id) => [
        {
          response_date: '',
          response_organisation: '',
          response_contact_person: '',
          response_email_address: ''
        },
        {
          response_date: '',
          response_organisation: '',
          response_contact_person: '',
          response_email_address: ''
        }
      ],
    }
  })

  wrapper = shallowMount(RequestResponse, {
    store,
    localVue,
  })
  
})

describe('Request Response', () => {
  it('gets getSelectedRequestId on mounted', () => {
    expect(wrapper.vm.$data.request_id).toBe('01');
  })

  it('has responses for valid response data', () => {
    const responses = wrapper.findAll('.request-response');
    expect(responses.length).toBe(2);
  })

  it('has delete response method', async() => {
    let mockDeleteResponse = jest.spyOn(wrapper.vm, 'deleteResponse')
    const delete_response = wrapper.findAll('.subsection-delete').at(0);
    expect(delete_response.exists()).toBe(true);

    delete_response.trigger('click');
    expect(mockDeleteResponse).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(mockActions.deleteRequest).toHaveBeenCalled();
  })


})