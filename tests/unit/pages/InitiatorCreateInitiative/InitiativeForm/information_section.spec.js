import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import InformationSection from '@/pages/InitiatorCreateInitiative/InitiativeForm/InformationSection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper
let setOptionalImageSpy
let setImageCreditsSpy
let mockSetpublishButtonStatus

beforeEach(() => {
    mockActions = {
        change_active_section: jest.fn(),
        addInformationSection: jest.fn(),
        setInformationSection: jest.fn(),
        deleteInformationSection: jest.fn(),
        setInformationSectionImage: jest.fn(),
        setPublishButtonStatus: jest.fn(),
        setInformationSectionImage: jest.fn(),
        setInformationSectionImageCredit: jest.fn(),
    }

    store = new Vuex.Store({
        actions: mockActions,
        getters: {
            getInformationSections: () => {
                return [{
                    initiative_information_image_url: "",
                    initiative_information_image_credit: ""
                },
                {
                    initiative_information_image_url: "",
                    initiative_information_image_credit: ""
                }]
            }
        }
    })

    stubs = [
        'base-input',
        'base-image-uploader',
        'CKEditorComponent',
        'base-button',
        'section-header',
        'section-footer',
    ]

    setOptionalImageSpy = jest.spyOn(InformationSection.methods, 'setOptionalImage')
    setImageCreditsSpy = jest.spyOn(InformationSection.methods, 'setImageCredits')
    mockSetpublishButtonStatus = jest.spyOn(InformationSection.methods, 'setpublishButtonStatus')

    wrapper = shallowMount(InformationSection, {
        store,
        localVue,
        stubs,
        propsData: {
            activeMe: true,
        },
        data() {
            return {
                optional_images: [{image: "", credit: ""}, {image: "", credit: ""}]
            }
        }
    })
})

describe('Testing Information Section Form', () => {
    it('calls setInformationSection on mounted', () => {
        const mockSetInformationSection = jest.spyOn(wrapper.vm, "setInformationSection")
        jest.useFakeTimers();
        setTimeout(() => {
            expect(mockSetInformationSection).toHaveBeenCalled()
            expect(mockActions.setInformationSection).toHaveBeenCalled()
        }, 100);
    })

    it('has all form fields', () => {
        const headingInput = wrapper.findAll("base-input-stub").at(0)
        const optionalImageInput = wrapper.findAll("base-image-uploader-stub").at(0)
        const ckeditorInput = wrapper.findAll("CKEditorComponent-stub").at(0)

        expect(headingInput.exists()).toBe(true)
        expect(optionalImageInput.exists()).toBe(true)
        expect(ckeditorInput.exists()).toBe(true)
    })


    it('calls setpublishButtonStatus on emitting heading input blur', async () => {
        const heading_input = wrapper.find('base-input-stub')
        await heading_input.vm.$emit('blur')
        expect(mockSetpublishButtonStatus).toHaveBeenCalled()
    })


    it('calls setOptionalImage for optional image uploader', async () => {
        const imageUploader = wrapper.find("base-image-uploader-stub")
        imageUploader.vm.$emit('setImage')
        await wrapper.vm.$nextTick()
        expect(setOptionalImageSpy).toHaveBeenCalled()
        expect(mockActions.setInformationSectionImage).toHaveBeenCalled()
    })

    it('calls setImageCredit for optional image uploader', async () => {
        wrapper.find("base-image-uploader-stub").vm.$emit('setImageCredit')
        await wrapper.vm.$nextTick()
        expect(setImageCreditsSpy).toHaveBeenCalled()
        expect(mockActions.setInformationSectionImageCredit).toHaveBeenCalled()
    })

    it('calls addSection on clicking add section button', async () => {
        const mockAddSectionMethod = jest.spyOn(wrapper.vm, 'addSection')
        wrapper.findAll('base-button-stub').at(0).vm.$emit('click')
        expect(mockAddSectionMethod).toHaveBeenCalled()
        expect(mockActions.addInformationSection).toHaveBeenCalled()
        expect(mockActions.setPublishButtonStatus).toHaveBeenCalled()
    })

    it('calls deleteSection on clicking delete section text', async () => {
        const mockdeleteSectionMethod = jest.spyOn(wrapper.vm, 'deleteSection')
        const deleteSection = wrapper.findAll('.subsection-delete').at(0)
        expect(deleteSection.exists()).toBe(true)
        await deleteSection.trigger('click')

        expect(mockdeleteSectionMethod).toHaveBeenCalled()
        await wrapper.vm.$nextTick()
        expect(mockActions.deleteInformationSection).toHaveBeenCalled()
        expect(mockActions.setPublishButtonStatus).toHaveBeenCalled()
    })

})