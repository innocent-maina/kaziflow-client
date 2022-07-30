import { shallowMount, createLocalVue } from '@vue/test-utils'
import InstallerProfile from '@/pages/InstallerProfile.vue'

const localVue = createLocalVue()

let stubs
let wrapper

beforeEach(() => {
  stubs = ['installer-profile-form']

  wrapper = shallowMount(InstallerProfile, {
    localVue,
    stubs,
  })
})

describe('Installer Profile',() => {
  it('has a InstallerProfileForm component', () => {
    const installer_profile_form = wrapper.find("installer-profile-form-stub")
    expect(installer_profile_form.exists()).toBe(true)
  })



})