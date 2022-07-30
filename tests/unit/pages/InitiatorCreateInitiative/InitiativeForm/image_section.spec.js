import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ImagesSection from '@/pages/InitiatorCreateInitiative/InitiativeForm/ImagesSection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper
let setTitleImageSpy
let setSupImagesSpy
let setTitleImageCreditSpy
let setTitleImageCreditAltSpy
let setSupImageCreditsSpy
let setSupImageCreditsAltSpy

beforeEach(() => {
    mockActions = {
        change_active_section: jest.fn(),
        setTitleImageInfo: jest.fn(),
        setSuppImageInfos: jest.fn(),
        setPublishButtonStatus: jest.fn()
    }

    store = new Vuex.Store({
        actions: mockActions,
        getters: {
            getGeneralSection: () => { },
            getPublishClicked: () => '',
            getTitleImageInfo: () => {
                return {
                    title_image_url: 'title image',
                    title_image_credit: 'title image credit',
                    title_image_credit_alt: 'title image credit alt'
                }
            },
            getSuppImageInfos: () => {
                return {
                    images: {},
                    credits: {},
                    credits_alt: {}
                }
            },
            getSingleInitiatorInitiativeData: () => (id) => {
                return {
                    initiative_title_image_url: 'title image',
                    initiative_title_image_credit: 'title image credit',
                    initiative_title_image_credit_alt: 'title image credit alt',
                    initiative_supplementary_images_urls: 'one,two',
                    supplementary_images_credits: 'one_s,two_s',
                    supplementary_images_credits_alt: 'one_s,two_s'
                }
            }
        }
    })

    stubs = [
        'base-input',
        'base-image-uploader',
        'base-button',
        'section-header',
        'section-footer',
    ]

    setTitleImageSpy = jest.spyOn(ImagesSection.methods, 'setTitleImage')
    setTitleImageCreditSpy = jest.spyOn(ImagesSection.methods, 'setTitleImageCredit')
    setTitleImageCreditAltSpy = jest.spyOn(ImagesSection.methods, 'setTitleImageCreditAlt')
    setSupImagesSpy = jest.spyOn(ImagesSection.methods, 'setSupImages')
    setSupImageCreditsSpy = jest.spyOn(ImagesSection.methods, 'setSupImageCredits')
    setSupImageCreditsAltSpy = jest.spyOn(ImagesSection.methods, 'setSupImageCreditsAlt')


    wrapper = shallowMount(ImagesSection, {
        store,
        localVue,
        stubs,
        propsData: {
            isEdit: true,
            activeMe: true,
        }
    })

})

describe('Testing Images Section Form', () => {
    it('has all image uploaders', () => {
        const imageUploaders = wrapper.findAll("base-image-uploader-stub")
        expect(imageUploaders.length).toBe(7)
    })

    it('(if isEdit) on mounted gets data from getter and dispatches actions', () => {
        expect(mockActions.setTitleImageInfo).toHaveBeenCalledWith(expect.any(Object),{
            title_image_url: 'title image',
            title_image_credit: 'title image credit',
            title_image_credit_alt: 'title image credit alt'
        })
        expect(mockActions.setSuppImageInfos).toHaveBeenCalled();
    })

    it('(if not isEdit) on mounted gets data from getter and dispatches actions', () => {
        wrapper = shallowMount(ImagesSection, {
            store,
            localVue,
            stubs,
            propsData: {
                isEdit: false,
                product: {
                    title_image_url: 'product_title_image',
                    additional_image_urls: 'product_image_one,product_image_two',
                },
                initiative_template: {
                    additional_image_urls: "",
                    supplementary_images_credits: "",
                    supplementary_images_credits_alt: ""
                },
                isGroupOffer: true
            }
        })
        expect(mockActions.setTitleImageInfo).toHaveBeenCalled()
        expect(mockActions.setSuppImageInfos).toHaveBeenCalled()
    })


    it('calls setTitleImage for title image uploader', async () => {
        const imageUploader = wrapper.findAll("base-image-uploader-stub").at(0)
        imageUploader.vm.$emit('setImage')
        await wrapper.vm.$nextTick()
        expect(setTitleImageSpy).toHaveBeenCalled()
        expect(mockActions.setTitleImageInfo).toHaveBeenCalled()
    })

    it('calls setSupImage for additional image uploader', async () => {
        const imageUploader = wrapper.findAll("base-image-uploader-stub").at(1)
        imageUploader.vm.$emit('setImage')
        await wrapper.vm.$nextTick()
        expect(setSupImagesSpy).toHaveBeenCalled()
        expect(mockActions.setSuppImageInfos).toHaveBeenCalled()
    })


})
