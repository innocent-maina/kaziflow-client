import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SummarySection from '@/pages/InitiatorCreateInitiative/InitiativeForm/SummarySection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper
let mockSetpublishButtonStatus
let mockRegularCharCountUpdate

beforeEach(() => {
    mockActions = {
        change_active_section: jest.fn(),
        setSummarySection: jest.fn(),
        setPublishButtonStatus: jest.fn(),
    }

    store = new Vuex.Store({
        state: {
            // authentication: { initiator_uuid: '' }
        },
        actions: mockActions,
        getters: {
            getSummarySection: () => {
                return {
                    initiative_summary_introduction: 'Introduction'
                }
            },
            getCurrentInitiative: () => {
                return {
                    initiative_summary_introduction: 'Introduction2',
                }
            },
        }
    })

    stubs = [
        'base-input',
        'base-button',
        'section-header',
        'section-footer',
    ]

    mockSetpublishButtonStatus = jest.spyOn(SummarySection.methods, "setpublishButtonStatus")
    mockRegularCharCountUpdate = jest.spyOn(SummarySection.methods, "regularCharCountUpdate")

    wrapper = shallowMount(SummarySection, {
        store,
        localVue,
        stubs,
        propsData: {
            isEdit: true,
            product: { introduction_en: 'IntroEN', introduction_de: 'IntroDE' },
            lang: 'en',
            isGroupOffer: false,
            activeMe: true,
        },
        data() {
            return {
                regularCountRem: 800,
            }
        }
    })

})

describe('Testing Summary Section Form', () => {

    it('has all form fields', () => {
        const highlightsInput = wrapper.findAll("textarea").at(0)
        expect(highlightsInput.exists()).toBe(true)
    })

    it('(if isEdit) on mounted gets data from getter getCurrentInitiative and dispatches setSummarySection', () => {
        expect(mockActions.setSummarySection).toHaveBeenCalled()
        expect(mockActions.setSummarySection).toHaveBeenCalledWith(
            expect.any(Object),
            {
                initiative_summary_introduction: 'Introduction2'
            }
        )
    })

    it('(if not isEdit) on mounted gets data from product propsdata and dispatches setSummarySection', () => {
        wrapper = shallowMount(SummarySection, {
            store,
            localVue,
            stubs,
            propsData: {
                isEdit: false,
                product: { introduction_en: 'IntroEN', introduction_de: 'IntroDE' },
                lang: 'en',
                isGroupOffer: true,
                activeMe: true
            }
        })
        expect(mockActions.setSummarySection).toHaveBeenCalled()
    })


    it('calls setpublishButtonStatus on emitting textarea blur', async () => {
        const highlightsInput = wrapper.find("textarea")
        await highlightsInput.trigger('blur')
        expect(mockSetpublishButtonStatus).toHaveBeenCalled()
        expect(mockActions.setPublishButtonStatus).toHaveBeenCalled()
    })

    it('calls regularCharCountUpdate on keyup textarea which updates regularCountRem based on input value', async () => {
        const highlightsInput = wrapper.find("textarea")
        await highlightsInput.trigger('keyup')
        expect(mockRegularCharCountUpdate).toHaveBeenCalled()
        expect(wrapper.vm.$data.regularCountRem).toEqual(800 - 'Introduction'.length)
    })

})