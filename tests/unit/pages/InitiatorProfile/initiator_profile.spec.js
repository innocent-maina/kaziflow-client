import { shallowMount, createLocalVue } from '@vue/test-utils'
import InitiatorProfile from '@/pages/InitiatorProfile.vue'

const localVue = createLocalVue()

let stubs
let wrapper

beforeEach(() => {
  stubs = ['initiator-profile-form']

  wrapper = shallowMount(InitiatorProfile, {
    localVue,
    stubs,
  })
})

describe('Initiator Profile',() => {
  it('has a InitiatorProfileForm component', () => {
    const initiator_profile_form = wrapper.find("initiator-profile-form-stub")
    expect(initiator_profile_form.exists()).toBe(true)
  })



})