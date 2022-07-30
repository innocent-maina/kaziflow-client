import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router"

import RequestTable from '@/pages/InitiatorRequest/RequestTable.vue'
import RequestResponse from '@/pages/InitiatorRequest/RequestResponse.vue'
import CreateRequest from '@/pages/InitiatorCreateRequest/CreateRequest.vue'


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let store
let mockActions
let router

beforeEach(() => {
  mockActions = {
    setSelectedRequestId: jest.fn(),
    setLoadingMode: jest.fn(),
  }

  router = new VueRouter({
    routes: [
      {
        path: '/initiatorcreaterequest',
        name: 'initiatorcreaterequest',
        component: CreateRequest
      },
      {
        path: '/initiatorrequestresponse',
        name: 'initiatorrequestresponse',
        component: RequestResponse
      },
    ]
  })

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInitiatorRequestData: () => [],
    }
  })


  wrapper = shallowMount(RequestTable, {
    store,
    localVue,
    router,
    stubs: [ 'base-button', 'router-link', 'base-spinner' ],
  })

  wrapper.setData({
    requests: [
      {
        "is_draft": null,
        "initiator_description": "Description",
        "initiator_logo": "https://s3.eu-central-1.amazonaws.com/uploads.dashboard.com/nz6jkts3yu4kyv2khisyk.jpeg",
        "initiator_name": "Cobenefit",
        "initiator_uuid": "jEupnsIzSPKJfTbo",
        "initiator_website": "cobenefit.co",
        "request_category": "building",
        "request_id": 1,
        "request_information": [],
        "request_location": [],
        "request_response": [{}],
        "request_slug": "LbJxticOSnEAVrxg",
        "request_summary_introduction": "Von eine Partnerschaft mit CoBenefit profitieren Sie langfristig , da Sie durch verschiedene Initiativen lokal gebündelte Aufträge zu vordefinierten Projekten erhalten. Gemeinsam mit lokalen Organisatoren definieren wir angebotene Produkt und den Zeitrahmen einer Initiative, so dass Sie den Beratungs- und Installationsaufwand abschätzen können. Die Teilnehmer:innen der Initiativen werden bereits im Voraus über die jeweiligen Produkte aufgeklärt und teilweise von einer Energieberater:in beraten. Werden Sie noch heute Partner und starten Sie gemeinsam mit einem unserer lokalen Organisator eine Initiative!",
        "request_title": "Installateure für Wärmepumpen"
      }
    ],
    request_filters: {
      active: { status: false, requests: [] },
      drafts: { status: false, requests: [] },
    },
    active_filter: 'all',
  })
})

describe('Initiator Requests', () => {
  it('has a request table and rows for valid requests data', () => {
    const request_table = wrapper.find('.table');
    expect(request_table.exists()).toBe(true);
    
    const request_rows = wrapper.findAll('tr');
    expect(request_rows.length).toEqual(1);
  })

  it('has correct title and id displayed for request row', () => {
    const row = wrapper.findAll('tr').at(0);
    expect(row.text()).toContain("1");
    expect(row.text()).toContain("Installateure für Wärmepumpen");
  })

  it('has a Create New Request button with router-link to /initiatorcreaterequest', () => {
    const create_link = wrapper.findAll('router-link-stub').at(0)
    expect(create_link.exists()).toBe(true)
    expect(create_link.attributes().to).toBe('/initiatorcreaterequest')
  })

  it('has a Response button with router-link to /initiatorrequestresponse', () => {
    const response_link = wrapper.findAll('router-link-stub').at(1)
    expect(response_link.exists()).toBe(true)
    expect(response_link.attributes().to).toBe('/initiatorrequestresponse')
  })

  it('has an Edit button with router-link to /initiatorcreaterequest', () => {
    const edit_link = wrapper.findAll('router-link-stub').at(2)
    expect(edit_link.exists()).toBe(true)
    expect(edit_link.text()).toContain('Edit')
    expect(edit_link.attributes().to).toBe('/initiatorcreaterequest')
  })

  it('sets Request Id on click edit button', async () => {
    const edit_button = wrapper.findAll('base-button-stub').at(2)
    expect(edit_button.exists()).toBe(true)
    let mockSetId = jest.spyOn(wrapper.vm, 'setSelectedRequestId')
    await edit_button.vm.$emit('click')
    expect(mockSetId).toHaveBeenCalledWith(wrapper.vm.$data.requests[0].request_id)
  })

  it('has an Open button', () => {
    const open_link = wrapper.findAll('base-button-stub').at(3)
    expect(open_link.exists()).toBe(true)
  })

  it('has filters container with one active and 2 other filters', async () => {
    const filters_container = wrapper.find('.filter-items-container')
    expect(filters_container.exists()).toBe(true)
    const filters_items = wrapper.findAll('.filter-items-container > .filter-items')
    expect(filters_items.length).toBe(2)
    const active_filter = wrapper.findAll('.filter-items-container > .active-filter')
    expect(active_filter.length).toBe(1)
  })

  it('calls setFilter method on clicking a filter item', async () => {
    const filter = wrapper.findAll('.filter-items-container > .filter-items').at(0)
    expect(filter.exists()).toBe(true)
    let mockSetFilter = jest.spyOn(wrapper.vm, 'setFilter')
    await filter.trigger('click')
    expect(mockSetFilter).toHaveBeenCalled()
  })

})