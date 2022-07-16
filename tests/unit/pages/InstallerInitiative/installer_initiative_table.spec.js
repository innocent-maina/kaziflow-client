import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import InitiativeTable from "@/pages/InstallerInitiative/InitiativeTable.vue";
import InstallerAddIntiatives from "@/pages/InstallerInitiative/AddInitiative.vue";
import InstallerParticipant from "@/pages/InstallerParticipants/InstallerParticipant.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

let wrapper;
let store;
let mockActions;
let router;

beforeEach(() => {
  mockActions = {
    setSelectedInstallerInitiativeId: jest.fn(),
    setLoadingMode: jest.fn()
  };

  router = new VueRouter({
    routes: [
      {
        path: "/installerparticipants",
        name: "installerparticipants",
        component: InstallerParticipant
      },
      {
        path: "/installeraddinitiative",
        name: "installeraddinitiative",
        component: InstallerAddIntiatives
      }
    ]
  });

  store = new Vuex.Store({
    actions: mockActions,
    getters: {
      getInstallerInitiatives: () => []
    }
  });

  wrapper = mount(InitiativeTable, {
    store,
    localVue,
    router,
    stubs: [
      "base-button",
      "router-link",
      "initiative-title-image",
      "base-spinner"
    ]
  });

  wrapper.setData({
    initiatives: [
      {
        customer_deadline_for_offer_acceptance: "2021-08-13T00:00:00",
        initiative_country: "Germany",
        initiative_discountmin: 15,
        initiative_enddate: "2021-05-20T00:00:00",
        initiative_id: 2,
        initiative_installer: [],
        initiative_region: "Oldenburger Münsterland",
        initiative_slug: "pVZTpFagwwTASgaB",
        initiative_specific: Array[36],
        initiative_startdate: "2021-01-02T00:00:00",
        initiative_thresholdmin: 18,
        initiative_title: "PILZ-ISOLIERUNG",
        installation_offers_sent_date: "2021-07-26T00:00:00",
        installation_performed_and_final_bill_uploaded_date:
          "2021-09-02T00:00:00",
        installer_key: null,
        participants: [],
        initiative_type: "interest collection",
        initiative_partner: "self_reliant_partner",
        is_draft: false
      }
    ],
    initiative_filters: {
      active: { status: false, initiatives: [] },
      scheduled: { status: false, initiatives: [] },
      drafts: { status: false, initiatives: [] },
      expired: { status: false, initiatives: [] }
    },
    initiatives_filtered: [],
    active_filter: "all"
  });
});

describe("Installer Initiative", () => {
  it("calls navigate function and navigates to /installeraddinitiative when create new initiative button is clicked", async () => {
    const newInitiativeButton = wrapper.findAll("base-button-stub").at(0);
    expect(newInitiativeButton.exists()).toBe(true);
    const mockNavigate = jest.spyOn(wrapper.vm, "navigate");
    await newInitiativeButton.vm.$emit("click");
    expect(mockNavigate).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe("/installeraddinitiative");
  });

  it("has a initiatives div for all initiatives", () => {
    const initiatives = wrapper.find(".initiatives");
    expect(initiatives.exists()).toBe(true);
  });

  it("has a initiative-title-image component", () => {
    const initiative_title_image = wrapper.find("initiative-title-image-stub");
    expect(initiative_title_image.exists()).toBe(true);
  });

  it("has initiative-item divs that are not empty for valid initiatives data", () => {
    const initiative_item = wrapper.findAll(".initiative-item");
    expect(initiative_item.length).not.toEqual(0);
  });

  it("has initiative info with title and id", () => {
    const initiative_item = wrapper.findAll(".initiative-item").at(0);
    expect(initiative_item.text()).toContain(
      wrapper.vm.$data.initiatives[0].initiative_title
    );
    expect(initiative_item.text()).toContain(
      wrapper.vm.$data.initiatives[0].initiative_id
    );
  });

  // edit to 3 when uncommented the 2 others in the page
  it("has 3 buttons for every initiative", () => {
    const initiative_links = wrapper.findAll(".initiative-link");
    expect(initiative_links.length).toBe(1);
  });

  it("has a participants button with router link to /installerparticipants", () => {
    const router_link = wrapper.findAll("router-link-stub").at(0);
    expect(router_link.exists()).toBe(true);
    expect(router_link.attributes().to).toBe("/installerparticipants");
  });

  // it('has a thresholds button', () => {
  //   const materials_button = wrapper.findAll('.initiative-link').at(1)
  //   expect(materials_button.exists()).toBe(true)
  // })

  // it('has a statistics button', () => {
  //   const stat_button = wrapper.findAll('.initiative-link').at(2)
  //   expect(stat_button.exists()).toBe(true)
  // })

  it("sets Installer Id on click participants button", async () => {
    const participant_button = wrapper.findAll("base-button-stub").at(1);
    expect(participant_button.exists()).toBe(true);
    let mockSetId = jest.spyOn(wrapper.vm, "setSelectedInitiativeID");
    await participant_button.vm.$emit("click");
    expect(mockSetId).toHaveBeenCalledWith(
      wrapper.vm.$data.initiatives[0].initiative_id
    );
  });

  it("has filters container with one active and 4 other filters", async () => {
    const filters_container = wrapper.find(".filter-items-container");
    expect(filters_container.exists()).toBe(true);
    const filters_items = wrapper.findAll(
      ".filter-items-container > .filter-items"
    );
    expect(filters_items.length).toBe(4);
    const active_filter = wrapper.findAll(
      ".filter-items-container > .active-filter"
    );
    expect(active_filter.length).toBe(1);
  });

  it("calls setFilter method on clicking a filter item", async () => {
    const filter = wrapper
      .findAll(".filter-items-container > .filter-items")
      .at(0);
    expect(filter.exists()).toBe(true);
    let mockSetFilter = jest.spyOn(wrapper.vm, "setFilter");
    await filter.trigger("click");
    expect(mockSetFilter).toHaveBeenCalled();
  });
});
