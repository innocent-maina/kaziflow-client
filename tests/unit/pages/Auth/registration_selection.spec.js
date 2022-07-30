import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router";

import RegistrationSelection from "@/pages/Auth/RegistrationSelection.vue"
import InitiatorRegistration from "@/pages/Auth/InitiatorRegistration.vue"
import InstallerRegistration from "@/pages/Auth/InstallerRegistration.vue"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
let wrapper
let store
let mockActions
let router

router = new VueRouter({
    routes: [
        {
            path: '/initiatorReg',
            name: 'initiatorReg',
            component: InitiatorRegistration
        },
        {
            path: '/installerReg',
            name: 'installerReg',
            component: InstallerRegistration
        },
    ]
})


beforeEach(() => {


    store = new Vuex.Store({
        actions: mockActions
    })
    wrapper = shallowMount(RegistrationSelection, {
        store,
        router,
        localVue,
        stubs: ['card', 'base-input', 'base-button', 'router-link'],
    })
})

describe('Registration selection screen unit test', () => {

    it('has local Organiser button defined', () => {
        const button = wrapper.findAll('base-button-stub').at(0)
        expect(button.exists()).toBe(true)
    })
    it('has Executor button defined', () => {
        const button = wrapper.findAll('base-button-stub').at(1)
        expect(button.exists()).toBe(true)
    })

    it('should call startOrgReg function when Local Organiser is clicked', async () => {
        const startOrgReg = jest.spyOn(wrapper.vm, 'startOrgReg')
        const createAccountLink = wrapper.findAll('base-button-stub').at(0)
        await createAccountLink.vm.$emit('click')
        expect(startOrgReg).toHaveBeenCalled()
        expect(wrapper.vm.$route.path).toBe('/initiatorReg')
    })

    it('should call startCompanyReg function when Executor is clicked', async () => {
        const startInstallerReg = jest.spyOn(wrapper.vm, 'startInstallerReg')
        const createAccountLink = wrapper.findAll('base-button-stub').at(1)
        await createAccountLink.vm.$emit('click')
        expect(startInstallerReg).toHaveBeenCalled()
        expect(wrapper.vm.$route.path).toBe('/installerReg')
    })

})