import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import InitiativeForm from '@/pages/InitiatorCreateInitiative/InitiativeForm/InitiativeForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let stubs
let mockActions
let wrapper


beforeEach(() => {
    mockActions = {
        resetCreateInitiativeState: jest.fn(),
        setProductId: jest.fn(),
        setPublishButtonStatus: jest.fn(),
        setActiveSection: jest.fn(),
        setPublishClicked: jest.fn(),
    }

    store = new Vuex.Store({
        actions: mockActions,
        getters: {
          getSelectedInitiativeId: () => '01',
          getCurrentInitiative: () => {
            return {
              initiative_title: 'title',
              initiative_type: 'interest collection',
              initiative_startdate: '',
              initiative_enddate: '',
              initiative_solution: '',
              initiative_type_text: '',
              initiative_category: '',
              initiative_partner: 'cobenefit_partner',
              product: [{product_id: '00'}],
            }
          },
          getCurrentProduct: () => {return {product_name: 'name'}},
          getLanguage: () => 'en',
          getNewInitiativeType: () => 'interest collection',
          getPartner: () => 'cobenefit_partner',
          getProduct: () => {return {product_name: 'new name'}},
          getInitiatorInstallers: () => (id) => [],
        }
    })

    stubs = [
        'GeneralSection',
        'SummarySection',
        'ImagesSection',
        'InformationSection',
        'DiscountThresholdSection',
        'SaveTheInitiative',
    ]

    wrapper = shallowMount(InitiativeForm, {
        store,
        localVue,
        stubs,
        data() {
          return {
            prevRoute: {name: ''},
          }
        },
        computed: { // mock computed
          lang: () => "en"
        }
    })
})

describe('Initiative Form', () => {
  it('has 5 child components', () => {
    const GeneralSection = wrapper.find('GeneralSection-stub')
    const SummarySection = wrapper.find('SummarySection-stub')
    const ImagesSection = wrapper.find('ImagesSection-stub')
    const InformationSection = wrapper.find('InformationSection-stub')
    const DiscountThresholdSection = wrapper.find('DiscountThresholdSection-stub')
    const SaveTheInitiative = wrapper.find('SaveTheInitiative-stub')

    expect(GeneralSection.exists()).toBe(true)
    expect(SummarySection.exists()).toBe(true)
    expect(ImagesSection.exists()).toBe(true)
    expect(InformationSection.exists()).toBe(true)
    expect(DiscountThresholdSection.exists()).toBe(true)
    expect(SaveTheInitiative.exists()).toBe(true)
  })

  it('dispatches actions and gets data from getters if prevRoute is initiatorinitiatives', async() => {
    wrapper = shallowMount(InitiativeForm, {
      store,
      localVue,
      stubs,
      data() {
        return {
          prevRoute: {name: 'initiatorinitiatives'},
        }
      }
    })
    
    expect(mockActions.resetCreateInitiativeState).toHaveBeenCalled()
    expect(wrapper.vm.$data.initiativeId).toEqual('01')

    expect(mockActions.setProductId).toHaveBeenCalled()
    
    expect(wrapper.vm.$data.partnerType).toEqual('cobenefit_partner')
    expect(wrapper.vm.$data.product).toEqual({product_name:'name'})

    jest.useFakeTimers();
    setTimeout(() => {
      expect(mockActions.setPublishButtonStatus).toHaveBeenCalled()
    }, 500);
    
  })

  it('gets data from 4 getters if prevRoute is initiatorinitiatives', () => {    
    expect(wrapper.vm.$data.partnerType).toEqual('cobenefit_partner')
    expect(wrapper.vm.$data.product).toEqual({product_name:'new name'})
  })
  
})