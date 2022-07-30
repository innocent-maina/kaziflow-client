import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import InitiatorProfileForm from '@/pages/InitiatorProfile/InitiatorProfileForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper
let setIconImageSpy
let setLogoImageSpy
let setCoverImageSpy

let responseData = {
  cover_image_credits: 'credits',
  organizer_cover_image_url: 'coverimage',
  organizer_description: 'Description',
  organizer_email: 'admin@email.com',
  organizer_icon_url: 'icon',
  organizer_logo_url: 'logo',
  organizer_name: 'Name',
  organizer_official_email: 'email@email.com',
  organizer_official_phonenumber: '000',
  organizer_public_link: 'link',
  organizer_website: 'Web',
}

let formData = {
  organizer_description: 'Description',
  organizer_admin_email: 'admin@email.com',
  organizer_name: 'Name',
  official_email: 'email@email.com',
  organizer_official_phonenumber: '000',
  organizer_website: 'Web',
}

beforeEach(() => {
  mockActions = {
    getInitiator: jest.fn(() => Promise.resolve([responseData])),
    updateInitiator: jest.fn(),
    setLoadingMode: jest.fn(),
    setInitiatorLogo: jest.fn(),
    deactiveRemindMeLater: jest.fn(),
  }

  store = new Vuex.Store({
    state: {
      authentication: { initiator_uuid: '' }
    },
    actions: mockActions
  })

  stubs = [
    'card',
    'base-input',
    'base-button',
    'base-checkbox',
    'base-image-uploader',
    "font-awesome-icon"
  ]


  setLogoImageSpy = jest.spyOn(InitiatorProfileForm.methods, 'setLogoImage')
  setCoverImageSpy = jest.spyOn(InitiatorProfileForm.methods, 'setCoverImage')

  wrapper = shallowMount(InitiatorProfileForm, {
    store,
    localVue,
    stubs,
  })
})

describe('Initiator Profile Form Fields', () => {
  it('calls getInitiator action on mount and correct form data from response', async () => {
    expect(mockActions.getInitiator).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.form).toEqual({
      cover_image_credits: 'credits',
      organizer_description: 'Description',
      organizer_name: 'Name',
      organizer_official_email: 'email@email.com',
      organizer_official_phonenumber: '000',
      organizer_public_link: 'link',
      organizer_website: 'Web',
    })
  })

  it('has input fields', () => {
    const nameInput = wrapper.findAll("base-input-stub").at(0)
    const websiteInput = wrapper.findAll("base-input-stub").at(1)
    const emailInput = wrapper.findAll("base-input-stub").at(2)
    const phonenumberInput = wrapper.findAll("base-input-stub").at(3)
    const descriptionInput = wrapper.findAll("base-input-stub").at(4)

    expect(nameInput.exists()).toBe(true)
    expect(websiteInput.exists()).toBe(true)
    expect(emailInput.exists()).toBe(true)
    expect(phonenumberInput.exists()).toBe(true)
    expect(descriptionInput.exists()).toBe(true)

  })

  it('has image uploaders', () => {
    const logoUploader = wrapper.findAll("base-image-uploader-stub").at(0)
    const coverImageUploader = wrapper.findAll("base-image-uploader-stub").at(1)

    expect(logoUploader.exists()).toBe(true)
    expect(coverImageUploader.exists()).toBe(true)
  })

  it('calls setLogoImage for logo uploader', async () => {
    const logoUploader = wrapper.findAll("base-image-uploader-stub").at(0)
    logoUploader.vm.$emit('setImage')
    await wrapper.vm.$nextTick()
  })



  it('calls setCoverImage for cover image uploader', async () => {
    const coverImageUploader = wrapper.findAll("base-image-uploader-stub").at(1)
    coverImageUploader.vm.$emit('setImage')
    await wrapper.vm.$nextTick()
  })


  it('click on the save button calls updateInitiator function', () => {
    let mockMethod = jest.spyOn(wrapper.vm, 'updateInitiator')
    wrapper
      .find('.update-initiator')
      .vm.$emit('click') // for stubs use this, for usual buttons use .trigger('click') instead

    expect(mockMethod).toHaveBeenCalled()
    expect(mockActions.updateInitiator).toHaveBeenCalled()
  })



})
