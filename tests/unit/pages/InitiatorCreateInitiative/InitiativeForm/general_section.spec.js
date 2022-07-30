import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GeneralSection from '@/pages/InitiatorCreateInitiative/InitiativeForm/GeneralSection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper
let deleteInitiativeLocationSpy
let addInitiativeLocationSpy
let addLocationFieldSpy
let mockSetGeneralSection
let mockCheckStartDate
let mockCheckEndDate

beforeEach(() => {
    mockActions = {
        change_active_section: jest.fn(),
        clearLocation: jest.fn(),
        populateLocations: jest.fn(),
        setGeneralSection: jest.fn(),
        setPublishButtonStatus: jest.fn(),
        addLocationField: jest.fn(),
        deleteLocation: jest.fn(),
        add_initiative_location: jest.fn(),
    }

    store = new Vuex.Store({
        state: {
            // authentication: { initiator_uuid: '' }
        },
        actions: mockActions,
        getters: {
            getGeneralSection: () => {
                return {}
            },
            getCurrentInitiative: () => {
                return {
                    initiative_title: '',
                    initiative_subtitle: '',
                    initiative_startdate: '2021-10-02T20:17:46',
                    initiative_enddate: '2021-11-02T20:17:46',
                    initiative_location: [{}]
                }
            },
            getLocation: () => []
        }
    })

    stubs = [
        'base-input',
        'base-button',
        'InitiativeLocation',
        'section-header',
        'section-footer',
    ]

    deleteInitiativeLocationSpy = jest.spyOn(GeneralSection.methods, "deleteInitiativeLocation")
    addInitiativeLocationSpy = jest.spyOn(GeneralSection.methods, "addInitiativeLocation")
    addLocationFieldSpy = jest.spyOn(GeneralSection.methods, "addLocationField")
    mockSetGeneralSection = jest.spyOn(GeneralSection.methods, "setGeneralSection")
    mockCheckStartDate = jest.spyOn(GeneralSection.methods, "checkStartDate")
    mockCheckEndDate = jest.spyOn(GeneralSection.methods, "checkEndDate")

    wrapper = shallowMount(GeneralSection, {
        store,
        localVue,
        stubs,
        propsData: {
            isEdit: true,
            isGroupOffer: true,
            product: {},
            activeMe: true,
        }
    })

    wrapper.setData({
        newInitiativeData: {}
    })

})

describe('Testing General Section Form', () => {
    it('has all form fields', () => {
        const titleInput = wrapper.findAll("base-input-stub").at(0)
        const subtitleInput = wrapper.findAll("base-input-stub").at(1)
        const startDateInput = wrapper.findAll("base-input-stub").at(2)
        const endDateInput = wrapper.findAll("base-input-stub").at(3)
        const locationInput = wrapper.findAll("base-input-stub").at(3)

        expect(titleInput.exists()).toBe(true)
        expect(subtitleInput.exists()).toBe(true)
        expect(startDateInput.exists()).toBe(true)
        expect(endDateInput.exists()).toBe(true)
        expect(locationInput.exists()).toBe(true)
    })

    it('(if isEdit) on mounted dispatches actions and calls setGeneralSection', () => {
        expect(mockActions.clearLocation).toHaveBeenCalled()
        expect(mockActions.populateLocations).toHaveBeenCalled()
        expect(mockSetGeneralSection).toHaveBeenCalled()
        expect(mockActions.setGeneralSection).toHaveBeenCalled()
    })

    it('(if not isEdit) on mounted only calls setGeneralSection', () => {
        wrapper = shallowMount(GeneralSection, {
            store,
            localVue,
            stubs,
            propsData: {
                isEdit: false,
                isGroupOffer: false,
            }
        })
        expect(mockSetGeneralSection).toHaveBeenCalled()
        expect(mockActions.setGeneralSection).toHaveBeenCalled()
    })


    it('calls checkStartDate on emitting start date input blur', async () => {
        const start_date_input = wrapper.findAll('base-input-stub').at(2)
        await start_date_input.vm.$emit('blur')
        expect(mockCheckStartDate).toHaveBeenCalled()
    })

    it('calls checkEndDate on emitting end date input blur', async () => {
        const end_date_input = wrapper.findAll('base-input-stub').at(3)
        await end_date_input.vm.$emit('blur')
        expect(mockCheckEndDate).toHaveBeenCalled()
    })

    it('calls addLocationField on emitting addLocationField in InitiativeLocation', async () => {
        const initiativeLocation = wrapper.find("InitiativeLocation-stub")
        initiativeLocation.vm.$emit('addLocationField')
        await wrapper.vm.$nextTick()
        expect(addLocationFieldSpy).toHaveBeenCalled()
        expect(mockActions.addLocationField).toHaveBeenCalled()
    })

    it('calls addInitiativeLocation on emitting addLocation in InitiativeLocation', async () => {
        const initiativeLocation = wrapper.find("InitiativeLocation-stub")
        initiativeLocation.vm.$emit('addLocation')
        await wrapper.vm.$nextTick()
        expect(addInitiativeLocationSpy).toHaveBeenCalled()
        expect(mockActions.add_initiative_location).toHaveBeenCalled()
    })

    it('calls deleteInitiativeLocation on emitting deleteLocation in InitiativeLocation', async () => {
        const initiativeLocation = wrapper.find("InitiativeLocation-stub")
        initiativeLocation.vm.$emit('deleteLocation')
        await wrapper.vm.$nextTick()
        expect(deleteInitiativeLocationSpy).toHaveBeenCalled()
        expect(mockActions.deleteLocation).toHaveBeenCalled()
    })

})