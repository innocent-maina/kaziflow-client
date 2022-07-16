import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router";

import InitiatorRegistration from "@/pages/Auth/InitiatorRegistration.vue"


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
let wrapper
let store
let mockActions
let router


router = new VueRouter()


beforeEach(() => {

    mockActions = {
        registerOrganizer: jest.fn()
    }
    store = new Vuex.Store({
        actions: mockActions
    })
    wrapper = shallowMount(InitiatorRegistration, {
        store,
        router,
        localVue,
        stubs: ['card', 'base-input', 'base-button', 'base-checkbox'],

    })
    wrapper.setData({
        form: {
            initiator_name: 'test institute',
            email_address: 'test@gmail.com',
            password: 'password',
            confirm_password: 'password'
        },
        checked: true
    });

})

describe('Initiator Registration screen unit test', () => {

    it('has name of institute, email, password and confirm password form fields', () => {
        const institution_name = wrapper.find("#institution_name")
        const email = wrapper.find("#email")
        const password = wrapper.find("#password")
        const confirm_password = wrapper.find("#confirm_password")

        expect(institution_name.exists()).toBe(true)
        expect(email.exists()).toBe(true)
        expect(password.exists()).toBe(true)
        expect(confirm_password.exists()).toBe(true)
    })
    it('has create account button defined', () => {
        const button = wrapper.find('#submit_button')
        expect(button.exists()).toBe(true)
    })

    it('should store input values', () => {
        wrapper.find("#institution_name").element.value = 'test institute'
        wrapper.find("#institution_name").trigger('input')
        wrapper.find("#email").element.value = 'test@gmail.com'
        wrapper.find("#email").trigger('input')
        wrapper.find("#password").element.value = 'password'
        wrapper.find("#password").trigger('input')
        wrapper.find("#confirm_password").element.value = 'password'
        wrapper.find("#confirm_password").trigger('input')

        expect(wrapper.find("#institution_name").element.value).toBe('test institute')
        expect(wrapper.find("#email").element.value).toBe('test@gmail.com')
        expect(wrapper.find("#password").element.value).toBe('password')
        expect(wrapper.find("#confirm_password").element.value).toBe('password')
    })

    it('call createAccount function when Create Account button is clicked', async () => {
        const createAccountMethod = jest.spyOn(wrapper.vm, 'createAccount')
        await wrapper.find("form").trigger("submit.prevent")
        expect(createAccountMethod).toHaveBeenCalled()
        expect(mockActions.registerOrganizer).toHaveBeenCalled()
        expect(mockActions.registerOrganizer).toHaveBeenCalledWith(expect.any(Object),
            {
                "organizer_name": 'test institute',
                "email_address": 'test@gmail.com',
                "password": 'password',
            })
    })

    it('has checkbox define', () => {
        const checkbox = wrapper.find('#submit_checkbox')
        expect(checkbox.exists()).toBe(true)
    })

})
