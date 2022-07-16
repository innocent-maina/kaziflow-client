import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router";

import EmailVerification from "@/pages/Auth/EmailVerification.vue"


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
let wrapper
let store
let mockActions
let mockGetters
let router
let stubs
let responseData = {
    data: {
        status: 'success',
    }
}

router = new VueRouter()


beforeEach(() => {
    mockActions = {
        toggleVerifyState: jest.fn(),
        resendEmailVerification: jest.fn(() => Promise.resolve([responseData])),
        emailVerification: jest.fn(),
    }
    mockGetters = {
        getVerified: () => false,
    }

    store = new Vuex.Store({
        actions: mockActions,
        getters: mockGetters
    })

    stubs = ['base-button', 'card']

    wrapper = shallowMount(EmailVerification, {
        store,
        router,
        localVue,
        stubs: stubs,
        mocks: {$notify: (message) => ''}
    })

})

describe('Email Verification', () => {
    it('calls getInstaller action on mount (because urlInfo is undefined)', () => {
        expect(mockActions.toggleVerifyState).toHaveBeenCalled()
    })

    it('has Resend button which calls resendEmail method and dispatches action', async() => {
        const mockResendEmail = jest.spyOn(wrapper.vm, 'resendEmail')
        expect(wrapper.findAll('base-button-stub').length).toBe(1)
        const button = wrapper.find('#resend_btn')
        expect(button.exists()).toBe(true)

        button.vm.$emit('click')
        expect(mockResendEmail).toHaveBeenCalled()

        expect(mockActions.resendEmailVerification).toHaveBeenCalled()
    })

    it('has Login button when getVerified is true and it calls goToLogin method', async () => {
        mockGetters = {
            getVerified: () => true,
        }
        store = new Vuex.Store({
            actions: mockActions,
            getters: mockGetters
        })
        wrapper = shallowMount(EmailVerification, {
            store,
            router,
            localVue,
            stubs: stubs
        })
        const mockGoToLogin = jest.spyOn(wrapper.vm, 'goToLogin')

        expect(wrapper.findAll('base-button-stub').length).toBe(1)
        const button = wrapper.find('#login_btn')
        expect(button.exists()).toBe(true)

        button.vm.$emit('click')
        expect(mockGoToLogin).toHaveBeenCalled()
        
    })

})
